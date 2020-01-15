import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { User } from './user.model';

export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

 
@Injectable({providedIn: 'root'})

export class AuthService {

   // user = new Subject<User>();
   user = new BehaviorSubject<User>(null);
   private tokenExpritaionTimer: any;

    constructor(private http: HttpClient,
                private router: Router ){}
    
    signup(eml: string, pwd: string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDpAFNjT2zUqnuVuAM5zcASwfN_j2YKopU',
                {
                    email: eml,
                    password: pwd,
                    returnSecureToken: true
                }
        ).pipe(catchError(this.handleError),
               tap(resData =>{
                            this.handleAuthentication(resData.email, 
                                                      resData.localId,
                                                      resData.idToken,
                                                      +resData.expiresIn);
            })
        );
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDpAFNjT2zUqnuVuAM5zcASwfN_j2YKopU',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    ).pipe(catchError(this.handleError),
     tap(resData =>{
        this.handleAuthentication(resData.email, 
                                  resData.localId,
                                  resData.idToken,
                                  +resData.expiresIn
            );
        })
    );
 }

 autoLogIn(){
    const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
        return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if(loadedUser.token){
        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
      }
 }

 logout(){
     this.user.next(null);
     this.router.navigate(['/auth']);

     //auto logout
     localStorage.removeItem('userData');
     if(this.tokenExpritaionTimer){
         clearTimeout(this.tokenExpritaionTimer);
     }
     this.tokenExpritaionTimer = null;
 }

 autoLogout(expirationDuration: number){
    this.tokenExpritaionTimer =  setTimeout(( ) =>{
         this.logout();
       }, expirationDuration);
 }

private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email,
                          userId,
                          token,
                          expirationDate
                          );
            this.user.next(user);

            //2. auto logout
            this.autoLogout(expiresIn * 1000);
        //1.for Auto-Login
        localStorage.setItem('userData', JSON.stringify(user));
      } 

 private handleError(errorRes: HttpErrorResponse ){
 
    let errorMessage = 'An unknown error occured!';
    if ( !errorRes.error || !errorRes.error.error){
        return throwError(errorMessage);
    }
    switch ( errorRes.error.error.message ){
        case 'EMAIL_EXISTS':
             errorMessage = 'This email exists already';
             break;
        case 'EMAIL_NOT_FOUND':
             errorMessage = 'This email does not exist';
             break;
        case  'INVALID_PASSWORD':
             errorMessage = ' This password is not Correct.';
             break;
    }
     return throwError(errorMessage);
    }
 }
