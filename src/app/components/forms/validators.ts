import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';


export class CustomValidators {

  static requireAtLeastSomeCheckedValidator = (minRequired = 1): ValidatorFn => {
    return (formControl: AbstractControl): ValidationErrors | null => {
      const group = formControl as FormGroup;
      let checked = 0;
      Object.keys(group.controls).forEach((key) => {
        const controlValue = group.controls[key].value;
        if (controlValue) checked++;
      });
      if (checked < minRequired) {
        return {
          atLeastSomeChecked: 'At least ' + minRequired + ' checkboxes must be checked.',
        }
      }
      return null;
    }
  }

}
