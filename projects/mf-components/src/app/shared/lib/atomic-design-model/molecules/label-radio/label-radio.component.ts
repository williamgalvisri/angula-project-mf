import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectionModel } from '@utils-mf-components/models';

@Component({
    selector: 'label-radio-molecule',
    templateUrl: 'label-radio.component.html'
})

export class LabelRadioMolecule implements OnInit {
    @Input() label?: string = '';
    @Input() required?: boolean = false; 
    @Input() key: string = '';
    @Input() options?: Array<SelectionModel> = []
    @Input() formGroup: FormGroup = new FormGroup({})
    constructor() { }

    ngOnInit() { }
}