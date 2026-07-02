import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderModule } from '@coreui/angular';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, HeaderModule],
  template: ` 
    <mat-toolbar>
      <button matMiniFab aria-label="Example icon button with a menu icon">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>
    
    <!-- <c-dropdown alignment="end">
        <a cHeaderToggler cDropdownToggle cNavLink [caret]="false"></a>
        <ul cDropdownMenu>
          <li><a [routerLink] cDropdownItem>Action</a></li>
          <li><a [routerLink] cDropdownItem>Another action</a></li>
          <li>
            <hr cDropdownDivider>
          </li>
          <li><a [routerLink] cDropdownItem>Something else</a></li>
        </ul>
      </c-dropdown> -->
    `,
  styleUrl: './toolbar.scss',
})

export class ToolbarComponent {}
