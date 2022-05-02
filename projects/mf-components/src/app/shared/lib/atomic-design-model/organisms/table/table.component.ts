import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { Table, TableData, TableHeader } from './table.model';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormSchemaFetching, SelectionModel } from '@utils-mf-components/models';
import { DynamicFormBuilderService } from '@shared-mf-components/lib/dynamic-form-builder/dynamic-form-builder.model.service';
import { StringUtilities } from '@utils-mf-components/string.utils';

@Component({
  selector: 'table-organism',
  templateUrl: 'table.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TableOrganism<T> implements OnInit, OnDestroy {
  @Input() key!: string;
  @Input() header?: TableHeader<T>[] = [];
  @Input() records?: Array<any> = [];
  @Input() value?: string = '';
  @Input() style: object = {};
  @Input() fetching?: FormSchemaFetching = {}

  public tableSettingFormDynamic: FormGroup = new FormGroup({
    groupBy: new FormControl('')
  })
  public groupByOption: Array<SelectionModel> = [];
  public tableReference!: Tabulator;

  private tableSettingFormDynamicSubscription$!: Subscription;
  private responseFetchingElement$!: Subscription;
  private variablesChanges$!: Subscription;
  
  @ViewChild('idTableTabulator', {static: true}) idTableTabulator!: ElementRef;


  constructor(private dynamicFormBuilderService: DynamicFormBuilderService) {}

  ngOnInit() {
    this.tableSettingFormDynamicSubscription$ = this.tableSettingFormDynamic.valueChanges.subscribe((value) => {
      this.tableReference.setGroupBy(value.groupBy)
    })
    this.listenChangesResponseFetchingElement();
    this.listenChangesVariablesGlobales();
    if (this.fetching?.typEvent === 'onInit') {
      this.onInitMethod();
    }
  }

  ngOnDestroy(): void {
    this.tableSettingFormDynamicSubscription$.unsubscribe()
    // this.tableDataAssignSubscription$.unsubscribe()
    this.responseFetchingElement$?.unsubscribe();
    this.variablesChanges$?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.drawTable();
  }
  
 
  // ------------------------ Subscriptions ------------------------

  listenChangesResponseFetchingElement() {
    this.responseFetchingElement$ = this.dynamicFormBuilderService.onChangesResponseFetchingElement().subscribe((value) => {
      if (value.identifierElement === this.key) {
        this.dynamicFormBuilderService.assignValueVariableWithKey(this.fetching?.variable ?? '', value.response);
        this.assignValue()
      }
    })
  }

  // ------------------------ Subscriptions ------------------------
  public getDataRow(key: string | keyof T, row: Array<TableData<T>>) {
    return row.find((r) => r.key === key);
  }
  
  private onInitMethod() {
    this.dynamicFormBuilderService.emmitFetchingElement({...this.fetching, identifierElement: this.key});
  }

  private drawTable(): void {
    this.tableReference = new Tabulator(this.idTableTabulator.nativeElement, {
      data: this.records ?? [],
      reactiveData:true, //enable data reactivity
      columns: this.header?.map(h => ({title: h.label, field: h.key})) ?? [],
      groupBy: undefined,
      layout: 'fitColumns',
      height: '300px',
      paginationMode:"local",
      pagination: true,
      paginationSize:6,
      paginationSizeSelector:[3, 6, 8, 10],
      movableColumns:true,
      debugInvalidOptions: false
    });
    // this.idTableTabulator.nativeElement.insertAdjacentHTML('beforeend', this.tab)
    // console.log(document?.getElementById('my-tabular-table'));
    document?.getElementById(this.key)?.appendChild(this.idTableTabulator.nativeElement);
    this.tableReference.redraw(true)
  }

  assignValue() {
    this.tableReference.setData(eval(`this.dynamicFormBuilderService.variables?.${StringUtilities.getValueBetweenTwoCharacters(this.value ?? '', '{{', '}}')}`))
  }

  private listenChangesVariablesGlobales() {
    this.variablesChanges$ = this.dynamicFormBuilderService.onChangesVariablesChanges().subscribe(() => {
        if (this.value) {
            this.assignValue();
        }
    })
}
}
