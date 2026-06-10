import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface EmailPayload {
   name: string;
   email: string;
   text: string;
}

export interface ApiResponse {
   success: boolean;
   message?: string;
   error?: string;
}

@Injectable({
   providedIn: 'root'
})
export class HttpService {
   // Vercel uses relative paths and configures the rest
   private emailUrl = "/api/send-email";
   private readonly _http = inject(HttpClient);

   sendEmail(payload: EmailPayload): Observable<ApiResponse> {
      return this._http.post<ApiResponse>(this.emailUrl, payload);
   }
}

/*.pipe(
      takeUntilDestroyed(),
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        return throwError(() => new Error('Something bad happened; please try again later.'));
})*/