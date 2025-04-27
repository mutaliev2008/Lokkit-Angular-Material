import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const ConfirmPasswordValidate: ValidatorFn = (
  data: AbstractControl
): ValidationErrors | null => {
  if (
    !data.value.password === data.value.confirmPassword &&
    data.value.confirmPassword !== null
  ) {
    return null;
  }

  return { passwordNotSame: true };
};
