import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appAtLeastSomeChecked]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: AtLeastSomeCheckedValidatorDirective,
      multi: true,
    }
  ],
  standalone: true
})
export class AtLeastSomeCheckedValidatorDirective implements Validator {

  @Input()
  minRequired = 1;

  validate = (group: FormGroup): ValidationErrors | null => {
    let checked = 0;
    Object.keys(group.controls).forEach((key) => {
      const control = group.controls[key];
      if (control.value === true) {
        checked++;
      }
    });
    if (checked < this.minRequired) {
      return {
        atLeastSomeChecked: true
      }
    }
    return null;
  };

}
