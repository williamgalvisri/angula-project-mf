import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilderService } from '@shared-mf-components/services/form-builder.service';

@Component({
    selector: 'nav-organism',
    templateUrl: 'nav.component.html',
    styleUrls: ['./nav.component.css']
})

export class NavOrganism implements OnInit, OnDestroy {
    constructor(private formBuilderService: FormBuilderService) { }
    public formName: string = this.formBuilderService.selectedForm?.name ?? 'N/A';
    private selectedFormSubscription$!: Subscription;
    ngOnInit() { 
        this.listenChangesFormSelected();
    }

    ngOnDestroy(): void {
        this.selectedFormSubscription$?.unsubscribe();
    }

    listenChangesFormSelected() {
        this.formName = this.formBuilderService?.selectedForm?.name;
        this.selectedFormSubscription$ = this.formBuilderService.onChangesSelectedForm().subscribe(() => {
            this.formName = this.formBuilderService?.selectedForm?.name;
        })
    }

}