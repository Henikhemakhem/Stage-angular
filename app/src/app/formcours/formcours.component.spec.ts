import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcoursComponent } from './formcours.component';

describe('FormcoursComponent', () => {
  let component: FormcoursComponent;
  let fixture: ComponentFixture<FormcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormcoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
