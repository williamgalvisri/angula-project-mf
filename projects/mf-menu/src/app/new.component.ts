import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'custome-element',
    template: '<div>soy un elemento custome</div>'
})

export class NewComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}