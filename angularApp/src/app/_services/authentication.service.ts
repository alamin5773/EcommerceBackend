import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoggedInInfo } from '@/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<LoggedInInfo>;
    public currentUser: Observable<LoggedInInfo>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<LoggedInInfo>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): LoggedInInfo {
        return this.currentUserSubject.value;
    }

    login(Email, password) {
        debugger;
        return this.http.post<any>(`${config.apiUrl}/api/Login`, { Email, password })
            .pipe(map(LoggedInInfo => {

                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(LoggedInInfo));
                this.currentUserSubject.next(LoggedInInfo);
                return LoggedInInfo;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}