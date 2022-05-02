import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MobileformsCSSStyleProperties } from '@utils-mf-components/models/global.model';

@Component({
    selector: 'checkbox-atom',
    templateUrl: 'checkbox.component.html',
    styleUrls: ['./checkbox.component.css']
})

export class CheckboxAtom implements OnInit {
    @Input() key: string = '';
    @Input() label?: string = '';
    @Input() formGroup: FormGroup = new FormGroup({});
    @Input() style: MobileformsCSSStyleProperties = {};
    constructor() { }

    ngOnInit() { }

    public getFormGroupGroup() {
        return this.formGroup.get(this.key) as FormGroup
    }
}