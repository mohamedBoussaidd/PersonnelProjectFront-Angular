import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererEntrepriseComponent } from './gerer-entreprise.component';

describe('GererEntrepriseComponent', () => {
  let component: GererEntrepriseComponent;
  let fixture: ComponentFixture<GererEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GererEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
