import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounce, email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { HttpService } from '../services/http.service';
import { ButtonComponent } from '../button/button';
import { throwError, catchError, retry, timeout } from 'rxjs';
import { inject } from '@angular/core';

interface ContactData {
   name: string;
   email: string;
   message: string;
}

@Component({
   selector: 'app-contact-form',
   imports: [ButtonComponent, FormField, FormRoot, MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, ReactiveFormsModule],
   changeDetection: ChangeDetectionStrategy.OnPush,
   styleUrl: './contact-form.scss',
   template: ` 
      <form (submit)="onSubmit($event)" id="form-container">
         <mat-form-field appearance="outline" class="form-field">
            <mat-label>Enter your name</mat-label>
            <input matInput 
               type="text" 
               [formField]="contactForm.name"
               placeholder="Patrick Doe"
            />
            @if (contactForm.name().invalid() && contactForm.name().touched()) {
               <mat-error class="error-message">
                  @for(error of contactForm.name().errors(); track error) {
                     <div style="display: inline-flex; padding-bottom: 25px;">{{error.message}}</div>
                  }
               </mat-error>
            }
         </mat-form-field>
         <mat-form-field appearance="outline" class="form-field">
            <mat-label>Enter your email</mat-label>
            <input matInput
               type="email"
               placeholder="pat@example.com"
               [formField]="contactForm.email"
            />
            @if (contactForm.email().invalid() && contactForm.email().touched()) {
               <mat-error class="error-message">
                  @for(error of contactForm.email().errors(); track error) {
                     <div style="display: inline-flex;">{{error.message}}</div>
                  }
               </mat-error>
            }
         </mat-form-field>
         <mat-form-field appearance="outline" class="form-field">
            <mat-label>Enter your message</mat-label>
            <textarea matInput 
               rows="5"
               [formField]="contactForm.message">
            </textarea>
            @if (contactForm.message().invalid() && contactForm.message().touched()) {
               <mat-error class="error-message">
                  @for(error of contactForm.message().errors(); track error) {
                     <div style="display: inline-flex;">{{error.message}}</div>
                  }
               </mat-error>
            }
         </mat-form-field>

         <app-button [id]="'contact-button'" [version]="'button'" [text]="buttonText()" [isDisabled]="contactForm().invalid()"></app-button>
      </form> `
})

export class ContactFormComponent {

   protected buttonText = signal("Send");
   protected isLoading:boolean = false;
   @Output() cursorChanged = new EventEmitter<boolean>();

   protected contactModel = signal<ContactData>({
      name: '',
      email: '',
      message: ''
   });

   contactForm = form(this.contactModel, (schemaPath) => {
      required(schemaPath.name, {message: 'You must enter a name'});
      debounce(schemaPath.email, 500);
      required(schemaPath.email, {message: 'You must enter an email'});
      email(schemaPath.email, {message: 'Please enter a valid email address'});
      required(schemaPath.message, {message: 'You must enter a message'});
   });

   private readonly _httpService = inject(HttpService);

   protected changeCursor() {
      this.isLoading = this.isLoading === false ? true : false;
      this.cursorChanged.emit(this.isLoading);
   }

   protected onSubmit(event: Event) {
      event.preventDefault();
      this.buttonText.set("Sending...");
      this.changeCursor();

      const data = {
         name: this.contactModel().name,
         email: this.contactModel().email,
         text: this.contactModel().name + 
         "\n" + this.contactModel().email + 
         "\n\n" + this.contactModel().message
      }

      this._httpService.sendEmail(data)
         .pipe(
            timeout(5000),
            retry(2),
            catchError(error => {
               if(error.name === 'TimeoutError') {
                  console.error("The request timed out!");
               }
               return throwError(() => error);
            })
         )
         .subscribe({
            next: (response) => {},
            error: (err) => {
               this.buttonText.set("Send");
               this.changeCursor();
               alert("The email did not send. Please try again");
            },
            complete: () => {
               this.buttonText.set("Send");
               this.changeCursor();
            }
         });
   }
}
