import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutesProviders } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PivotalService } from './services/pivotal.service';
import { TitleComponent } from './components/title/title.component';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { KottansLogoComponent } from './components/kottans-logo/kottans-logo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TitleComponent,
    TaskTableComponent,
    KottansLogoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutesProviders, PivotalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
