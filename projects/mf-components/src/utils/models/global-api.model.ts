import { GeneralSchemaFormBuilder } from "./global.model";


export interface FormBuilderCreateFormApi {
    name: string;
    description: string;
    settings: GeneralSchemaFormBuilder;
}

export interface FormBuilderUpdateFormApi {
    name?: string;
    description?: string;
    settings?: GeneralSchemaFormBuilder;
}

