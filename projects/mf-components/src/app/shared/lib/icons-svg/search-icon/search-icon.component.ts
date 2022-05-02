import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'search-icon-svg',
    templateUrl: 'search-icon.component.svg',
    styleUrls: []
})

export class SearchIconSvg implements OnInit {
    @Input() dimension: number = 24;
    @Input() isCircle: boolean = true;
    constructor() { }

    ngOnInit() { }
}