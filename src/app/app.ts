import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Carousel } from './carousel/carousel';
import { SkillsetComponent } from './skillset-component/skillset';
import { ContactFormComponent } from './contact-form/contact-form';
import { DividerComponent } from './divider/divider';
import { ButtonComponent } from './button/button';
import { Title, Meta } from '@angular/platform-browser';

@Component({
   selector: 'app-root',
   imports: [RouterOutlet, ButtonComponent, Carousel, SkillsetComponent, ContactFormComponent, DividerComponent],
   styleUrl: './app.scss',
   templateUrl: './app.html'
})

export class App {
   protected isLoading = signal(false);
   protected readonly title:string = "Daniel Bellino";

   constructor(private titleService: Title, private metaService: Meta) {
      this.titleService.setTitle(this.title);
      this.metaService.updateTag({ name: 'author', content: this.title });
      this.metaService.updateTag({ name: 'description', content: "The personal website of Daniel Bellino, a software developer based in Melbourne Australia." })
      this.metaService.updateTag({ name: "keywords", content: "HTML, SCSS, CSS, JavaScript, TypeScript, Angular, JSON, Daniel, Bellino, Daniel Bellino, " +
                                    "software developer, developer, software engineer, Melbourne, Australia" })
   }
}
