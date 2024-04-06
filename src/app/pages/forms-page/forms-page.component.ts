import { Component, inject } from '@angular/core';
import {
  BusinessInformationFormComponent
} from '../../components/forms/business-info-form/business-information-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  AdditionalInformationFormComponent
} from '../../components/forms/additional-business-info-form/additional-information-form.component';
import { JsonPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-forms-page',
  standalone: true,
  imports: [
    AdditionalInformationFormComponent,
    BusinessInformationFormComponent,
    JsonPipe,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './forms-page.component.html',
  styleUrl: './forms-page.component.scss'
})
export class FormsPageComponent {

  private fb = inject(FormBuilder);

  protected form = this.fb.group({
    businessInformation: [''],
    additionalInformation: [''],
  });

}
