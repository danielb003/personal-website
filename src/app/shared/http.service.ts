import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, Observable, throwError, retry, timeout } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
   providedIn: 'root'
})

export class HttpService {
   // Use absoulte paths to bypass the config proxy and requires CORS
   // private emailUrl = `${environment.apiUrl}/api/send-email`;
   private emailUrl = "/api/send-email";


   http: HttpClient = inject(HttpClient);

   sendEmail(data: { name: string, email: string; text: string;}): Observable<any> {
      return this.http.post(this.emailUrl, data).pipe(
            timeout(5000),
            retry(2),
            catchError(error => {
               if(error.name === 'TimeoutError') {
                  console.error("The request timed out!");
               }

               console.log("In here");
               return throwError(() => error);
            })
         );
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