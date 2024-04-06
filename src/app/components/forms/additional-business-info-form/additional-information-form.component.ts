import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BaseFormComponent } from '../base-form/base-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NestedForm } from '../nested-form';
import { CustomValidators } from '../validators';

@Component({
  selector: 'app-additional-business-information-form',
  standalone: true,
  imports: [
    BaseFormComponent,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: AdditionalInformationFormComponent,
    multi: true,
  },
  {
    provide: NG_VALIDATORS,
    useExisting: AdditionalInformationFormComponent,
    multi: true,
  },
],
  templateUrl: './additional-information-form.component.html',
  styleUrl: './additional-information-form.component.scss'
})
export class AdditionalInformationFormComponent extends NestedForm {

  private fb = inject(FormBuilder);

  override value = this.fb.group({
    paymentAcceptance: this.fb.group({
      inPerson: [],
      online: [],
      phoneOrMail: [],
    }, {
      validators: CustomValidators.requireAtLeastSomeCheckedValidator(),
    }),
  });

  constructor() {
    super();
  }

}
