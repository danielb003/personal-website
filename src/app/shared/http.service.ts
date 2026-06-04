import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
   providedIn: 'root'
})

export class HttpService {
   private readonly emailUrl:string = "https://danielbellino.au";
   private readonly apiUrl:string = "/api/send-email";

   http: HttpClient = inject(HttpClient);
//   constructor(private http: HttpClient) { }

   sendEmail(data: any): Observable<any> {
      // return this.http.post(`${this.emailUrl}/api/send-email`, data);
      return this.http.post(this.apiUrl, data);
   }

   // sendEmail(payload: { name: string, email: string; text: string;}): Observable<any> {
   //    return this.http.post(this.emailUrl, payload, {
   //       responseType: 'text'
   //    });
   // }
}

// ).pipe(
//       takeUntilDestroyed(),
//       catchError((error: HttpErrorResponse) => {
//         // Handle client/server errors here
//         console.error('HTTP Error:', error);
//         return throwError(() => new Error('Something bad happened; please try again later.'));
//       })