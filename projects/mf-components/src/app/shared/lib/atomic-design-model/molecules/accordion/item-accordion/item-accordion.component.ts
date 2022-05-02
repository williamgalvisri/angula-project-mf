import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'item-accordion-molecule',
    templateUrl: 'item-accordion.component.html',
    styleUrls: ['./item-accordion.component.css']
})

export class ItemAccordionMolecule implements OnInit {
    @Input() key: string = ''; 
    @Input() title: string = '';
    @Input() icon!: string;
    @Input() expanded: boolean = false;
    constructor() { }

    ngOnInit() { }
}