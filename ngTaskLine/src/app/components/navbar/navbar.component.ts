import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { KottansLogoComponent } from '../kottans-logo/kottans-logo.component';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit, OnDestroy {
	private connections:Array<any>;
	public user:any;
	public userInitails:boolean;

	constructor(private authService:AuthService, private cd: ChangeDetectorRef) {
		this.connections = [];
		if (this.authService.userDataReady) {
			this.init()
		} else {
			this.connections.push(
				this.authService.onUserReady
					.subscribe(() => {
						this.init()
						this.cd.detectChanges()
					})
			)
		}
	}

	ngOnInit() {

	}

	init():void {
		this.user = this.authService.userData;
		this.userInitails = this.user.username.slice(0,2).toUpperCase();
	}

	openPopUp(link:string, method:string):boolean {
		let newWindow = window.open(link, "_blank",
		'menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=no,resizable=no,dependent,width=450,height=500,left=600,top=100');
		if (newWindow) newWindow.addEventListener('unload', (event)=> {
			if (/^\/accounts/g.test(newWindow.location.pathname)) {
				this.authService.authCheck();
			}
		});
		return newWindow ? false : true; // allow the link to work if popup is blocked
	}

	ngOnDestroy() {
		this.connections.forEach(connection => connection.unsubscribe())
	}

}
