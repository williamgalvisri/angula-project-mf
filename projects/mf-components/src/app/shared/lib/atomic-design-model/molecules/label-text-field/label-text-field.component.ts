import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IConfig } from 'ngx-mask';
import { ElementsTheming } from '@utils-mf-components/models';
import { ObjectUtilities } from '@utils-mf-components/objects.utils';
import { FormBuilderTypesElementsEnum } from '@shared-mf-components/lib/dynamic-form-builder/dynamic-form-builder.model';

@Component({
    selector: 'label-text-field-moelcule',
    templateUrl: 'label-text-field.component.html'
})

export class LabelTextFieldMolecule implements OnInit {
    // @Input() labelTextFieldProps: FormSchemaField = new FormSchemaField();
    @Input() label?: string = '';
    @Input() required?: boolean = false;
    @Input() disabled?: boolean = false;
    @Input() key!: string;
    @Input() type!: string;
    @Input() multiline?: boolean = false;
    @Input() mask!: string;
    @Input() specialCharacters!: Array<string>;
    @Input() patterns!: IConfig['patterns'];
    @Input() placeholder?: string = '';
    @Input() formGroup!: FormGroup;
    @Input() formGroupName!: string;
    @Input() value?: string;
    @Input() elementTheming: ElementsTheming = {};

    public schemeComponent = ObjectUtilities.EnumToObject(FormBuilderTypesElementsEnum);
    constructor() { }

    ngOnInit() {
    }
}