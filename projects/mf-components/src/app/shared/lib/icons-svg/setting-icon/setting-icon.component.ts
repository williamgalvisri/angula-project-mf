import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'setting-icon-svg',
    templateUrl: 'setting-icon.component.svg'
})

export class SettingIconSvg implements OnInit {
    @Input() dimension: number = 15;
    @Input() isCircle: boolean = true;
    constructor() { }

    ngOnInit() { }
}