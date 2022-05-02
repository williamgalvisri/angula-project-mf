import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'toggle-atom',
    templateUrl: 'toggle.component.html'
})

export class ToggleAtom implements OnInit {
    @Input() key: string = '';
    @Input() label: string = '';
    @Input() formGroup: FormGroup = new FormGroup({});
    constructor() { }

    ngOnInit() {
    }
}