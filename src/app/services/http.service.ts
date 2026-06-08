import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, Observable, map, throwError, retry, timeout } from 'rxjs';
import { environment } from '../../environments/environment.prod';

export interface EmailData {
   name: string;
   email: string;
   text: string;
}

@Injectable({
   providedIn: 'root'
})
export class HttpService {
   // Use absoulte paths to bypass the config proxy and requires CORS
   // private emailUrl = `${environment.apiUrl}/api/send-email`;
   // Vercel uses relative paths and configures the rest
   private emailUrl = "/api/send-email";
   private readonly _http = inject(HttpClient);

   sendEmail(data: EmailData): Observable<string> {
      // Using res.send() instead of res.json() because we need to declare raw text file
      return this._http.post<{ message: string }>(this.emailUrl, data).pipe(
            // timeout(5000),
            // retry(2),
            // catchError(error => {
            //    if(error.name === 'TimeoutError') {
            //       console.error("The request timed out!");
            //    }

            //    console.log("this.http.post FAILED");
            //    return throwError(() => error);
            // })
            map((res) => res.message),
         );
   }
}

// ).pipe(
//       takeUntilDestroyed(),
//       catchError((error: HttpErrorResponse) => {
//         // Handle client/server errors here
//         console.error('HTTP Error:', error);
//         return throwError(() => new Error('Something bad happened; please try again later.'));
//       })