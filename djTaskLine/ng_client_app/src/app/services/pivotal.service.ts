import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Story } from '../user-types/Story';
import { ProjectUser } from '../user-types/ProjectUser';
import { User } from '../user-types/User';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class PivotalService {
	private apiUrl:string = 'https://www.pivotaltracker.com/services/v5/';
	private trackerToken:string = '0cfb56791dc84248f4c3785d22b76a63';
	private projectId:string = '1268168';
	private projectUrl:string;
	private pendingRequest:boolean = false;
    private obsStories:Observable<Story[]>;
    private obsMyUser:Observable<User>;
    private obsProfUsers:Observable<ProjectUser[]>;
    public onAllDataReady:EventEmitter<any>;
    public stories:Array<Story>;
    public projectUsers:Array<ProjectUser>;
    public user:User;

	constructor(private _http:Http) {
        this.onAllDataReady = new EventEmitter();
        this.projectUrl = `projects/${this.projectId}/`;
        this.stories = [];
        this.projectUsers = [];
        this.getAllInfo().subscribe(() => this.onAllDataReady.emit());
	}

    getAllInfo(forceUpdate?:boolean) {

        //Try to get existed data unless forceUpdate.
        this.pendingRequest = true;

        this.obsStories = this.getAllStartedStories();

        this.obsMyUser = this.getMyUserInfo();

        this.obsProfUsers = this.getProjectUsers();

        return Observable.forkJoin([this.obsStories, this.obsMyUser, this.obsProfUsers])
                .map((results:Array<any>) => {
                        this.pendingRequest = false;
                        this.stories = results[0];
                        this.user = results[1];
                        this.projectUsers = results[2];
                    },
                    error => {
                        this.pendingRequest = false;
                        console.error("Error during getting all info\n", error);
                    });
    }

    getAllStartedStories(limit?:number){
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

    getMyUserInfo(){
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

    getProjectUsers(){
        let headers = new Headers();
        headers.append('X-TrackerToken', this.trackerToken);
        this.pendingRequest = true;
        return this._http.get(`${this.apiUrl}${this.projectUrl}memberships`, {headers: headers})
            .map(res => {
                    return res.json()
                },
                error => {
                    console.error("Error during get project users\n", error);
                });
    }
}
