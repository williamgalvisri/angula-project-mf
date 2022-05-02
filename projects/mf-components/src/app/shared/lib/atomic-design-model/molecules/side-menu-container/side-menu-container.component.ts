import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'side-menu-container-molecule',
    templateUrl: 'side-menu-container.component.html',
    styleUrls: ['./side-menu-container.component.css']
})

export class SideMenuContainerMolecule implements OnInit {
    @Input() className: string = '';
    constructor() { }

    ngOnInit() { }
}