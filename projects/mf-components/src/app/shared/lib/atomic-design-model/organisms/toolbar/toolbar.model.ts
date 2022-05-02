import { FormSchemaField } from "@utils-mf-components/models";


export enum ElementToolbarType {
  BASIC = 'basic',
  LAYOUT = 'layout',
  CUSTOM = 'custom'
}
export class SectionToolbarElement {
  key: string;
  title: string;
  icon: string;
  expanded: boolean;
  typeElements: string;
  elements: Array<string>

  constructor(item?: SectionToolbarElement) {
    this.key = item?.key ?? '';
    this.title = item?.key ?? '';
    this.icon = item?.key ?? '';
    this.expanded = item?.expanded ?? false;
    this.typeElements = item?.typeElements ?? '';
    this.elements = item?.elements ?? [];
  }
}
export class ToolbarElement {
  key: string;
  title: string;
  icon: string;
  type: string;
  visible: boolean;

  constructor(item?: ToolbarElement) {
    this.key = item?.key ?? '';
    this.title = item?.key ?? '';
    this.icon = item?.key ?? '';
    this.visible = item?.visible ?? false;
    this.type = item?.type ?? ''
  }
}

export interface ApplyNewSettingSchema {
  field: FormSchemaField, 
  newKey: string,
  keyModified?: string
}