import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutesProviders } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PivotalService } from './services/pivotal.service';
import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';
import { TitleComponent } from './components/title/title.component';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { KottansLogoComponent } from './components/kottans-logo/kottans-logo.component';
import { StoryDetailsComponent } from './components/story-details/story-details.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		TitleComponent,
		TaskTableComponent,
		KottansLogoComponent,
		StoryDetailsComponent,
		EditProfileComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing
	],
	providers: [
		appRoutesProviders,
		PivotalService,
		AuthService,
		TaskService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
