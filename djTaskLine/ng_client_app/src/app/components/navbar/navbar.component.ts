import { Component, OnInit } from '@angular/core';
import { PivotalService } from '../../services/pivotal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor(private pivotalService:PivotalService) {

  }

  ngOnInit() {
    this.pivotalService.getMyUserInfo()
      .subscribe(data => console.log(data));
    this.pivotalService.getAllStartedStories()
      .subscribe(data => console.log('getAllStartedStories', data));
    this.pivotalService.getProjectUsers()
      .subscribe(data => console.log('getProjectUsers', data));
  }

}
