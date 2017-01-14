import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PivotalService } from '../../services/pivotal.service';
import { AuthService } from '../../services/auth.service';
import { Story } from '../../user-types/Story';
import { KottansLogoComponent } from '../kottans-logo/kottans-logo.component';
import { TaskService } from '../../services/task.service';

@Component({
	selector: 'app-task-table',
	templateUrl: './task-table.component.html',
	styleUrls: ['./task-table.component.sass']
})
export class TaskTableComponent implements OnInit, OnDestroy {
	connections:Array<any>;
	stories:Array<Story>;

	constructor(
		private pivotalService:PivotalService,
		private authService:AuthService,
		private cd:ChangeDetectorRef,
		private taskService: TaskService) {
		this.connections = [];
		if (this.pivotalService.ready) {
			this.stories = this.pivotalService.stories
		} else {
			this.connections.push(
				this.pivotalService.onAllDataReady
					.subscribe(() => {
						this.stories = this.pivotalService.stories
						this.cd.detectChanges()
					})
			)
		}
	}

	ngOnInit():void {

	}

	setTimeStamp(task:Story) {
		this.taskService.setTimestamp(task.id)
			.subscribe(res => {task.timestamp = new Date(res.started_at)})
	}

	formatDate(date:Date) {
		let first = date.toDateString().substring(4, 10);
		let second = date.toTimeString().substring(0, 8);
		return `${date.toTimeString().substring(0, 8)} - ${date.toDateString().substring(4, 10)}`
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
