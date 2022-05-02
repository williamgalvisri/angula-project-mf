import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
// Models
import {
  EventTypeTrigger,
  FormFieldValue,
  FormSchemaField,
  SelectionModel,
  ElementsTheming,
  EventTypeElementsEnum,
} from 'projects/mf-components/src/utils/models/global.model';
import { FormBuilderTypesElementsEnum } from '@shared-mf-components/lib/dynamic-form-builder/dynamic-form-builder.model';
// Service & Utils
import { isControl, KEYWORDS_FORMBUILDER, schemaSettingsForEachField, schemaSettingsFormArrayDictionary, schemaSettingsFormGroupDictionary, typeIdentifierControl } from './settings-bar.utils';
import { uiElementsTheming, uiElementsThemingSettingNav } from 'projects/mf-components/src/utils/page/app.utils';
import { FormGroupUtils } from 'projects/mf-components/src/utils/formgroup.utils'
import { ObjectUtilities } from 'projects/mf-components/src/utils/objects.utils';
import { FormBuilderService } from '@shared-mf-components/services/form-builder.service';
@Component({
  selector: 'settings-bar-organism',
  templateUrl: 'settings-bar.component.html',
  styleUrls: ['settings-bar.component.css'],
})
export class SettingsBarOrganism extends FormGroupUtils implements OnInit, OnDestroy, OnChanges {
  @Input() fields: FormSchemaField[] = [];

  public selectedTypeField: string = '';
  public selectedFieldKey: string = '';
  public formGroupSetting: FormGroup = new FormGroup({});
  public formGroupDataReference: FormGroup = new FormGroup({});
  public formIsReady: boolean = false;
  public elementTheming: ElementsTheming = uiElementsTheming;
  public elementThemingSettingNav: ElementsTheming = uiElementsThemingSettingNav
  public buttonOptionEventType: SelectionModel[] = [
    {
      key: EventTypeTrigger.SUBMIT,
      label: 'Submit event',
    },
    {
      key: EventTypeTrigger.FETCHING,
      label: 'Fetching',
    },
    {
      key: EventTypeTrigger.FILL_DATATABLE,
      label: 'Fill data table',
    },
  ];

  public elementsOptionEventType: SelectionModel[] = [
    {
      key: EventTypeElementsEnum.ONINIT,
      label: EventTypeElementsEnum.ONINIT,
    },
    {
      key: EventTypeElementsEnum.ONCHANGE,
      label: EventTypeElementsEnum.ONCHANGE,
    },
  ];

  public variables: SelectionModel[] = []

  private fieldKeySubscription$!: Subscription;
  private formGroupSettingListenChanges$!: Subscription;
  private formGroupDataReferenceListenCahnges$!: Subscription;



  constructor(private formBuilderService: FormBuilderService, private formBuilder: FormBuilder) {
    super()
  }

  ngOnInit() {
    this.listenChangesFieldKey();
    this.loadAllVariablesCreated()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadAllVariablesCreated()
  }

  ngOnDestroy(): void {
    this.fieldKeySubscription$?.unsubscribe();
    this.formGroupSettingListenChanges$?.unsubscribe();
    this.formGroupDataReferenceListenCahnges$?.unsubscribe();
  }
  /**
   * Get the variables loaded in the service for the form.
   */
  private loadAllVariablesCreated() {
    this.variables = this.formBuilderService.selectedForm?.settings?.variables?.map(k => ({key: k, label: k})) ?? [];
  }

  private buildFormSetting() {
    // Hidden the new group to avoid errors
    this.formIsReady = false;
    // Selected fiel settings from field scheme provider
    const currentValueFromSelectedField = this.fields.find(
      (f) => f.key === this.selectedFieldKey
    ) as FormFieldValue;
    // If there is a field in edition we reset the formGroup and get the fields that will be displayed.
    if (this.selectedFieldKey) {
      this.formGroupSetting = new FormGroup({});
    }
    this.selectedTypeField = currentValueFromSelectedField?.type;
    // Build the form group
    const keysSettings = schemaSettingsForEachField?.[currentValueFromSelectedField?.type] ?? [];

    // Build map depending from key type
    const buildFormGroupBasedOnDictionary = (v: Record<string, any>, dictionary: string[]): Record<string, any> => {
      return dictionary.reduce((map: {}, indentifier) => {
        return {
          ...map,
          [indentifier]: fieldsGenerated({type: typeIdentifierControl(indentifier), key: indentifier, value: v?.[indentifier]})
        }
      }, {})
    }
    /**
     * Based on a dictionary of keys where the names of the fields that can be a form type are identified. Returns an element to assemble the group.
     * Note: This could be better
     * @param param0 
     * @returns 
     */
    const fieldsGenerated = ({type, key = '', value }: {type: 'array' | 'formgroup' | 'control', key?: string, value: any}) => {
      switch(type) {
        case 'array': 
          const keyFromFormArrayK = schemaSettingsFormArrayDictionary[key];
          return Array.isArray(value) ? 
            this.formBuilder.array([...(value.map((v: any) => this.formBuilder.group(buildFormGroupBasedOnDictionary(v, keyFromFormArrayK))))]) : this.formBuilder.array([]);
        case 'formgroup': 
          let keyFromFormGroupK = schemaSettingsFormGroupDictionary?.[key];
          if (this.buildFormGroupKeywords(schemaSettingsFormGroupDictionary?.[key][0])) {
            keyFromFormGroupK = this.buildFormGroupKeywords(schemaSettingsFormGroupDictionary?.[key][0])
          }
          return this.formBuilder.group({...buildFormGroupBasedOnDictionary(value, keyFromFormGroupK)})
        case 'control':
          return this.formBuilder.control(value)
      }
    }

    this.formGroupSetting = this.formBuilder.group(buildFormGroupBasedOnDictionary(currentValueFromSelectedField, keysSettings))
    this.formIsReady = true;
    this.listenChangesSettingsForm();
  }

  private buildFormGroupKeywords(key: string): any {
    switch(key) {
      case KEYWORDS_FORMBUILDER.ALL_FIELD_CONTROL:
        return this.getFieldControls()
      default:
        return null 
    }
  }

  // --------------- Data Table Reference Form ---------------
  private buildFormDataReference() {
    const currentValueFromSelectedField = this.fields.find(
      (f) => f.key === this.selectedFieldKey
    );
    if (this.selectedFieldKey) {
      this.formGroupDataReference = new FormGroup({});
    }
    const fields = currentValueFromSelectedField?.data?.fieldReference?.reference.map(r => this.formBuilder.group({
      columnReference: r?.columnReference,
      fieldReference: r?.fieldReference,
    }))
    this.formGroupDataReference = this.formBuilder.group({
      keyTable: this.formBuilder.control(currentValueFromSelectedField?.data?.fieldReference?.keyTable ?? ''),
      reference: this.formBuilder.array(fields ?? [])
    });
    this.getAllTableReference();
    this.listenCahangesFormReference();
  }

  public createReference() {
    return new FormGroup({
      columnReference: new FormControl(''),
      fieldReference: new FormControl(''),
    })
  }

  getAllTableReference(): SelectionModel[] {
    return this.fields.filter(f => f.type === FormBuilderTypesElementsEnum.ELEMENT_TABLE).map(f => ({key: f.key, label: f.key}))
  }

  getColumnsByTableReference(){
    return this.fields
        .filter(f => f.type === FormBuilderTypesElementsEnum.ELEMENT_TABLE)
        .find(f => f.key === this.getValueFromFormGroup(this.formGroupDataReference, 'keyTable'))?.header
        ?.map(f => ({key: f.key, label: f.key}))
  }

  getFieldsByTableReference(){
    return this.fields
        .filter(f => f.type !== FormBuilderTypesElementsEnum.ELEMENT_TABLE && f.type !== FormBuilderTypesElementsEnum.ELEMENT_BUTTON)
        ?.map(f => ({key: f.key, label: f.key}))
  }

  getFieldControls(): string[] {
    return this.fields
      .filter(f => isControl(f.type))
      ?.map(f => f.key)
  }

  // --------------- Data Table Reference Form ---------------
  // --------------- Subscriptions ---------------
  /**
   * Listen when selecting a component within the canvas to build the configuration form.
   */
  private listenChangesFieldKey() {
    this.fieldKeySubscription$ = this.formBuilderService
      .onChangedFieldKey()
      .subscribe((selectedKey: string) => {
        this.selectedFieldKey = selectedKey;
        this.buildFormSetting();
        this.buildFormDataReference();
      });
  }

  /**
   * Detect changes applied to the element configuration in real time.
   * at the moment it is commented out because there are inconsistencies with the list of options.
   */
  private listenChangesSettingsForm() {
    this.formGroupSettingListenChanges$ = this.formGroupSetting.valueChanges.subscribe((value) => {
        // this.applyChanges()
        // if(this.getValueFromFormGroup(this.formGroupSetting, 'eventType') === EventTypeTrigger.FILL_DATATABLE) {
        //   // this.buildFormDataReference()
        // }
    }) 
  }

  /**
   * Detect changes to the reference form group found in the button element type.
   * TODO: standardize it with a configuration like the others.
   */
  private listenCahangesFormReference() {
    this.formGroupDataReferenceListenCahnges$ = this.formGroupDataReference.valueChanges.subscribe((value) => {
        const _fields = [...this.fields];
        const selectedField = {..._fields.find((f) => f.key === this.selectedFieldKey) as FormFieldValue};
        selectedField.data.fieldReference = {
          ...value
        }
        // this.formBuilderService.emmitChangesFields({
        //   field: selectedField as FormSchemaField,
        //   newKey: selectedField['key'],
        //   keyModified: this.selectedFieldKey,
        // });
    }) 
  }

  // --------------- Subscriptions ----------------

  // Options schema
  public createItemFormArray(): FormGroup {
    return new FormGroup({
      key: new FormControl(''),
      label: new FormControl(''),
    }) as FormGroup;
  }
  /**
   * Send the changes to the constructor to apply the corresponding configurations.
   */
  applyChangesFormSettings() {
    const _fields = [...this.fields];
    const selectedField = {..._fields.find((f) => f.key === this.selectedFieldKey) as FormFieldValue};
    for (const key of Object.keys(this.formGroupSetting.value)) { 
      selectedField[key] = this.formGroupSetting.value[key];
    }
    // TODO: Remove after of find solution for the communication components 
    this.formBuilderService.emmitChangesFields({
      field: selectedField as FormSchemaField,
      newKey: selectedField['key'],
      keyModified: this.selectedFieldKey,
    });
  }

  /**
   * It is necessary to ensure the existence of an element within the dictionary.
   * @param type element type registered within enum
   * @returns type of element
   */
  getType(type: keyof typeof FormBuilderTypesElementsEnum) {
    return ObjectUtilities.EnumToObject(FormBuilderTypesElementsEnum)[type];
  }

  // --------------- Tools Methods ----------------

  closeSettingNav() {
    this.selectedTypeField = '';
  }
}
