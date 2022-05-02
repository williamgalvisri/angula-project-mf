import { FormSchemaFetching, MethodFetching } from "@utils-mf-components/models";



export enum FormBuilderTypesElementsEnum {
    ELEMENT_TEXT = 'text',
    ELEMENT_TEXTAREA = 'text-area',
    ELEMENT_DATE = 'date',
    ELEMENT_DROPDOWN = 'dropdown',
    ELEMENT_RADIO = 'radio',
    ELEMENT_CHECKBOX = 'checkbox',
    ELEMENT_BUTTON = 'button',
    ELEMENT_FILE = 'file',
    ELEMENT_LABEL = 'label',
    ELEMENT_TABLE = 'table',
    ELEMENT_HR = 'hr',
    ELEMENT_ROW = 'row',
    ELEMENT_EXAMPLE = 'label-example'
}

export enum BuildModeEnum {
    PRODUCTION = 'production',
    EDITING = 'editing'
}


export interface EventTypeButton {
    eventType: string;
    key: string;
    fetching: FormSchemaFetching;
}

export interface SelectedRowColumField {
    selectedFieldKey: string;
    keyRow: string;
    columKey: string;
}

export interface FetchingStructure {
    url: string, data?: Record<string, any>, 
    method: MethodFetching, 
    identifierElement?: string
}



