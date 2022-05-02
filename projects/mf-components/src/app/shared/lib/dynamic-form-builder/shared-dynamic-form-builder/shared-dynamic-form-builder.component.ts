import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GeneralSchemaFormBuilder } from '@utils-mf-components/models/global.model';
import { FormBuilderService } from '@shared-mf-components/services/form-builder.service';
// TODO: Refactor module builder
import { DynamicFormBuilderService } from '../dynamic-form-builder.model.service';

@Component({
    selector: 'shared-dynamic-form-builder',
    templateUrl: 'shared-dynamic-form-builder.component.html'
})

export class SharedDynamicFormBuilderComponent implements OnInit {
    @Input() schemaFormFields: GeneralSchemaFormBuilder = new GeneralSchemaFormBuilder();
    @Input() idForm: string = '';
    public formIsReady: boolean = false;
    constructor(private dynamicFormBuilderService: DynamicFormBuilderService, private formBuilderService: FormBuilderService) { }
    async ngOnInit() { 
        if (this.idForm) {
            const form = await this.formBuilderService.formBuilderGetOne(this.idForm).toPromise();
            this.schemaFormFields = form[0].settings;
            this.dynamicFormBuilderService.loadVariables(this.schemaFormFields.variables);
            this.formIsReady = true;
        }
    }
}