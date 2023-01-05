import { ComponentFixture, TestBed } from '@angular/core/testing';
import { doesNotReject } from 'assert';

import { PagesComponent } from './pages.component';

describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the sidebar when showSidebar is called with true', () => {
    expect(component.showSidebar(true)).toBe(true);
  });

  it('should hide the sidebar when showSidebar is called with false', () => {
    expect(component.showSidebar(false)).toBe(false);
  });
});
