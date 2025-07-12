import { Component, inject, Input, input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLocalStorageService } from '@modules/auth/services/user.localStorage.service';
import { FroalaEditorDirective, FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

// Import all Froala Editor plugins.
import 'froala-editor/js/plugins.pkgd.min.js';

// Import a single Froala Editor plugin.
import 'froala-editor/js/plugins/align.min.js';

// Import a Froala Editor language file.
import 'froala-editor/js/languages/de.js';

// Import a third-party plugin.
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/image_tui.min';
// import 'froala-editor/js/third_party/spell_checker.min';
// import 'froala-editor/js/third_party/embedly.min';

@Component({
    selector: 'rich-text-editor',
    imports: [ReactiveFormsModule, FormsModule, FroalaEditorModule, FroalaViewModule],
    templateUrl: './rich-text-editor.component.html',
    styleUrl: './rich-text-editor.component.scss'
})
export class RichTextEditorComponent {
    @Input('controlName') controlName?: string;
    @Input('form') form?: FormGroup;

    private editor?: FroalaEditorDirective;

    userLocalStorageService = inject(UserLocalStorageService);

    /*
        // have to change to this on dark mode & reverse to #FFF on light mode
        .fr-second-toolbar => background: #222222
        .fr-toolbar => background: #222222
        .fr-box.fr-basic .fr-wrapper => background: #222222
        fr-box.fr-basic.fr-element => color remove
    */
    editorOptions?: Object = {
        theme: 'gray',
        toolbarBottom: false,
        charCounterCount: true,
        placeholderText: 'Edit Your Content Here!',
        toolbarSticky: false,
        // imageUploadURL: `${this.baseFileUrl}`,
        // imageUploadParam: 'file',
        // imageUploadMethod: 'POST',
        // imageMaxSize: 2 * 1024 * 1024, // 2MB
        // imageAllowedTypes: ['jpeg', 'jpg', 'png'],
        // imageManagerLoadURL:'',
        requestHeaders: {
            Authorization: `Bearer ${this.userLocalStorageService.getJwtToken()}`
        },
        events: {
            initialized: (editor: any) => {
                // window['removedImages'] = [];
                console.log('Froala editor initialized', editor);
                this.editor = editor;
                this.removeButtonFromToolbar('insertFiles', 'fr-btn');
                this.removeButtonFromToolbar('markdown', 'fr-btn');
                this.removeButtonFromToolbar('openFilePicker', 'fr-btn');
                this.removeButtonFromToolbar('html', 'fr-btn');
            },
            'buttons.refresh': () => {
                this.removeButtonFromToolbar('imageManager', 'fr-btn');
                this.removeButtonFromToolbar('insertFile', 'fr-btn');
            },
            'image.beforeUpload': function (files) {
                const editor: any = this;
                if (files.length) {
                    // Create a File Reader.
                    let reader = new FileReader();
                    // Set the reader to insert images when they are loaded.
                    reader.onload = function (e: any) {
                        let result = e.target.result;
                        editor.image.insert(result, null, null, editor.image.get());
                    };
                    // Read image as base64.
                    reader.readAsDataURL(files[0]);
                }
                editor.popups.hideAll();
                // Stop default upload chain.
                return false;
            },
            'image.uploaded': (response) => {
                // const fileName = JSON.parse(response)['link'].replaceAll(this.baseFileUrl + '/', '');
                // console.log('Image uploaded:', fileName);
                // this.uploadedImages.push(fileName);
            },
            'image.error': (error, response) => {
                // console.error('Image upload error:', error);
            },
            'image.removed': ($img) => {
                // const fileName = $img['0'].src?.replaceAll(this.baseFileUrl + '/', '');
                // this.removedImages.push(fileName);
                // this.http.delete(`${this.baseFileUrl}/${fileName}`).subscribe();
            }
        }
    };

    removeButtonFromToolbar(idPrefix: string, classToRemove: string) {
        // Select all elements with IDs starting with the specified prefix
        const elements = document.querySelectorAll(`[id^="${idPrefix}"]`);

        // Remove the specified class from each matched element
        elements.forEach((element) => {
            element.classList.remove(classToRemove);
        });
    }
}
