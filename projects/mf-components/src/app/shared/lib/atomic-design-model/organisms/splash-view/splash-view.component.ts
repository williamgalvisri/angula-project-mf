import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'splash-view-organism',
    templateUrl: 'splash-view.component.html',
    styleUrls: ['./splash-view.component.css']
})

export class SplashViewOrganism implements OnInit {
    @Input() description: string = 'Cargando información.';
    @Input() showSvg: boolean = true;
    constructor() { }

    ngOnInit() { }
}