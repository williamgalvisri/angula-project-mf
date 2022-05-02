import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { PanZoomConfig } from 'ngx-panzoom';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
// Component
import { _idListToolElement } from '../atomic-design-model/organisms/toolbar/toolbar.component';
import { DimensionPosition } from '@shared-mf-components/lib/atomic-design-model/molecules/resize-wrapper/resize-wrapper.component'

// Utils & Model
import { getNewSchemaByTypeElement } from './dynamic-form-builder.utils.utils';
import {
  EventTypeButton,
  FetchingStructure,
  FormBuilderTypesElementsEnum,
  SelectedRowColumField,
} from './dynamic-form-builder.model';
import { EventTypeTrigger, FormSchemaFetching, FormSchemaField, FormSchemaGeneralSettings, FormSchemaLayoutColumn } from '@utils-mf-components/models';
import { MIN_SIZE_DIMENSSION_ALLOWED } from '@shared-mf-components/lib/atomic-design-model/molecules/resize-wrapper/resize-wrapper.utils';
import { ApplyNewSettingSchema } from '../atomic-design-model/organisms/toolbar/toolbar.model';

// Services
import { DynamicFormBuilderService } from './dynamic-form-builder.model.service';
import { FormBuilderService } from '@shared-mf-components/services/form-builder.service';
import { DimensionElements } from '@shared-mf-components/lib/atomic-design-model/molecules/resize-wrapper/resize-wrapper.model';

@Component({
  selector: 'dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.css'],
})
export class DynamicFormBuilderComponent implements OnInit, OnDestroy, OnChanges {
  @Input() fields: FormSchemaField[] = [];
  @Input() schemeColumns: FormSchemaLayoutColumn[] = [];
  @Input() generalSetting: FormSchemaGeneralSettings = new FormSchemaGeneralSettings();
  @Input() fetching?: FormSchemaFetching;
  @Input() modeBuildProduction: boolean = false;
  @Input() modeGridPosition: boolean = true;
  @Output() onSubmit = new EventEmitter<Record<string, any>>();
  @Output() onShareConnectColumnList = new EventEmitter<Array<string>>();
  

  public formGroup: FormGroup = new FormGroup({});
  public connectColumnList: Array<string> = [];
  public formIsReady: boolean = false;
  public selectedFieldKey: string = '';
  public selectedFieldProperties!: SelectedRowColumField;
  public _idListToolElement: string = _idListToolElement;
  public minDimenssionAllowed: DimensionElements = MIN_SIZE_DIMENSSION_ALLOWED;
  public panZoomConfig: PanZoomConfig = new PanZoomConfig({
    zoomLevels: 5,
    initialZoomLevel: 0.9,
    neutralZoomLevel:1,
    scalePerZoomLevel: 2.0,
    zoomStepDuration: 0.2,
    freeMouseWheelFactor: 0.001,
    zoomToFitZoomLevelFactor: 0.9,
    dragMouseButton: 'left'
  });

  private formBuilderSubscription$!: Subscription;
  private formBuilderValuesSubscription$!: Subscription;
  private formToggleSubscription$!: Subscription;
  private buttonButtonTriggerEventTypeSubscription$!: Subscription;
  private fetchingSubscription$!: Subscription;
  private fetchingElement$!: Subscription;
  private responseFetchingElement$!: Subscription;


  constructor(
    private formBuilderService: FormBuilderService,
    private dynamicFormBuilderService: DynamicFormBuilderService
  ) {}

  // Hooks methods
  ngOnInit(): void {
    this.formIsReady = false;
    this.initializeSubscriptions();
    this.initializeFormBuilder();

  }

  ngOnDestroy(): void {
    this.formBuilderSubscription$?.unsubscribe();
    this.formToggleSubscription$?.unsubscribe();
    this.buttonButtonTriggerEventTypeSubscription$?.unsubscribe();
    this.fetchingSubscription$?.unsubscribe();
    this.fetchingElement$?.unsubscribe();
    this.formBuilderValuesSubscription$?.unsubscribe();
    this.responseFetchingElement$?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes?.fields?.isFirstChange()) {
      this.formIsReady = false;
      this.initializeFormBuilder();
    }
    console.log(changes?.fields);
    if (!changes?.modeBuildProduction?.currentValue) {
      //When the modeBuildProduction changed the tables should be empty
      // const fieldsFilterdTable = this.fields
      // .filter(f => f.type === FormBuilderTypesElementsEnum.ELEMENT_TABLE)
      // .map(f => ({...f, records: [] }));
      // this.fields = [...this.fields.filter(f => f.type !== FormBuilderTypesElementsEnum.ELEMENT_TABLE), ...fieldsFilterdTable]

    }
    this.dynamicFormBuilderService.generalSetting = changes.generalSetting?.currentValue;
  }

  private onInitMethod() {
    this.dynamicFormBuilderService.emmitFetchingElement({...this.fetching, identifierElement: 'formbuilder-general'});
  }

  private initializeSubscriptions() {
    this.listenChangesFormBuilder();
    this.listenChangesButtonTriggerEventType();
    this.listenChangesFetchingElement();
    this.listenChangesFormBuilderValues();
    this.listenChangesResponseFetchingElement();
  }

  // // --------------------- Subscriptions ---------------------
  private listenChangesFormBuilder() {
    this.formBuilderSubscription$ = this.formBuilderService.onChangesField()
    // .pipe(debounceTime(1000))
    .subscribe(({keyModified, field, newKey}: ApplyNewSettingSchema) => {
      // this.formIsReady = false;
      // Applying new field changes into schema field and layout
      const selectedFieldIndex = this.fields.findIndex(f => f.key === keyModified);
      this.fields[selectedFieldIndex] = {...field};
      const { keyRow, columKey } = this.selectedFieldProperties;
      if (keyRow && columKey) {
        const indexRow = this.schemeColumns.findIndex(s => s.key === keyRow);
        const indexColum = this.schemeColumns[indexRow].schemaLayout.findIndex(l => l.key === columKey);
        const oldFieldKey = this.schemeColumns[indexRow].schemaLayout[indexColum].schemaColums.indexOf(keyModified ?? '');
        // Render new changes
        this.schemeColumns[indexRow].schemaLayout[indexColum].schemaColums[oldFieldKey] = newKey;
      }
      this.openSettings(newKey, keyRow, columKey)
      this.initializeFormBuilder();
    })
  }

  // TODO: mover este evento de formulario fuera del componente
  /**
   * Listen to the actions of the button-atom element, if it is possible to improve this structure
   */
  private listenChangesButtonTriggerEventType() {
    this.buttonButtonTriggerEventTypeSubscription$ = this.dynamicFormBuilderService.onChangesButtonButtonTriggerEventType().subscribe(({eventType, key, fetching}: EventTypeButton) => {
      this.onButtonEventTypeInvoke({eventType, key, fetching});
    })
  }

  private listenChangesFetchingElement() {
    this.fetchingElement$ = this.dynamicFormBuilderService.onChangesFetchingElement().subscribe(({urlFetching, method, identifierElement}) => {
      if (urlFetching && identifierElement) {
        this.onFetching({url: urlFetching, method: method ?? 'GET', identifierElement})
      }
    })
  }

  private listenChangesResponseFetchingElement() {
    this.responseFetchingElement$ = this.dynamicFormBuilderService.onChangesResponseFetchingElement().subscribe((value) => {
      // Assign value to the property assigned in the configuration of the element
      // NOTE: formbuilder-general is the main layer where the element structure is designed.
      if (value.identifierElement === 'formbuilder-general') {
        this.dynamicFormBuilderService.assignValueVariableWithKey(this.fetching?.variable ?? '', value.response);
      }
    })
  }

  /**
   * We assign the values of the form as global variables to be used in the transpolation.
   */
  private listenChangesFormBuilderValues() {
    this.formBuilderValuesSubscription$ = this.formGroup.valueChanges.subscribe((value) => {
      // this.dynamicFormBuilderService.loadVariables()
      const mapFormVariables = Object.keys(value).reduce((map, key) => { 
        return {
          ...map,
          ['form_'+key]: value[key]
        }
      }, {});
      this.dynamicFormBuilderService.loadVariables(mapFormVariables)
    })
  }
  // --------------------- Subscriptions ---------------------


  private initializeFormBuilder() {
    this.buildForm().pipe(delay(0)).subscribe({
      complete: () => {
        this.sharedConnectList();
        this.formIsReady = true;
      }
    });
  }

  public sharedConnectList() {
    this.connectColumnList = this.getListConnectColums();
    this.formBuilderService.emmitSharedConnectList(this.connectColumnList)
  }

  public getKeyFields(): string[] {
    return this.fields.map(f => f.key)
  }


  /**
   * Excluded all not form elements to void save the key control
   * @returns Array<string>
   */
  private noElementsForm(): Array<string> {
    return [
      FormBuilderTypesElementsEnum.ELEMENT_LABEL,
      FormBuilderTypesElementsEnum.ELEMENT_BUTTON,
    ];
  }
  /**
   * Creates the FormGroup structure needed by the component to form the forms.
   * @param newSchema new element added from drag and drop
   * @returns Observable
   */
  private buildForm(newSchema?: FormSchemaField): Observable<void> {
    return new Observable((observer) => {
      this.formGroup = new FormGroup({});

      const _fields = [...this.fields];
      if (newSchema) {
        _fields.push(newSchema)
      }
      // Create a new Form group to add new schema.
      const newFormGroup = new FormGroup({});
      // We iterate each field of the array to build a form group
      for (const field of _fields) {
        // Exclude elements that are not controllable
        if (!this.noElementsForm().includes(field.type)) {
            newFormGroup.addControl(
              field.key,
              new FormControl(
                field?.value,
                field.required ? Validators.required : null
              )
            );
        }
      }
      this.formGroup = newFormGroup;
      this.listenChangesFormBuilderValues();
      this.checkMethodInvokeInitial()
      observer.complete();
    })
  }

  public removeElement(key: string) {
    const indexField = this.fields.findIndex(f => f.key === key);
    this.fields.splice(indexField, 1);
    this.buildForm().pipe(delay(1000)).subscribe({
      complete: () => {
        this.sharedConnectList();
      }
    });
  }

  public drop(event: CdkDragDrop<string[]>) {
    // If the element come from section tool with id 'tools-elements-list' add a new element to de schema else change de list
    if (!this.comeFromToolElements(event.previousContainer.id)) {
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.previousContainer.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
      if (this.modeGridPosition) {
        const findIndex = this.fields?.findIndex(f => f.key === event.item.data);
        this.fields[findIndex].propertiesStyle.position = event.distance;
      }
    } else {
      const elementType = event.item.data;
      const keyValue = `${elementType}${Date.now()}`;
      const newSchema = getNewSchemaByTypeElement(keyValue, elementType);
      this.buildForm(newSchema).subscribe({
        complete: () => {
          this.fields.push(newSchema);
          event.container.data.push(keyValue);
        }
      });
    }
  }

  public dropLayout(event: CdkDragDrop<FormSchemaLayoutColumn[]>) {
    if(!this.comeFromToolElements(event.previousContainer.id)) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.addNewRow()
    }
  }

  private addNewRow() {
    const newKeyRow = `row${this.schemeColumns.length+2}`;
    this.schemeColumns.push( {
      key: `row${this.schemeColumns.length+2}`,
      numberColumns: 1,
      schemaLayout:[{
        key: `${newKeyRow}Column`,
        schemaColums:[]
      }]
    });
    this.sharedConnectList();
  }



  /**
   * Get the field to be edited and emit to component general
   * @param fieldString key field of 
   */
  public openSettings(fieldString: string, keyRow: string, columKey: string) {
    this.selectedFieldKey = fieldString;
    this.selectedFieldProperties = {
      selectedFieldKey: fieldString,
      keyRow,
      columKey
    }
    this.formBuilderService.emmitFieldKey(fieldString);
  }

  // Helper methods
  /**
   * Check if the element dragged is from toolbar component.
   * @param id document reference 
   * @returns 
   */
  private comeFromToolElements(id: string): boolean {
    return !!(id === _idListToolElement);
  }
  

  // Elements trigger methods
  private async onButtonEventTypeInvoke({eventType, key, fetching}: EventTypeButton) {
    switch(eventType) {
      case EventTypeTrigger.SUBMIT: 
        console.log(EventTypeTrigger.SUBMIT, this.formGroup.value, this.fields);
        break;
      case EventTypeTrigger.FETCHING:
        // Filter key allowed for the settings
        const keyValuesAllowed = Object.keys(fetching.keys ?? {}).filter(k => fetching.keys?.[k]);
        // Get from all values on form control registered
        const payload = keyValuesAllowed.reduce((map, indentifier) => {
          return {
            ...map,
            [indentifier]: this.formGroup.value[indentifier]
          }
        }, {})
        // Call to fetching method elements
        await this.onFetching({url: fetching?.urlFetching ?? '', data: payload, method: 'POST'})

        // Temporally reset values keyValuesAllowed control
        for (const indentifier of keyValuesAllowed) {
          this.formGroup.get(indentifier)?.reset()
        }
        this.checkMethodInvokeInitial();
        break;
      case EventTypeTrigger.FILL_DATATABLE:
        const element = this.fields.find(f => f.key === key);
        const tableReference = element?.data?.fieldReference.keyTable;
        const reference = element?.data?.fieldReference.reference;
        const newValueTable = reference?.reduce((map, value) => {
          map = {
            ...map,
            [value.columnReference]: this.formGroup.value[value.fieldReference]
          }
          return map
        }, {});
        const indexTable = this.fields.findIndex(f => f.key === tableReference);
        if (!('records' in this.fields[indexTable])) {
          this.fields[indexTable] = { 
            ...this.fields[indexTable],
            records: []
          }
        }
        this.fields[indexTable].records?.push(newValueTable)
        break;

    }
  }
  /**
   * Execute query events issued by the elements
   * @param param0 
   */
  public async onFetching({url, data, method, identifierElement}: FetchingStructure) {
    // Get url parsed if exist any parameter
    const urlParsed = this.dynamicFormBuilderService.getValueInterpolated(url);
    const response  = await this.dynamicFormBuilderService.onFetchingMethod({
      baseUrl: this.generalSetting.endpointUrlBase,
      endpoint: urlParsed,
      method: method,
      data: data ?? {},
      headers: {}
    }).toPromise()
    this.dynamicFormBuilderService.emmitResponseFetchingElement({response, identifierElement})
  }

  /**
   * Method to get position from resize-wrapper-molecule
   * @param event 
   * @param keyElement 
   */
  public onSaveDimensionElement(event: DimensionPosition, keyElement: string) {
    const fieldIndex = this.fields.findIndex(f => f.key === keyElement);
    this.fields[fieldIndex].propertiesStyle.position = {
      x: event.x,
      y: event.y
    };
    this.fields[fieldIndex].propertiesStyle.dimensions = {
      width: event.width,
      height: event.height
    };
  }

  // ------------------- Contructor Methods --------------------
  private checkMethodInvokeInitial() {
    if (this.fetching?.typEvent === 'onInit') {
      this.onInitMethod();
    }
  }



  // ------------------- Method schema grid mode -------------------
  /**
   * Add new column to the section based on key
   * @param key indentifier column section
   */
   public addColumn(key: string): void {
    const schemaColumns = this.schemeColumns?.find(s => s.key === key) ?? new FormSchemaLayoutColumn();
    schemaColumns.numberColumns = (schemaColumns?.numberColumns ?? 0) + 1;
    schemaColumns.schemaLayout.push({
      key: `${schemaColumns.key}Column${Date.now()}`,
      schemaColums: []
    })
    this.sharedConnectList();
  }

  // TODO: Checkear cuando el elemento se esta en la columna y pasarlos a otra
  public removeColumn(key: string): void {
    const schemaColumnsSelected = this.schemeColumns?.find(s => s.key === key) ?? new FormSchemaLayoutColumn();
    schemaColumnsSelected.numberColumns = (schemaColumnsSelected?.numberColumns ?? 0) - 1;
    schemaColumnsSelected.schemaLayout.pop();
    this.sharedConnectList();
  }

  /**
   * Get the schema field to the formbuilder elements
   * @param key indentifier column section
   * @returns FormBuilderField
   */
  public getField(key: string): FormSchemaField {
    return (
      this.fields.find((field) => field.key === key) ??
      new FormSchemaField()
    );
  }

  /**
   * Get all column list create in the canvas to pass element between them
   * @returns Array<string>
   */
  public getListConnectColums(): Array<string> {
    const resultArray = this.schemeColumns.reduce((accomulatedArray, currentValue) => {
        accomulatedArray = [...accomulatedArray, ...currentValue?.schemaLayout.map(s => s.key)]
        return accomulatedArray;
    }, [] as Array<string>);
    return resultArray;
  }
}

