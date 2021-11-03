import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFactureComponent } from './form-facture.component';

describe('FormFactureComponent', () => {
  let component: FormFactureComponent;
  let fixture: ComponentFixture<FormFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
