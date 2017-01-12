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

	openPopUp(link:string, method:string) {
		let newWindow = window.open(link, "_blank",
		'menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=no,resizable=no,dependent,width=450,height=500,left=600,top=100');
		if (newWindow) newWindow.addEventListener('unload', (event)=> {
			if (window.location.host === newWindow.location.host) {

			}
		});
		return newWindow ? false : true; // allow the link to work if popup is blocked
	}

	ngOnDestroy() {
		this.connections.forEach(connection => connection.unsubscribe())
	}

}
