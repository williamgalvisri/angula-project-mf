import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External modules
// import { DragDropModule } from '@angular/cdk/drag-drop';

// components
import { DynamicFormBuilderComponent } from './dynamic-form-builder.component';
import { FieldBuilderComponent } from './field-builder/field-builder.component';
import { HttpClientModule } from '@angular/common/http';
import { PortDynamicFormBuilderComponent } from './port-dynamic-form-builder/port-dynamic-form-builder.component';
import { SharedDynamicFormBuilderComponent } from './shared-dynamic-form-builder/shared-dynamic-form-builder.component';
import { NgxPanZoomModule } from 'ngx-panzoom';
import { AngularMaterialModule } from '@core-mf-components/angular-material/angular-material.module';
import { AtomicDesingModule } from '../atomic-design-model/atomic-design-model.module';
import { CoreModule } from '@core-mf-components/core.module';

@NgModule({
  imports: [
    CoreModule,
    AtomicDesingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPanZoomModule,
  ],
  declarations: [
    DynamicFormBuilderComponent,
    FieldBuilderComponent,
    PortDynamicFormBuilderComponent,
    SharedDynamicFormBuilderComponent,
  ],
  exports: [
    DynamicFormBuilderComponent,
    FieldBuilderComponent,
    PortDynamicFormBuilderComponent,
    SharedDynamicFormBuilderComponent,
  ],
  providers: [],
})
export class DynamicFormBuilderModule {
  constructor() {
    // // create custom elements from angular components
    // const ngCustomElement = createCustomElement(DynamicFormBuilderComponent, { injector: this.injector });
    // // define in browser registry
    // customElements.define('ng-form-builder', ngCustomElement);
  }
}
