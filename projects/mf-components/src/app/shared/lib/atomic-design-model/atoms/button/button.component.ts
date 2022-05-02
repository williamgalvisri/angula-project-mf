import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormSchemaFetching, MobileformsCSSStyleProperties } from 'projects/mf-components/src/utils/models/global.model';
import { DynamicFormBuilderService } from '@shared-mf-components/lib/dynamic-form-builder/dynamic-form-builder.model.service';

@Component({
    selector: 'button-atom',
    templateUrl: 'button.component.html',
    styleUrls: ['./button.component.css']
})

export class ButtonAtom {
    @Input() key!: string;
    @Input() title?: string = '';
    @Input() eventType?: string = '';
    @Input() disableWithControls?: boolean;
    @Input() fetching?: FormSchemaFetching = {};
    @Input() disabled: boolean = false;
    @Input() formGroup: FormGroup = new FormGroup({});
    @Input() style: MobileformsCSSStyleProperties = {};
    @Input() loading: boolean = false;

    constructor(private dynamicFormBuilderService: DynamicFormBuilderService) {}

    get isValid() {
        if (this.disableWithControls) {
            return !this.formGroup.valid
        } else {
            return false
        }
    }

    public onEventTriggered() {
        if (this.eventType) {
            this.dynamicFormBuilderService.emmitButtonTriggerEventType({eventType: this.eventType ?? '', key: this.key, fetching: this.fetching ?? {}});
        }
    }
}