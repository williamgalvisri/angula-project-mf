import { FormBuilderTypesElementsEnum } from '@shared-mf-components/lib/dynamic-form-builder/dynamic-form-builder.model';
import { SchemaSettingFieldType, SchemaSettingKeyDictionary } from './settings-bar.model';

export const NO_CONTROL = 'no_control';

export const KEYWORDS_FORMBUILDER = {
  ALL_FIELD_CONTROL: 'all_field_control'
}


export const typeIdentifierControl = (key: string) => {
  if (!!schemaSettingsFormArrayDictionary?.[key]) {
    return 'array';
  } else if (!!schemaSettingsFormGroupDictionary?.[key]) {
    return 'formgroup'
  } else { 
    return 'control'
  }
}

const settingShared = [
  'key'
];

export const isControl = (typeElement: string) => {
  return ![FormBuilderTypesElementsEnum.ELEMENT_LABEL, FormBuilderTypesElementsEnum.ELEMENT_BUTTON, FormBuilderTypesElementsEnum.ELEMENT_TABLE].includes(typeElement as FormBuilderTypesElementsEnum)
}

export const schemaSettingsForEachField: SchemaSettingFieldType = {
  [FormBuilderTypesElementsEnum.ELEMENT_TEXT]: [...settingShared, 'label', 'required', 'value', 'disabled'],
  [FormBuilderTypesElementsEnum.ELEMENT_TEXTAREA]: [...settingShared, 'label', 'required', 'value', 'disabled'],
  [FormBuilderTypesElementsEnum.ELEMENT_DATE]: [...settingShared, 'label', 'required'],
  [FormBuilderTypesElementsEnum.ELEMENT_DROPDOWN]: [...settingShared, 'label', 'required', 'options', 'fetching', 'optionsVariable'],
  [FormBuilderTypesElementsEnum.ELEMENT_RADIO]: [...settingShared, 'label', 'options'],
  [FormBuilderTypesElementsEnum.ELEMENT_CHECKBOX]: [...settingShared, 'title'],
  [FormBuilderTypesElementsEnum.ELEMENT_LABEL]: ['title'],
  [FormBuilderTypesElementsEnum.ELEMENT_BUTTON]: ['title', 'eventType', 'fetching', 'disableWithControls'],
  [FormBuilderTypesElementsEnum.ELEMENT_TABLE]: ['header', 'fetching', 'value']
}


export const schemaSettingsFormGroupDictionary: SchemaSettingKeyDictionary = {
  ['fetching']: ['urlFetching', 'keys', 'typEvent', 'variable', ],
  ['keys']: [KEYWORDS_FORMBUILDER.ALL_FIELD_CONTROL],
  // ['data']: ['fieldReference'],
  // ['fieldReference']: ['keyTable', 'reference']
}

export const schemaSettingsFormArrayDictionary: SchemaSettingKeyDictionary = {
  ['header']: ['key', 'label'],
  ['options']: ['key', 'label'],
  // ['reference']: ['columnReference', 'fieldReference']
}  