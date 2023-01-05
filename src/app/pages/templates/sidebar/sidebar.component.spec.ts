import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit showSidebar event with true value', () => {
    spyOn(component.showSidebar, 'emit');
    component.event(true);
    expect(component.showSidebar.emit).toHaveBeenCalledWith(true);
  });

  it('should emit showSidebar event with false value', () => {
    spyOn(component.showSidebar, 'emit');
    component.event(false);
    expect(component.showSidebar.emit).toHaveBeenCalledWith(false);
  });


});
