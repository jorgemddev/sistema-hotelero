import { AbstractControl, ValidationErrors, Validators } from "@angular/forms";
import { Helps } from "./helps";
import { validateRut } from '@fdograph/rut-utilities';

export class MyValidators extends Validators {

    static rut(control: AbstractControl): ValidationErrors | null {
        console.log("control->", control);
        if (control.errors?.["required"]) {
            return null;
        }
        if (!validateRut(control.value)) {
            return { invalidRut: true };
        } else {
            return null;
        }
    }

}