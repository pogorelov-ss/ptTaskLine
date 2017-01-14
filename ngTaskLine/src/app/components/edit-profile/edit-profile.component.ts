import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Project } from '../../user-types/Project';
import { KottansLogoComponent } from '../kottans-logo/kottans-logo.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.sass']
})
export class EditProfileComponent implements OnInit {
    private connections:Array<any>;
    public user:any;
    public tokenField:string;
    public selectDefault:any;
    public addProjectId:string;

    constructor(private authService:AuthService, private taskService:TaskService, private cd: ChangeDetectorRef) {
        this.connections = [];
        if (this.authService.userDataReady) {
            this.init()
            this.tokenField = this.user.pt_profile.api_token;
        } else {
            this.connections.push(
                this.authService.onUserReady
                    .subscribe(() => {
                        this.init()
                        this.tokenField = this.user.pt_profile.api_token;
                        this.cd.detectChanges()
                    })
            )
        }
    }

    ngOnInit() {

    }

    init():void {
        this.user = this.authService.userData;
        console.log(this.user)
    }

    submitToken() {
        this.taskService.putProfile(this.user.pt_profile.id,
            {
                "api_token": this.tokenField,
            }
        ).subscribe(
            res => {
                this.user.pt_profile.api_token = this.tokenField;
            },
            err => {
                //TODO: handle error
            }
        )
    }

    addProject() {
        let project = {
            project_id: +this.addProjectId,
            user: this.user.id,
            pt_profile: this.user.pt_profile.id
        }
        this.taskService.addProject(project).subscribe(
            res => {
                this.authService.authCheck();
            },
            err => {
                //TODO: handle error
            }
        )
    }

    submitDefault() {
        this.taskService.putProfile(this.user.pt_profile.id,
            {
                "related_json": {
                    "default_project": this.selectDefault.replace(/\#/g, '')
                },
            }
        ).subscribe(
            res => {
                this.authService.authCheck();
            },
            err => {
                //TODO: handle error
            }
        )
    }

    ngOnDestroy() {
        this.connections.forEach(connection => connection.unsubscribe())
    }
}
