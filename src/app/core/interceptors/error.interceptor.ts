import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, switchMap, throwError } from 'rxjs';
import { LOGIN_ROUTE, MSG_FOR_LOGIN_PAGE, TOKEN_HEADER_KEY } from '@core/constants/constants';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHttpHandlerService } from '@core/services/app.http.handler.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private accessTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    loggingOut: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private appHttpHandlerService: AppHttpHandlerService
    ) {}

    private get getReturnUrl(): string {
        let currentReturnUrl = this.route.snapshot.queryParams['returnUrl'];
        if ((currentReturnUrl ? currentReturnUrl : '') != '') {
            return currentReturnUrl;
        } else {
            let url: string = '';
            // set current url for return url form login page
            if (this.router.routerState.snapshot.url.includes(LOGIN_ROUTE)) {
                if (this.route.snapshot.queryParams['returnUrl']) {
                    url = this.route.snapshot.queryParams['returnUrl'];
                } else {
                    url = '/';
                }
            } else {
                url = this.router.routerState.snapshot.url;
            }
            return url;
        }
    }

    private addTokenHeader(request: HttpRequest<any>, token: string | null) {
        return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
        let authReq = req;

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse | any) => {
                if (error.status != HttpStatusCode.Unauthorized) {
                    this.appHttpHandlerService.handleHttpErrorResponse(error);
                }

                const elseStatusCode = [0, 405];

                if (error.status == HttpStatusCode.Ok) {
                    return new Observable<any>();
                } else if (elseStatusCode.indexOf(error.status) != -1) {
                    return throwError(() => error);
                } else {
                    return throwError(() => error);
                }
            }),
            tap({
                next: (response: any) => {
                }
            })
        );
    }
}
