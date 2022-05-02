import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// External modules
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { ButtonAtom } from './button/button.component';
import { CheckboxAtom } from './checkbox/checkbox.component';
import { DropdownAtom } from './dropdown/dropdown.component';
import { HRAtom } from './hr/hr.component';
import { LabelAtom } from './label/label.component';
import { RadioAtom } from './radio/radio.component';
import { SpinerAtom } from './spiner/spiner.component';
import { TextFieldAtom } from './text-field/text-field.component';
import { ToggleAtom } from './toggle/toggle.component';
import { CodeEditorAtom } from './code-editor/code-editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { LabelExampleComponent } from './label-example/label-example.component';
import { AngularMaterialModule } from '@core-mf-components/angular-material/angular-material.module';
import { CoreModule } from '@core-mf-components/core.module';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  imports: [
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(maskConfig),
    MonacoEditorModule,
  ],
  exports: [
    TextFieldAtom,
    LabelAtom,
    CheckboxAtom,
    ButtonAtom,
    ToggleAtom,
    DropdownAtom,
    RadioAtom,
    HRAtom,
    SpinerAtom,
    CodeEditorAtom,
    LabelExampleComponent
  ],
  declarations: [
    TextFieldAtom,
    LabelAtom,
    CheckboxAtom,
    ButtonAtom,
    ToggleAtom,
    DropdownAtom,
    RadioAtom,
    HRAtom,
    SpinerAtom,
    CodeEditorAtom,
    LabelExampleComponent
  ],
  providers: [],
})
export class AtomsModule {}
