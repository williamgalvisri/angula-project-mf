import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'hr-atom',
    templateUrl: 'hr.component.html'
})

export class HRAtom implements OnInit {
    @Input() key!: string;
    constructor() { }

    ngOnInit() { }
}