import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TitleComponent } from './components/title/title.component';
import { TaskTableComponent } from './components/task-table/task-table.component';


const appRoutes:Routes = [
    {
        path: '',
        component: TitleComponent
    }
]

export const appRoutesProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
