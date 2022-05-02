import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

export abstract class FormGroupUtils {
    public addNewControl(formGroup: FormGroup, key: string, newElement: FormGroup) {
        const arrayGroup = formGroup.get(key) as FormArray;
        arrayGroup.push(newElement);
    }

    public removeControl(formGroup: FormGroup, key: string, index: number) {
        const arrayGroup = formGroup.get(key) as FormArray;
        arrayGroup.removeAt(index);
    }

    public getFormArray(formGroup: FormGroup, key: string) {
        return formGroup.get(key) as FormArray;
    }

    public getGroupOption(formGroup: FormGroup, key: string, i: number) {
        return (formGroup.get(key) as FormArray).controls[i] as FormGroup;
    }

    public getValueFromFormGroup(formGroup: FormGroup, key: string) {
        return formGroup.get(key)?.value
    }

    public getFormGroupFromFormGroupGeneral(formGroup: FormGroup, key: string): FormGroup {
        return formGroup.get(key) as FormGroup
    }
}