import { ControlValueAccessor, FormGroup, ValidationErrors, Validator } from '@angular/forms';

export type ChangeCallbackFn<T> = (value: T) => void;

/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class NestedForm implements ControlValueAccessor, Validator {

  abstract value: FormGroup;

  getErrors(): string[] {
    const errors: string[] = [];
    if (this.value.controls) {
      Object.keys(this.value.controls).forEach((control) => {
        if (this.value.controls[control].errors) {
          Object.keys(this.value.controls[control].errors as { [key: string]: any }).forEach((error) => {
            errors.push(`${control}: (${error}): ${this.value.controls[control]?.errors?.[error]}`);
          });
        }
      });
    }
    return errors;
  }

  validate(): ValidationErrors | null {
    if (this.value.valid) {
      return null;
    }
    return { invalidForm: { valid: false, message: 'Form is invalid' } };
  }

  registerOnChange(fn: ChangeCallbackFn<object>): void {
    this.value.valueChanges.subscribe(fn);
  }

  registerOnTouched(): void {
    return;
  }

  writeValue(obj: FormGroup): void {
    if (obj) {
      this.value.setValue(obj, { emitEvent: false });
    }
  }

}
