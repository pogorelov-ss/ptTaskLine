import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Story } from '../user-types/Story';
import { ProjectUser } from '../user-types/ProjectUser';
import { User } from '../user-types/User';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';
import { TaskService } from './task.service';

@Injectable()
export class PivotalService {
	private apiUrl:string = 'https://www.pivotaltracker.com/services/v5/';
	private trackerToken:string;
	private projectId:string;
	private projectUrl:string;
	private pendingRequest:boolean = false;
    private obsStories:Observable<Story[]>;
    private obsMyUser:Observable<User>;
    private obsProfUsers:Observable<ProjectUser[]>;
    public timestamps:Array<any>;
    public onAllDataReady:EventEmitter<any>;
    public stories:Array<Story>;
    public projectUsers:Array<ProjectUser>;
    public user:User;
    public ready:boolean;

	constructor(private _http:Http, private authService:AuthService, private router: Router, private taskService:TaskService) {
        this.onAllDataReady = new EventEmitter();

        if (this.authService.userDataReady) {
            this.init(this.authService.userData.pt_profile)
        } else {
            this.authService.onUserReady.subscribe(()=>{
                //set staff
                this.init(this.authService.userData.pt_profile);
            })
        }

	}

    init(profile:any) {
        if (profile.api_token && profile.project.length) {
            this.pendingRequest = true;
            this.trackerToken = profile.api_token.replace(/\-/g, '');
            this.projectId = profile.related_json.default_project || profile.project[0].project_id;
            this.projectUrl = `projects/${this.projectId}/`;
            this.getAllInfo().subscribe(() => this.onAllDataReady.emit());
        } else {
            this.router.navigate(['/edit-profile']);
        }
    }

    getAllInfo(forceUpdate?:boolean) {
        this.stories = [];

        this.projectUsers = [];

        //Try to get existed data unless forceUpdate.

        this.obsStories = this.getAllStartedStories();

        this.obsMyUser = this.getMyUserInfo();

        this.obsProfUsers = this.getProjectUsers();

        return Observable.forkJoin([this.obsStories, this.obsMyUser, this.obsProfUsers, this.taskService.getTimestamps()])
                .map((results:Array<any>) => {
                        this.pendingRequest = false;
                        this.stories = results[0];
                        this.user = results[1];
                        this.projectUsers = results[2];
                        this.timestamps = results[3];
                        console.log(this.user, this.stories)
                        this.bindUsers()
                        this.bindTimestamps()
                        this.ready = true;
                    },
                    error => {
                        this.pendingRequest = false;
                        console.error("Error during getting all info\n", error);
                    });
    }

    getAllStartedStories(limit?:number):Observable<Story[]>{
        let headers = new Headers();
        headers.append('X-TrackerToken', this.trackerToken);
    	limit = limit || 300;
        return this._http.get(`${this.apiUrl}${this.projectUrl}stories?with_state=started&limit=${limit}`, {headers: headers})
            .map(res => {
                    return res.json()
                },
                error => {
                    console.error("Error during get stories\n", error);
                });
    }

    getMyUserInfo():Observable<User>{
        let headers = new Headers();
        headers.append('X-TrackerToken', this.trackerToken);
        return this._http.get(`${this.apiUrl}me`, {headers: headers})
            .map(res => {
                    return res.json()
                },
                error => {
                    console.error("Error during get user info\n", error);
                });
    }

    getProjectUsers():Observable<ProjectUser[]>{
        let headers = new Headers();
        headers.append('X-TrackerToken', this.trackerToken);
        return this._http.get(`${this.apiUrl}${this.projectUrl}memberships`, {headers: headers})
            .map(res => {
                    return res.json()
                },
                error => {
                    console.error("Error during get project users\n", error);
                });
    }

    getOneStory(story_id:number):Observable<JSON>{
        let headers = new Headers();
        headers.append('X-TrackerToken', this.trackerToken);
        return this._http.get(`${this.apiUrl}${this.projectUrl}stories/${story_id}/`, {headers: headers})
            .map(res => {
                    return res.json()
                },
                error => {
                    console.error("Error during get story\n", error);
                });
    }

    getStoryComments(story_id:number):Observable<JSON>{
        let headers = new Headers();
        headers.append('X-TrackerToken', this.trackerToken);
        return this._http.get(`${this.apiUrl}${this.projectUrl}stories/${story_id}/comments`, {headers: headers})
            .map(res => {
                    return res.json()
                },
                error => {
                    console.error("Error during get comments\n", error);
                });
    }

    private bindUsers():void {
        this.stories
          .forEach(story => {
              story.requester = this.projectUsers
                  .find(user => story.requested_by_id === user.person.id)
              story.owner = this.projectUsers
                  .find(user => story.owned_by_id === user.person.id)
              story.user_own_story = story.owner_ids.indexOf(this.user.id) !== -1;
              return story;
          });
    }
    private bindTimestamps() {
        this.timestamps
            .forEach(stamp => {
                let stampedStory = this.stories.find(story => story.id === stamp.task_id);
                if (stampedStory) {
                    stampedStory.timestamp = new Date(stamp.started_at);
                }
            })
    }
}
