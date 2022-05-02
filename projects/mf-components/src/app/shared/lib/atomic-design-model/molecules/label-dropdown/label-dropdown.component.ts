import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ElementsTheming, FormSchemaFetching, SelectionModel } from '@utils-mf-components/models';
import { ObjectUtilities } from '@utils-mf-components/objects.utils';
import { FormBuilderTypesElementsEnum } from '@shared-mf-components/lib/dynamic-form-builder/dynamic-form-builder.model';

@Component({
    selector: 'label-dropdown-molecule',
    templateUrl: 'label-dropdown.component.html'
})

export class LabelDropdwonMolecule implements OnInit {
    @Input() label?: string = '';
    @Input() required?: boolean = false; 
    @Input() key: string = '';
    @Input() id?: string = '';
    @Input() placeholder?: string;
    @Input() options?: Array<SelectionModel> = [];
    @Input() formGroup: FormGroup = new FormGroup({});
    @Input() fetching?: FormSchemaFetching = {}
    @Input() elementTheming: ElementsTheming = {};
    @Input() optionsVariable?: string = '';

    public schemeComponent = ObjectUtilities.EnumToObject(FormBuilderTypesElementsEnum);
    constructor() { }

    ngOnInit() { }
}