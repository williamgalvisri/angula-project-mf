import { Component, OnInit } from '@angular/core';
import { FormBuilderService } from '@shared-mf-components/services/form-builder.service';

@Component({
    selector: 'nav-vertical-organism',
    templateUrl: 'nav-vertical.component.html',
    styleUrls: ['./nav-vertical.component.css']
})

export class NavVerticalOrganism implements OnInit {
    public selectedSection: string = 'elements'
    constructor(private FormBuilderService: FormBuilderService) { }

    ngOnInit() { }

    public showSection(section: string) {
        this.selectedSection = section;
        this.FormBuilderService.emmitShowSectionToolbar(section);
    }
}