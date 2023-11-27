import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styles: `
    li {
      user-select: none;
      cursor: pointer;
    }
  `,
})
export class SidebarComponent {}
