import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import { ArticlesModule } from '../articles/articles.module';
import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings/settings.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../auth/guard/auth.guard';
import { SettingsFormGuard } from '../auth/guard/settings-form.guard';

const routes: Routes = [
  {
    path: 'profile',
    children: [
      {
        path: ':username',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    canDeactivate: [SettingsFormGuard]
  },
];

@NgModule({
  declarations: [ProfileComponent, SettingsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    [RouterModule.forChild(routes)],
    ArticlesModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [ProfileComponent],
})
export class ProfileModule {}
