import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { SettingsComponent } from 'src/app/profile/settings/settings.component';

@Injectable({
  providedIn: 'root',
})
export class SettingsFormGuard implements CanDeactivate<SettingsComponent> {
  canDeactivate(component: SettingsComponent) {
    if (component.form.dirty && !component.submit) {
      return window.confirm(
        'You have some unsaved changes. Are you sure you want to leave?'
      );
    }
    return true;
  }
}
