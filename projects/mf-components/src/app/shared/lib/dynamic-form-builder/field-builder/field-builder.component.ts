import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormSchemaField } from '@utils-mf-components/models/global.model';
import { ObjectUtilities } from '@utils-mf-components/objects.utils';
import { FormBuilderTypesElementsEnum } from '../dynamic-form-builder.model';

@Component({
  selector: 'field-builder',
  templateUrl: './field-builder.component.html',
})
export class FieldBuilderComponent {
  @Input() field: FormSchemaField = new FormSchemaField();
  @Input() formGroup: FormGroup = new FormGroup({});

  get isValid() {
    return this.formGroup.controls?.[this.field.key]?.valid;
  }
  get isDirty() {
    return this.formGroup.controls?.[this.field.key]?.dirty;
  }

  constructor() {}

  /**
   * It is necessary to ensure the existence of an element within the dictionary.
   * @param type element type registered within enum
   * @returns type of element
   */
  getType(type: keyof typeof FormBuilderTypesElementsEnum) {
    return ObjectUtilities.EnumToObject(FormBuilderTypesElementsEnum)[type];
  }
}
