import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the status when showSide is called', () => {
    component.status = false;
    component.showSide();
    expect(component.status).toBe(true);
    component.showSide();
    expect(component.status).toBe(false);
  });

  it('should call the event function with the new status when showSide is called', () => {
    component.status = false;
    spyOn(component, 'event');
    component.showSide();
    expect(component.event).toHaveBeenCalledWith(true);
    component.showSide();
    expect(component.event).toHaveBeenCalledWith(false);
  });

  it("test a method event in header component", () => {
    const show = true;
    const spyEmitter = spyOn(component.showSidebar, 'emit');
    component.event(show);
    expect(spyEmitter).toHaveBeenCalledWith(true);
  });
});
