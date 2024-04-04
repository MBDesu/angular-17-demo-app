import { Component, Output } from '@angular/core';
import { FormBuilder, FormControlStatus, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { filter } from 'rxjs';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent {

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

  protected addressForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    addressLineOne: ['', Validators.required],
    addressLineTwo: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postalCode: ['', Validators.required],
  });

  @Output()
  errors = this.addressForm.statusChanges;

  constructor(private fb: FormBuilder) {}

}
