import { TestBed } from '@angular/core/testing';

import { SettingsFormGuard } from './settings-form.guard';

describe('SettingsFormGuard', () => {
  let guard: SettingsFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SettingsFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
