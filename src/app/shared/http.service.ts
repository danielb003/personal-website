import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private readonly emailUrl:string = "http://localhost:5000/send-email";

  constructor(private http: HttpClient) { }

  sendEmail(data:any) {
    return this.http.post(this.emailUrl, data
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