import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'chevron-icon-svg',
    templateUrl: './chevron-icon.component.svg'
})

export class ChevronIconSvg implements OnInit {
    @Input() dimension: number = 24;
    @Input() isCircle: boolean = true;
    constructor() { }

    ngOnInit() { }
}