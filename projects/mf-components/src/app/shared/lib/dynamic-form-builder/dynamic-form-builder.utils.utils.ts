
import { FormSchemaField } from 'projects/mf-components/src/utils/models/global.model';
import {
  FormBuilderTypesElementsEnum,
} from './dynamic-form-builder.model';


/**
 * Dictionary of new element added 
 * @param keyValue 
 * @param elementType 
 * @returns 
 */
export const getNewSchemaByTypeElement = (
  keyValue: string,
  elementType: string
): FormSchemaField => {
  const ELEMENT_TEXT = FormBuilderTypesElementsEnum.ELEMENT_TEXT;
  const ELEMENT_TEXTAREA = FormBuilderTypesElementsEnum.ELEMENT_TEXTAREA;
  const ELEMENT_BUTTON = FormBuilderTypesElementsEnum.ELEMENT_BUTTON;
  const ELEMENT_TABLE = FormBuilderTypesElementsEnum.ELEMENT_TABLE;
  const ELEMENT_DROPDOWN = FormBuilderTypesElementsEnum.ELEMENT_DROPDOWN;
  const ELEMENT_CHECKBOX = FormBuilderTypesElementsEnum.ELEMENT_CHECKBOX
  const ELEMENT_RADIO = FormBuilderTypesElementsEnum.ELEMENT_RADIO;
  const ELEMENT_LABEL = FormBuilderTypesElementsEnum.ELEMENT_LABEL;
  const ELEMENT_DATE = FormBuilderTypesElementsEnum.ELEMENT_DATE;
  const ELEMENT_EXAMPLE = FormBuilderTypesElementsEnum.ELEMENT_EXAMPLE;
  const positionDeafult = {
    x: 500, 
    y: 500
  }
  const schemaGeneral: Record<string, FormSchemaField> = {
    [ELEMENT_TEXT]: {
      key: keyValue,
      type: ELEMENT_TEXT,
      label: keyValue,
      value: '',
      required: true,
      propertiesStyle: {
        position: positionDeafult,
        dimensions: {
          width: 400,
          height: 100
        }
      }
    },
    [ELEMENT_TEXTAREA]: {
      key: keyValue,
      type: ELEMENT_TEXTAREA,
      label: keyValue,
      value: '',
      required: true,
      propertiesStyle: {
        position: positionDeafult,
        dimensions: {
          width: 400,
          height: 100
        }
      }
    },
    [ELEMENT_BUTTON]: {
      key: keyValue,
      type: ELEMENT_BUTTON,
      title: keyValue,
      data: {
        fieldReference: {
          keyTable: '',
          reference: []
        }
      },
      propertiesStyle: {
        position: positionDeafult,
        dimensions: {
          width: 400,
          height: 100
        }
      },
      fetching: {
        urlFetching: '',
        keys: {}
      }
    },
    [ELEMENT_TABLE]: {
      key: keyValue,
      type: ELEMENT_TABLE,
      title: keyValue,
      header: [],
      propertiesStyle: {
        position: positionDeafult,
        dimensions: {
          width: 400,
          height: 100
        }
      },
      fetching: {
        typEvent: 'onInit',
        urlFetching: '',
        method: 'GET'
      }
    },
    [ELEMENT_DROPDOWN]: {
      key: keyValue,
      type: ELEMENT_DROPDOWN,
      label: keyValue,
      options: [],
      propertiesStyle: {
        position: positionDeafult,
        dimensions: {
          width: 400,
          height: 100
        }
      }
    },
    [ELEMENT_CHECKBOX]: {
      key: keyValue,
      type: ELEMENT_CHECKBOX,
      title: keyValue,
      propertiesStyle: {
        position: positionDeafult,
        dimensions: {
          width: 400,
          height: 100
        }
      }
    },
    [ELEMENT_RADIO]: {
      key: keyValue,
      type: ELEMENT_RADIO,
      label: keyValue,
      options: [
        { key: 'option1', label: 'Option 1' },
      ],
      propertiesStyle: {
        position: positionDeafult,
        dimensions: {
          width: 400,
          height: 100
        }
      }
    },
    [ELEMENT_LABEL]: {
      key: keyValue,
      type: ELEMENT_LABEL,
      title: keyValue,
      propertiesStyle: {
        position: positionDeafult,
        dimensions: {
          width: 400,
          height: 100
        }
      }
    },
    [ELEMENT_DATE]: {
      key: keyValue,
      type: ELEMENT_DATE,
      label: keyValue,
      propertiesStyle: {
        position: positionDeafult,
        dimensions: {
          width: 400,
          height: 100
        }
      }
    },
    [ELEMENT_EXAMPLE]: {
      key: keyValue,
      type: ELEMENT_EXAMPLE,
      label: keyValue,
      propertiesStyle: {
        position: positionDeafult,
        dimensions: {
          width: 400,
          height: 100
        }
      }
    },
  };
  return schemaGeneral?.[elementType];
};
