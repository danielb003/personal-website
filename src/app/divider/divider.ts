import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-divider',
  imports: [MatDividerModule],
  styleUrl: './divider.scss',
  template: ` <mat-divider></mat-divider> `
})

export class DividerComponent {}
