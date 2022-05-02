import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'x-icon-svg',
    templateUrl: 'x-icon.component.svg'
})

export class XIconSvg implements OnInit {
    @Input() dimension: number = 24;
    constructor() { }

    ngOnInit() { }
}