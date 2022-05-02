import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'label-example',
    templateUrl: 'label-example.component.html'
})

export class LabelExampleComponent implements OnInit {
    constructor() { }

    ngOnInit() { 
        console.log('LabelExampleComponent')
    }
}