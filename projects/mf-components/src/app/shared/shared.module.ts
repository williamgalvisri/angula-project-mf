import { NgModule } from '@angular/core';
import { AtomicDesingModule } from './lib/atomic-design-model/atomic-design-model.module';
import { DynamicFormBuilderModule } from './lib/dynamic-form-builder/dynamic-form-builder.module';
import { IconSvgModule } from './lib/icons-svg/icon-svg.module';
import { FormBuilderService } from './services/form-builder.service';
@NgModule({
  imports: [DynamicFormBuilderModule, AtomicDesingModule, IconSvgModule],
  declarations: [],
  exports: [DynamicFormBuilderModule, AtomicDesingModule, IconSvgModule],
  providers: [],
})
export class SharedModule {}
