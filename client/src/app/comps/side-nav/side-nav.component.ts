import { getTreeControlMissingError } from '@angular/cdk/tree';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  @Output() drawerEmitter = new EventEmitter();
  @Input() drawerFromShoppingPage;
  @ViewChild('drawer') drawer;
  constructor() {
    this.drawerEmitter.next(this.drawer);
  }

  ngOnInit(): void {}

  closeSideNav() {
    console.log(this.drawerFromShoppingPage);
    this.drawerFromShoppingPage.toggle();
  }
}
