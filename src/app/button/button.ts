import { Component, Input, booleanAttribute } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, MatRippleModule],
  styleUrl: './button.scss',
  template: ` @switch(version) {
      @case("button") {
         <button matButton="outlined" id="{{id}}" type="submit" disabled="{{isDisabled}}">{{text}}</button>
      }
      @case("link") {
         <a matButton="outlined" href="{{href}}" id="{{id}}" [attr.download]="downloadable ? 'Daniel Bellino CV.pdf' : null" (click)="check($event)">{{text}}</a>
      }
    }`
})

export class ButtonComponent {
   @Input() text:string = '';
   @Input() href:string = '';
   @Input() id:string = '';
   @Input() version:string = '';
   @Input({ transform: booleanAttribute }) isDisabled:boolean = false;
   @Input({ transform: booleanAttribute }) downloadable:boolean = false;

   check = (event: any): void => {
      if(!this.downloadable) {
         event.preventDefault();
      }
   }
}
