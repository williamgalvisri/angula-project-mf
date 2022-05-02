
import { FormBuilderTypesElementsEnum } from '@shared-mf-components/lib/dynamic-form-builder/dynamic-form-builder.model';
import {
  EventTypeTrigger,
  FormSchemaGeneralSettings,
  FormSchemaField,
  GeneralSchemaFormBuilder,
  ElementsTheming,
} from '../models/global.model';

export const formDummyData: FormSchemaField[] = [
  {
    key: 'titlePage',
    type: FormBuilderTypesElementsEnum.ELEMENT_LABEL,
    label: 'Este es un maravilloso formulario',
    propertiesStyle: {
      position: { x: 450, y: -10 },
      dimensions: {
        width: 400,
        height: 100,
      },
    },
  },
  // {
  //   key: 'buttonHola',
  //   type: FormBuilderTypesElementsEnum.ELEMENT_BUTTON,
  //   eventType: EventTypeTrigger.SUBMIT,
  //   title: 'Submit!',
  //   propertiesStyle: {
  //     position: {x: 10, y: 410},
  //     dimensions: {
  //       width: 400,
  //       height: 100
  //     }
  //   }
  // },
  // {
  //   key: 'buttonFetching',
  //   type: FormBuilderTypesElementsEnum.ELEMENT_BUTTON,
  //   eventType: EventTypeTrigger.FETCHING,
  //   title: 'Fetching!',
  //   propertiesStyle: {
  //     position: {x: 450, y: 410},
  //     dimensions: {
  //       width: 400,
  //       height: 100
  //     }
  //   }
  // },
  // {
  //   key: 'firstName',
  //   type: FormBuilderTypesElementsEnum.ELEMENT_TEXT,
  //   label: 'First Name',
  //   value: 'First Name',
  //   required: true,
  //   propertiesStyle: {
  //     position: {x: 10, y: 60},
  //     dimensions: {
  //       width: 400,
  //       height: 100
  //     }
  //   }
  // },
  // {
  //   key: 'birthDate',
  //   type: FormBuilderTypesElementsEnum.ELEMENT_DATE,
  //   label: 'Birth date',
  //   value: '2020-02-15',
  //   required: true,
  //   propertiesStyle: {
  //     position: {x: 450, y: 180},
  //     dimensions: {
  //       width: 400,
  //       height: 100
  //     }
  //   }
  // },
  // {
  //   key: 'email',
  //   type: FormBuilderTypesElementsEnum.ELEMENT_TEXT,
  //   label: 'Email',
  //   value: '',
  //   required: true,
  //   propertiesStyle: {
  //     position: {x: 450, y: 60},
  //     dimensions: {
  //       width: 400,
  //       height: 100
  //     }
  //   }
  // },

  // {
  //   type: 'file',
  //   name: 'picture',
  //   label: 'Picture',
  //   required: false,
  //   onUpload: () => {}
  // },
  // {
  //   key: 'country',
  //   type: FormBuilderTypesElementsEnum.ELEMENT_DROPDOWN,
  //   label: 'Country',
  //   value: 'in',
  //   required: true,
  //   options: [
  //     { key: 'in', label: 'India' },
  //     { key: 'us', label: 'USA' },
  //   ],
  //   propertiesStyle: {
  //     position: {x: 890, y: 60},
  //     dimensions: {
  //       width: 400,
  //       height: 100
  //     }
  //   }
  // },
  // {
  //   key: 'gender',
  //   type: FormBuilderTypesElementsEnum.ELEMENT_RADIO,
  //   label: 'Gender',
  //   value: 'm',
  //   required: true,
  //   options: [
  //     { key: 'm', label: 'Male' },
  //     { key: 'f', label: 'Female' },
  //   ],
  //   propertiesStyle: {
  //     position: {x: 10, y: 170},
  //     dimensions: {
  //       width: 400,
  //       height: 100
  //     }
  //   }
  // },
  // {
  //   key: 'fishing',
  //   type: FormBuilderTypesElementsEnum.ELEMENT_CHECKBOX,
  //   title: 'Fishing',
  //   propertiesStyle: {
  //     position: {x: 11, y: 310},
  //     dimensions: {
  //       width: 400,
  //       height: 100
  //     }
  //   }
  // },
  // {
  //   key: 'cooking',
  //   type: FormBuilderTypesElementsEnum.ELEMENT_CHECKBOX,
  //   title: 'Cooking',
  //   propertiesStyle: {
  //     position: {x: 450, y: 310},
  //     dimensions: {
  //       width: 400,
  //       height: 100
  //     }
  //   }
  // },
  // {
  //   key: 'table',
  //   type: FormBuilderTypesElementsEnum.ELEMENT_TABLE,
  //   title: 'Table',
  //     header: [
  //       {
  //           key: 'column1',
  //           label: 'Colum 1'
  //       },
  //       {
  //           key: 'column2',
  //           label: 'Colum 2'
  //       }
  //   ],
  //   propertiesStyle: {
  //     position: {x: 890, y: 180},
  //     dimensions: {
  //       width: 400,
  //       height: 200
  //     }
  //   }
  // },
];

export const schemaLayoutDummyData = [
  {
    key: 'row1',
    numberColumns: 1,
    schemaLayout: [
      {
        key: `generalTitle`,
        schemaColums: ['titlePage'],
      },
    ],
  },
  {
    key: 'row2',
    numberColumns: 4,
    schemaLayout: [
      {
        key: `sectionOne`,
        schemaColums: ['firstName', 'country', 'birthDate'],
      },
      {
        key: `sectionTwo`,
        schemaColums: ['email', 'gender', 'fishing', 'cooking'],
      },
      {
        key: `section3`,
        schemaColums: [],
      },
      {
        key: `section4`,
        schemaColums: [],
      },
    ],
  },
  {
    key: 'row3',
    numberColumns: 1,
    schemaLayout: [
      {
        key: `row3Section1`,
        schemaColums: ['buttonHola'],
      },
      {
        key: `row3Section2`,
        schemaColums: ['buttonFetching'],
      },
    ],
  },
];

export const generalSettingFormDummyData: FormSchemaGeneralSettings = {
  endpointUrlBase: 'https://localhost:8080',
  token: '',
};

export const formBuilderSchemaGeneralDummyData: GeneralSchemaFormBuilder = {
  fields: formDummyData,
  schemeColumns: schemaLayoutDummyData,
  generalSetting: generalSettingFormDummyData,
  variables: []
};

export const uiElementsTheming: ElementsTheming = {
  [FormBuilderTypesElementsEnum.ELEMENT_LABEL]: {
    fontSize: '18px',
    color: 'white',
  },
  [FormBuilderTypesElementsEnum.ELEMENT_TEXT]: {
    fontSize: '14px',
    backgroundColor: '#363636',
    borderRadius: '5px',
    color: 'white',
    border: 'none',
    padding: '10px',
    marginTop: '0.938rem',
  },
  [FormBuilderTypesElementsEnum.ELEMENT_BUTTON]: {
    fontSize: '14px',
    backgroundColor: 'white',
    borderRadius: '5px',
    color: '#262626',
    padding: '12px',
  },
  [FormBuilderTypesElementsEnum.ELEMENT_CHECKBOX]: {
    fontSize: '14px',
    color: 'white',
    fontWeight: 'bold',
  },
  [FormBuilderTypesElementsEnum.ELEMENT_DROPDOWN]: {
    fontSize: '14px',
    backgroundColor: '#363636',
    borderRadius: '5px',
    color: 'white',
    border: 'none',
    marginTop: '0.938rem',
    backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>")`,
  },
};

export const uiElementsThemingSettingNav: ElementsTheming = {
  [FormBuilderTypesElementsEnum.ELEMENT_LABEL]: {
    marginTop: '0.938rem',
    fontSize: '18px',
    color: 'white',
  },
  [FormBuilderTypesElementsEnum.ELEMENT_TEXT]: {
    fontSize: '14px',
    backgroundColor: '#363636',
    borderRadius: '5px',
    color: 'white',
    border: 'none',
    padding: '10px',
  },
  [FormBuilderTypesElementsEnum.ELEMENT_DROPDOWN]: {
    fontSize: '14px',
    backgroundColor: '#363636',
    borderRadius: '5px',
    color: 'white',
    border: 'none',
    backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>")`,
  },
};
