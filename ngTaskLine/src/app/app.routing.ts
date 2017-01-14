import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TitleComponent } from './components/title/title.component';
import { StoryDetailsComponent } from './components/story-details/story-details.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';


const appRoutes:Routes = [
    {
        path: '',
        component: TitleComponent
    },
    {
        path: 'story/:story_id',
        component: StoryDetailsComponent
    },
    {
        path: 'edit-profile',
        component: EditProfileComponent
    }
]

export const appRoutesProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
