import { Component, OnInit, OnDestroy } from '@angular/core';
import { PivotalService } from '../../services/pivotal.service';
import { Story } from '../../user-types/Story';
import { ProjectUser } from '../../user-types/ProjectUser';
import { User } from '../../user-types/User';
import { KottansLogoComponent } from '../kottans-logo/kottans-logo.component';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.sass']
})
export class TaskTableComponent implements OnInit, OnDestroy {
  connections:Array<any>;
  stories:Array<Story>;

  constructor(private pivotalService:PivotalService) {
    this.connections = [];
    this.connections.push(
      this.pivotalService.onAllDataReady
        .subscribe(() => {
            this.stories = this.pivotalService.stories
                .map(story => {
                    story.requester = this.pivotalService.projectUsers
                        .find(user => story.requested_by_id === user.person.id)
                    story.owner = this.pivotalService.projectUsers
                        .find(user => story.owned_by_id === user.person.id)
                    return story;
                });
        })
    )
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.connections.forEach(connection => connection.unsubscribe())
  }

}
