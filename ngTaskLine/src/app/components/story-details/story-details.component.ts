import { Component, OnInit } from '@angular/core';
import { PivotalService } from '../../services/pivotal.service';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Story } from '../../user-types/Story';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.sass']
})
export class StoryDetailsComponent implements OnInit {
    connections:Array<any>;
    stories:Array<Story>;
    story:Story;

    constructor(
            private pivotalService:PivotalService,
            private authService:AuthService,
            private taskService:TaskService,
            private route: ActivatedRoute) {
        this.connections = [];
        if (this.authService.userDataReady) {
            this.init()
        } else {
            this.connections.push(
                this.authService.onUserReady
                    .subscribe(() => {
                        this.init()
                        //this.cd.detectChanges()
                    })
            )
        }
    }

    init() {
        let getStoryObs = this.pivotalService.getOneStory(+this.route.snapshot.params['story_id']);
        let getComments = this.pivotalService.getStoryComments(+this.route.snapshot.params['story_id']);
        let getRelatedUsers = this.pivotalService.getProjectUsers();
        let myInfo = this.pivotalService.getMyUserInfo();

        Observable.forkJoin(getStoryObs, getComments, this.taskService.getTimestamps(), getRelatedUsers, myInfo)
            .subscribe(results => {
                this.story = results[0];
                this.story.comments = results[1];
                this.story.timestamp = results[2].find(stamp => stamp.task_id === this.story.id);
                this.story.comments.map(comment => {
                    comment.author = results[3].find(user => {
                        return user.person.id === comment.person_id;
                    })
                })
                this.story.user_own_story = this.story.owner_ids.indexOf(results[4].id) !== -1;
                console.log(this.story)
            })
        //this.pivotalService.getOneStory(this.router.params['story_id'])
    }

    formatDate(time:string|Date) {
        let date = time instanceof Date ? time : new Date(time);
        let first = date.toDateString().substring(4, 10);
        let second = date.toTimeString().substring(0, 8);
        return `${date.toTimeString().substring(0, 8)} - ${date.toDateString().substring(4, 10)}`
    }

    setTimeStamp(task:Story) {
        this.taskService.setTimestamp(task.id)
            .subscribe(res => {task.timestamp = new Date(res.started_at)})
    }

    ngOnInit():void {

    }

    ngOnDestroy():void {
        this.connections.forEach(connection => connection.unsubscribe())
    }

}
function pad(num, size) {
    num = String(num);
    while (num.length < (size || 2)) {num = "0" + num;}
    return num;
}
