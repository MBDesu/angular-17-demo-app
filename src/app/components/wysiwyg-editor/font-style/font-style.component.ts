import { Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NestedForm } from '../../forms/nested-form';
import { FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-wysiwyg-font-style',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FontStyleComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: FontStyleComponent,
      multi: true,
    },
  ],

  templateUrl: './font-style.component.html',
  styleUrl: './font-style.component.scss'
})
export class FontStyleComponent extends NestedForm {

  private fb = inject(FormBuilder);

  override value = this.fb.group({
    fontStyle: [''],
  });

}
