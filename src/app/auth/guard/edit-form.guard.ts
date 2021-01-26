import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EditComponent } from '../../articles/edit/edit.component';

@Injectable({
  providedIn: 'root',
})
export class EditFormGuard implements CanDeactivate<EditComponent> {
  canDeactivate(component: EditComponent) {
    if (component.form.dirty && !component.submit) {
      return window.confirm(
        'You have some unsaved changes. Are you sure you want to leave?'
      );
    }
    return true;
  }
}
