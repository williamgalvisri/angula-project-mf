import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
    selector: 'card-molecule',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardMolecule implements OnInit {
    @Input() extendedClass: string = 'bg-white';
    ngOnInit(): void {}
}