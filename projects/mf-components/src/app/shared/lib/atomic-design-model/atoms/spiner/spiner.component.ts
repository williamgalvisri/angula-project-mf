import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'spiner-atom',
    templateUrl: 'spiner.component.html',
    styleUrls: ['spiner.component.css']
})

export class SpinerAtom implements OnInit {
    @Input() dimension: number = 18;
    constructor() { }

    ngOnInit() { }
}