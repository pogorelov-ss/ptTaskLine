import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
	private myUserUrl:string = `/api/v1/users/user-profile/`;
	private profileUrl:string = `/api/v1/time-line/pt-profiles/`;
	public userData:any;
	public userIsAuth:boolean;
	public onUserReady:EventEmitter<any>;
	public userDataReady:boolean;

	constructor(private _http:Http) {
		this.onUserReady = new EventEmitter();
		this.authCheck(true);

	}

	authCheck(firstRequest?:boolean) {
		this.userIsAuth = false;
		this.userData = null;
		this.userDataReady = false;
		this.getMyUser().subscribe(
			userData => {
				this.userIsAuth = true;
				this.userData = userData;
				this.userDataReady = true;
				this.onUserReady.emit();
			},
			error => {
				this.userDataReady = true;
				this.userIsAuth = false;
				this.userData = null;
				return error;
			})
	}

	getMyUser() {
		let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get(this.myUserUrl, {headers: headers})
            .map(res => {
                    return res.json()
                },
                error => {
                    console.error("Error during get user info\n", error);
                });
	}

}
