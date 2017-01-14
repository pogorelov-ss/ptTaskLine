import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project } from '../user-types/Project';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TaskService {
	private profilesUrl:string;
	private projectsUrl:string;
	private timestampUrl:string;

	constructor(private _http:Http) {
		this.profilesUrl = '/api/v1/time-line/pt-profiles/';
		this.projectsUrl = '/api/v1/time-line/projects/';
		this.timestampUrl = '/api/v1/time-line/task-lines/';
	}

	putProfile(id, data) {
		let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRFTOKEN', this.getCookie('csrftoken'));
        return this._http.put(
        	`${this.profilesUrl}${id}/`,
        	data,
        	{headers: headers})
            .map(res => {
                    return res.json()
                },
                error => {
                    console.error("Error during putting profile\n", error);
                });
	}

	addProject(data:Project) {
		let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRFTOKEN', this.getCookie('csrftoken'));
        return this._http.post(
        	this.projectsUrl,
        	data,
        	{headers: headers})
            .map(res => {
                    return res.json()
                },
                error => {
                    console.error("Error during putting api key\n", error);
                });
	}

	setTimestamp(id:number) {
		let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRFTOKEN', this.getCookie('csrftoken'));
        return this._http.post(
        	this.timestampUrl,
        	{
        		"task_id": id
        	},
        	{headers: headers})
            .map(res => {
                    return res.json()
                },
                error => {
                    console.error("Error during setting time stamp\n", error);
                });
	}

	getTimestamps() {
		let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRFTOKEN', this.getCookie('csrftoken'));
        return this._http.get(
        	this.timestampUrl,
        	{headers: headers})
            .map(res => {
                    return res.json()
                },
                error => {
                    console.error("Error during setting time stamp\n", error);
                });
	}

	private getCookie(name:string):string {
		let matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

}
