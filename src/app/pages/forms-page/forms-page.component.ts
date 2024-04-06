import { Component, inject, OnInit } from '@angular/core';
import {
  BusinessInformationFormComponent
} from '../../components/forms/business-info-form/business-information-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  AdditionalInformationFormComponent
} from '../../components/forms/additional-business-info-form/additional-information-form.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-forms-page',
  standalone: true,
  imports: [
    AdditionalInformationFormComponent,
    BusinessInformationFormComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    JsonPipe,
  ],
  templateUrl: './forms-page.component.html',
  styleUrl: './forms-page.component.scss'
})
export class FormsPageComponent implements OnInit {

  private fb = inject(FormBuilder);

  protected form = this.fb.group({
    businessInformation: [],
    additionalInformation: [],
  });

  ngOnInit(): void {
    this.form.statusChanges.subscribe((status) => {
      console.log(JSON.stringify({
        form: status,
        businessInformation: this.form.controls.additionalInformation.status,
        additionalInformation: this.form.controls.additionalInformation.status,
      }, null, 2))
    });
  }

  updateValidity(): void {
    this.form.updateValueAndValidity();
    this.form.controls.businessInformation.updateValueAndValidity();
    this.form.controls.additionalInformation.updateValueAndValidity();
  }

}
