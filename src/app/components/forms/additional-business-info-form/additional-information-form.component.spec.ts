import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInformationFormComponent } from './additional-information-form.component';

describe('AdditionalBusinessInfoFormComponent', () => {
  let component: AdditionalInformationFormComponent;
  let fixture: ComponentFixture<AdditionalInformationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionalInformationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
