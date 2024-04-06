import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessInformationFormComponent } from './business-information-form.component';

describe('AddressFormComponent', () => {
  let component: BusinessInformationFormComponent;
  let fixture: ComponentFixture<BusinessInformationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessInformationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
