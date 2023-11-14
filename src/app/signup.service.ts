import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SignUpRequest } from './DBOS/sign-up-request';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SignInRequest } from './DBOS/sign-in-request';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }


  signup(request: SignUpRequest): Observable<any> {
    console.log(request)

    return this.http.post('https://localhost:7044/api/Authentication', request).pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }



  signin(request: SignInRequest): Observable<any> {
    console.log(request)

    return this.http.post('https://localhost:7044/api/Authentication/login', request).pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }


}
