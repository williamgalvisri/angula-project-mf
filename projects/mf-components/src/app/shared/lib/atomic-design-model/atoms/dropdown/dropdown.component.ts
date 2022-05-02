import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FormSchemaFetching,
  MobileformsCSSStyleProperties,
  SelectionModel,
} from 'projects/mf-components/src/utils/models/global.model';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { StringUtilities } from '@utils-mf-components/string.utils';
import { DynamicFormBuilderService } from '@shared-mf-components/lib/dynamic-form-builder/dynamic-form-builder.model.service';

@Component({
  selector: 'dropdown-atom',
  templateUrl: 'dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownAtom implements OnInit, OnDestroy {
  @Input() key: string = '';
  @Input() id?: string = '';
  @Input() options?: Array<SelectionModel> = [];
  @Input() placeholder?: string = '';
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() fetching?: FormSchemaFetching = {};
  @Input() style: MobileformsCSSStyleProperties = {};
  @Input() optionsVariable?: string;

  private changesFieldSubscription$!: Subscription;
  private responseFetchingElement$!:Subscription;
  private variablesChanges$!: Subscription;
  constructor(private dynamicFormBuilderService: DynamicFormBuilderService) {}

  ngOnInit() {
    switch(this.fetching?.typEvent) {
        case 'onInit':
            this.onInitMethod();
            break;
        case 'onChange':
            this.listenChangesField();
            break;
    }
    this.listenChangesVariablesGlobales();
    this.listenChangesResponseFetchingElement();
  }

  ngOnDestroy(): void {
    this.changesFieldSubscription$?.unsubscribe();
    this.responseFetchingElement$?.unsubscribe();
    this.variablesChanges$?.unsubscribe();
  }

  private onInitMethod() {
    this.dynamicFormBuilderService.emmitFetchingElement({
      ...this.fetching,
      identifierElement: this.key,
    });
  }

  private listenChangesResponseFetchingElement() {
    this.responseFetchingElement$ = this.dynamicFormBuilderService.onChangesResponseFetchingElement().subscribe((value) => {
      if (value.identifierElement === this.key) {
        this.dynamicFormBuilderService.assignValueVariableWithKey(this.fetching?.variable ?? '', value.response);
      }
    })
  }

  private listenChangesField() {
    this.changesFieldSubscription$ = this.formGroup.get(this.key)?.valueChanges.pipe(delay(1000)).subscribe(() => {
        this.dynamicFormBuilderService.emmitFetchingElement({...this.fetching, identifierElement: this.key});
    }) ?? new Subscription();
    this.listenChangesResponseFetchingElement();
  }


  private listenChangesVariablesGlobales() {
    this.variablesChanges$ = this.dynamicFormBuilderService.onChangesVariablesChanges().subscribe(() => {
        if (this.optionsVariable) {
          this.options = eval(`this.dynamicFormBuilderService.variables?.${StringUtilities.getValueBetweenTwoCharacters(this.optionsVariable ?? '', '{{', '}}')}`)
        }
    })
}
}
