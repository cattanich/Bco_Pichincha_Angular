import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static dateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return inputDate >= today ? null : { invalidDate: true };
  }

  static dateRevisionValidator(releaseDate: string): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !releaseDate) return null;
      
      const revisionDate = new Date(control.value);
      const release = new Date(releaseDate);
      
      // Check if dates are one year apart
      const oneYearLater = new Date(release);
      oneYearLater.setFullYear(release.getFullYear() + 1);
      
      return revisionDate.getTime() === oneYearLater.getTime() ? null : { invalidRevisionDate: true };
    };
  }
}
