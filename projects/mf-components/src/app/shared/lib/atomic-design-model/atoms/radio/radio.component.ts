import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectionModel } from '@utils-mf-components/models';

@Component({
    selector: 'radio-atom',
    templateUrl: 'radio.component.html',
    styleUrls: ['./radio.component.css']
})

export class RadioAtom implements OnInit {
    @Input() key: string = '';
    @Input() options?: Array<SelectionModel> = [];
    @Input() formGroup: FormGroup = new FormGroup({});

    get valueField() {
        return this.formGroup.get(this.key)?.value
    }

    changeValue({target: {value}}: any) {
        this.formGroup.get(this.key)?.setValue(value)
    }
    constructor() { }

    ngOnInit() { }
}