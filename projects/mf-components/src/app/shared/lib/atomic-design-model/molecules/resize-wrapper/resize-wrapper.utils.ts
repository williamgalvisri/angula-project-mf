import { FormBuilderTypesElementsEnum } from "@shared-mf-components/lib/dynamic-form-builder/dynamic-form-builder.model";
import { DimensionElements, Dimension } from "./resize-wrapper.model";


const defultValue: Dimension = {
    width: 200,
    height: 100
}
export const MIN_SIZE_DIMENSSION_ALLOWED: DimensionElements = {
    [FormBuilderTypesElementsEnum.ELEMENT_TEXT]: {
        ...defultValue
    },
    [FormBuilderTypesElementsEnum.ELEMENT_DATE]: {
        ...defultValue
    },
    [FormBuilderTypesElementsEnum.ELEMENT_DROPDOWN]: {
        ...defultValue
    },
    [FormBuilderTypesElementsEnum.ELEMENT_RADIO]: {
        ...defultValue
    },
    [FormBuilderTypesElementsEnum.ELEMENT_CHECKBOX]: {
        ...defultValue
    },
    [FormBuilderTypesElementsEnum.ELEMENT_FILE]: {
        ...defultValue
    },
    [FormBuilderTypesElementsEnum.ELEMENT_LABEL]: {
        ...defultValue
    },
    [FormBuilderTypesElementsEnum.ELEMENT_BUTTON]: {
        ...defultValue
    },
    [FormBuilderTypesElementsEnum.ELEMENT_TABLE]: {
        width: 400,
        height: 200
    }
}