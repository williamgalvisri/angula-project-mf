
import { FormBuilderTypesElementsEnum } from "@shared-mf-components/lib/dynamic-form-builder/dynamic-form-builder.model";
import { ElementToolbarType, SectionToolbarElement, ToolbarElement } from "./toolbar.model";

export const ELEMENTS_TOOLBAR: Array<ToolbarElement> = [
    {
        key: FormBuilderTypesElementsEnum.ELEMENT_LABEL,
        title: 'Label',
        icon: 'title',
        type: ElementToolbarType.BASIC,
        visible: true
    },
    {
        key: FormBuilderTypesElementsEnum.ELEMENT_TEXT,
        title: 'Text Field',
        icon: 'text_fields',
        type: ElementToolbarType.BASIC,
        visible: true
    },
    {
        key: FormBuilderTypesElementsEnum.ELEMENT_TEXTAREA,
        title: 'Text Area',
        icon: 'crop_landscape',
        type: ElementToolbarType.BASIC,
        visible: true
    },
    {
        key: FormBuilderTypesElementsEnum.ELEMENT_BUTTON,
        title: 'Button',
        icon: 'smart_button',
        type: ElementToolbarType.BASIC,
        visible: true
    },
    {
        key: FormBuilderTypesElementsEnum.ELEMENT_DROPDOWN,
        title: 'Dropdown',
        icon: 'list_alt',
        type: ElementToolbarType.BASIC,
        visible: true
    },
    {
        key: FormBuilderTypesElementsEnum.ELEMENT_TABLE,
        title: 'Table',
        icon: 'table_view',
        type: ElementToolbarType.BASIC,
        visible: true
    },
    {
        key: FormBuilderTypesElementsEnum.ELEMENT_CHECKBOX,
        title: 'Checkbox',
        icon: 'check_box',
        type: ElementToolbarType.BASIC,
        visible: true
    },
    {
        key: FormBuilderTypesElementsEnum.ELEMENT_RADIO,
        title: 'Radio',
        icon: 'radio_button_checked',
        type: ElementToolbarType.BASIC,
        visible: true
    },
    {
        key: FormBuilderTypesElementsEnum.ELEMENT_DATE,
        title: 'Date Input',
        icon: 'event',
        type: ElementToolbarType.BASIC,
        visible: true
    },
    {
        key: FormBuilderTypesElementsEnum.ELEMENT_EXAMPLE,
        title: 'Exmaple',
        icon: 'info',
        type: ElementToolbarType.BASIC,
        visible: true
    },
    // {
    //     key: FormBuilderTypesElementsEnum.ELEMENT_ROW,
    //     title: 'Row',
    //     icon: 'table_rows',
    //     type: ElementToolbarType.LAYOUT,
    //     visible: true
    // }
]

export const SECTION_ELEMENTS_TOOLBAR: Array<SectionToolbarElement> = [
    {
        key: 'section-element',
        title: 'Basic Element',
        icon: 'dashboard_customize',
        expanded: true,
        typeElements: ElementToolbarType.BASIC,
        elements: ELEMENTS_TOOLBAR.filter(e => e.type === ElementToolbarType.BASIC).map(e => e.key),
    },
    // {
    //     key: 'section-layout',
    //     title: 'Layout',
    //     icon: 'grid_on',
    //     expanded: false,
    //     typeElements: ElementToolbarType.LAYOUT,
    //     elements: ELEMENTS_TOOLBAR.filter(e => e.type === ElementToolbarType.LAYOUT).map(e => e.key),
    // },
]

