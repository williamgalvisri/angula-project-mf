import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ElementsTheming } from '@utils-mf-components/models';
import { ObjectUtilities } from '@utils-mf-components/objects.utils';
import { FormBuilderTypesElementsEnum } from '../../../dynamic-form-builder/dynamic-form-builder.model';

@Component({
    selector: 'label-checkbox-molecule',
    templateUrl: 'label-checkbox.component.html',
    styleUrls: ['./label-checkbox.component.css']
})

export class LabelCheckBoxMolecule implements OnInit {
    @Input() key: string = '';
    @Input() title?: string = '';
    @Input() formGroup: FormGroup = new FormGroup({});
    @Input() elementTheming: ElementsTheming = {};
    
    public schemeComponent = ObjectUtilities.EnumToObject(FormBuilderTypesElementsEnum);
    constructor() { }

    ngOnInit() { }
}