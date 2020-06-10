import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscAdminComponent } from './insc-admin.component';

describe('InscAdminComponent', () => {
  let component: InscAdminComponent;
  let fixture: ComponentFixture<InscAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
