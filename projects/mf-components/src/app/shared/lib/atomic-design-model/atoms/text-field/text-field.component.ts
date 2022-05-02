import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IConfig } from 'ngx-mask';
import { Subscription } from 'rxjs';
import { MobileformsCSSStyleProperties } from '@utils-mf-components/models';
import { DynamicFormBuilderService } from '@shared-mf-components/lib/dynamic-form-builder/dynamic-form-builder.model.service';

@Component({
    selector: 'atom-text-field',
    templateUrl: 'text-field.component.html',
    styleUrls: ['./text-field.component.css']
})

export class TextFieldAtom implements OnInit, OnDestroy {
    @Input() key: string = '';
    @Input() type: string = '';
    @Input() mask?: string = '';
    @Input() disabled?: boolean;
    @Input() specialCharacters?: Array<string> = [];
    @Input() value?: string;
    // TODO: add this fiel like property and check if possible add special character with letters
    @Input() patterns?: IConfig['patterns'] = {};
    @Input() multiline?: boolean;
    @Input() placeholder?: string = '';
    @Input() formGroup!: FormGroup;
    @Input() style: MobileformsCSSStyleProperties = {};

    private variablesChanges$!: Subscription;

    get isValid() { return this.formGroup.controls[this.key].valid; }
    get isDirty() { return this.formGroup.controls[this.key].dirty; }
    constructor(private dynamicFormBuilderService: DynamicFormBuilderService) { }

    ngOnInit() { 
        this.listenChangesVariablesGlobales();
    }


    ngOnDestroy(): void {
        this.variablesChanges$?.unsubscribe()
    }

    private listenChangesVariablesGlobales() {
        this.variablesChanges$ = this.dynamicFormBuilderService.onChangesVariablesChanges().subscribe(() => {
            if (this.value) {
                this.formGroup.get(this.key)?.setValue(this.dynamicFormBuilderService.getValueInterpolated(this.value))
            }
        })
    }
}