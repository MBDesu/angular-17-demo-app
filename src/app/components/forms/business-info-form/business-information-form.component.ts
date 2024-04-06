import { Component, inject } from '@angular/core';
import { FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { BaseFormComponent } from '../base-form/base-form.component';
import { NestedForm } from '../nested-form';

@Component({
  selector: 'app-business-information-form',
  standalone: true,
  imports: [
    BaseFormComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BusinessInformationFormComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: BusinessInformationFormComponent,
      multi: true,
    },
  ],
  templateUrl: './business-information-form.component.html',
  styleUrl: './business-information-form.component.scss'
})
export class BusinessInformationFormComponent extends NestedForm {

  private fb = inject(FormBuilder);

  protected states = [
    'AL', 'AK', 'AZ', 'AR', 'AS', 'CA',
    'CO', 'CT', 'DE', 'DC', 'FL', 'GA',
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA',
    'KS', 'KY', 'LA', 'ME', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE',
    'NV', 'NH', 'NJ', 'NM', 'NY', 'NC',
    'ND', 'MP', 'OH', 'OK', 'OR', 'PA',
    'PR', 'RI', 'SC', 'SD', 'TN', 'TX',
    'TT', 'UT', 'VT', 'VA', 'VI', 'WA',
    'WV', 'WI', 'WY',
  ];

  override value = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    addressLineOne: ['', Validators.required],
    addressLineTwo: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postalCode: ['', Validators.required],
  });

  constructor() {
    super();
  }

}
