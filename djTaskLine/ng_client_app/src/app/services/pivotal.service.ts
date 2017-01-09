import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PivotalService {
	private apiUrl:string = 'https://www.pivotaltracker.com/services/v5/';
	private trackerToken:string = '0cfb56791dc84248f4c3785d22b76a63';
	private projectId:string = '1268168';
	private projectUrl:string;
	private pendingRequest:boolean = false;

	constructor(private _http:Http) {
        this.projectUrl = `projects/${this.projectId}/`;
	}

    getAllStartedStories(limit?:number){
        let headers = new Headers();
        headers.append('X-TrackerToken', this.trackerToken);
    	limit |= 300;
        this.pendingRequest = true;
        return this._http.get(`${this.apiUrl}${this.projectUrl}stories?with_state=started&limit=${limit}`, {headers: headers})
            .map(res => {
                    this.pendingRequest = false;
                    return res.json()
                },
                error => {
                    console.error("Error during get stories\n", error);
                });
    }

    getMyUserInfo(){
        let headers = new Headers();
        headers.append('X-TrackerToken', this.trackerToken);
        this.pendingRequest = true;
        return this._http.get(`${this.apiUrl}me`, {headers: headers})
            .map(res => {
                    this.pendingRequest = false;
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
                    this.pendingRequest = false;
                    return res.json()
                },
                error => {
                    console.error("Error during get project users\n", error);
                });
    }
}
