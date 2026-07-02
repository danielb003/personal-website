import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
   CarouselCaptionComponent,
   CarouselComponent,
   CarouselControlComponent,
   CarouselIndicatorsComponent,
   CarouselInnerComponent,
   CarouselItemComponent,
   ThemeDirective
} from '@coreui/angular';

@Component({
   selector: 'app-carousel',
   imports: [CommonModule, NgFor, RouterLink, CarouselComponent, CarouselIndicatorsComponent, CarouselInnerComponent, CarouselItemComponent, CarouselCaptionComponent, CarouselControlComponent, ThemeDirective],
   styleUrl: './carousel.scss',
   template: `
   <c-carousel [interval]="5000" transition="crossfade">
      <c-carousel-indicators />
      <c-carousel-inner>
         <c-carousel-item *ngFor="let slide of slides">
         <a target="_blank" href="{{slide.href}}">
               <img
               alt="{{slide.title}}"
               class="d-block w-100"
               loading="eager"
               src="{{slide.src}}">
         </a>
         <c-carousel-caption class="d-none d-md-block">
            <h3>{{slide.title}}</h3>
            <p>{{slide.subtitle}}</p>
         </c-carousel-caption>
         </c-carousel-item>
      </c-carousel-inner>
      <c-carousel-control [routerLink] caption="Previous" direction="prev"></c-carousel-control>
      <c-carousel-control [routerLink] caption="Next" direction="next"></c-carousel-control>
   </c-carousel> `
})

export class Carousel implements OnInit {

   slides: any[] = new Array(3).fill({ id: -1, src: '', href: '', title: '', subtitle: '' });

   ngOnInit(): void {
      this.slides[0] = {
         id: 0,
         src: "../../assets/images/guesswho_portfolio.jpg",
         href: 'https://google.com.au',
         title: 'Guess Who',
         subtitle: 'Two algorithms that play Guess Who.'
      };
      this.slides[1] = {
         id: 1,
         src: '../assets/images/prolific-trading.png',
         href: 'https://monopoly-shoe-crypto-trader.firebaseapp.com/',
         title: 'ReactJS Stock Market App',
         subtitle: 'This is a simulation stock market application I made in University.'
      };
      this.slides[2] = {
         id: 2,
         src: '../../../assets/images/bookingsystem_portfolio.jpg',
         href: 'https://github.com/danielb003/bookingsystem',
         title: 'Booking System',
         subtitle: 'A booking system I made at University.'
      };
   }
}
