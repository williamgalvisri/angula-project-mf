import { FormGroup } from "@angular/forms";

export class LabelTextFieldProps {
    key: string;
    name: string;
    type: string;
    multiline: boolean;
    placeholder: string;
    label: string;
    formGroup: FormGroup;

    constructor(item?: LabelTextFieldProps) {
        this.key = item?.key ?? '';
        this.name = item?.name ?? '';
        this.type = item?.type ?? '';
        this.multiline = item?.multiline ?? false;
        this.placeholder = item?.placeholder ?? '';
        this.label = item?.label ?? '';
        this.formGroup = item?.formGroup ?? new FormGroup({});
    }
}