import { Component, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
   selector: 'app-skillset',
   imports: [CdkDrag, CdkDropList, MatChipsModule, MatRippleModule],
   styleUrl: './skillset.scss',
   template: ` 
   <div id="skillset-chip-group" cdkDropListGroup>
      @for(row of skills; track row; let rowIndex = $index) {
         <p>{{category[rowIndex]}}</p>
        
         <mat-chip-set 
            id="skillset-chip-list"
            cdkDropList
            cdkDropListOrientation="mixed"
            (cdkDropListDropped)="drop(row, $event)"> 

            @for(cell of row; track cell; let colIndex = $index) {
                <mat-chip id="skillset-chip" cdkDrag matRipple>{{cell}}</mat-chip>
            }
         </mat-chip-set>
      }
   </div>`
})

export class SkillsetComponent {
   @Input() readonly category: string[] = [
      'Language & Frameworks', 'Database & Networking', 'Cyber Security', 'Developement Tools & Environments',
      'Operating Systems'
   ];

   readonly skills: string[][] = [
      ['Java', 'HTML5', 'SCSS', 'JavaScript / TypeScript', 'C ANSI', 'PHP', 'React', 'Angular', 'SQL',
         'JSON', 'BASH', 'Laravel'],
      ['RDBMS | NoSQL', 'Stored Procedures', 'Views', 'TCP | UDP', 'IPv4 / 6', 'HTTP / S', 'S / FTP', 'SMTP / IMAP | POP3 | VOIP',
         'TLS', 'ISO Model', 'DHCP | Static IP | PPPoE', 'DNS'],
      ['Hashing', 'Data Encryption Standards', 'MFA | 2FA', 'Public Key Cryptography', 'Data Validation'],
      ['Git', 'Jira', 'JUnit (TDD)', 'MaterialUI', 'Wordpress', 'Virtual Machines', 'API', 'AWS', 'cPanel', 'VPN',
         'MAC | HMAC', 'Code Modularisation', 'CMD / VIM / Scripts'],
      ['Windows', 'Mac', 'IOS', 'Android', 'Ubuntu', 'Kali Linux', 'PopOS']
   ];

   drop(row: string[], event: CdkDragDrop<string[][]>) {
      if (event.previousContainer === event.container) {
         moveItemInArray(row, event.previousIndex, event.currentIndex);
      }
   }
}