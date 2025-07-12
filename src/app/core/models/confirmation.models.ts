export enum ConfirmationPosition {
    LEFT = 'left',
    RIGHT = 'right',
    TOP_LEFT = 'top-left',
    TOP = 'top',
    TOP_RIGHT = 'top-right',
    BOTTOM_LEFT = 'bottom-left',
    BOTTOM = 'bottom',
    BOTTOM_RIGHT = 'bottom-right',
}

export enum ConfirmationMessage {
    DEFAULT_MESSAGE = 'Are you sure that you want to proceed?',
    CREATE_MESSAGE = 'Are you sure that you want to create?',
    DELETE_MESSAGE = 'Are you sure that you want to delete?',
    UPDATE_MESSAGE = 'Are you sure that you want to update?',
}

export enum ConfirmationHeader {
    DEFAULT_HEADER = 'Confirmation',
    CREATE_HEADER = 'Create Confirmation',
    UPDATE_HEADER = 'Update Confirmation',
    DELETE_HEADER = 'Delete Confirmation',
}

export enum ConfirmationIcon {
    EXCLAMATION_TRIANGLE = 'pi pi-exclamation-triangle',
    DEFAULT_INFO_CIRCLE = 'pi pi-info-circle'
}
