import { Component, OnInit, OnDestroy } from '@angular/core';
import { PivotalService } from '../../services/pivotal.service';
import { KottansLogoComponent } from '../kottans-logo/kottans-logo.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit, OnDestroy {
  connections:Array<any>;

  constructor(private pivotalService:PivotalService) {
    this.connections = [];
    this.connections.push(
      this.pivotalService.onAllDataReady
        .subscribe(() => console.log(this.pivotalService))
    )
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.connections.forEach(connection => connection.unsubscribe())
  }

}
