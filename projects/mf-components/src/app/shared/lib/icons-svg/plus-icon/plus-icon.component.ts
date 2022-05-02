import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'plus-icon-svg',
    templateUrl: 'plus-icon.component.svg'
})

export class PlusiconSvg implements OnInit {
    @Input() dimension: number = 30;
    @Input() isCircle: boolean = true;
    constructor() { }

    ngOnInit() { }
}