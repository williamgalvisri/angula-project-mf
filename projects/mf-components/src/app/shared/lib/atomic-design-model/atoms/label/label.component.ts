import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MobileformsCSSStyleProperties } from 'projects/mf-components/src/utils/models/global.model';
@Component({
    selector: 'label-atom',
    templateUrl: 'label.component.html',
    styleUrls: ['./label.component.css']
})

export class LabelAtom implements OnInit {
    @Input() key!: string;
    @Input() required?: boolean = false;
    @Input() title?: string;
    @Input() formGroup!: FormGroup;
    @Input() style: MobileformsCSSStyleProperties = {
        fontSize: '0.625rem',
        lineHeight: '1.25rem',
        overflowWrap:'break-word'
    };
    constructor() { }

    ngOnInit() { }
}