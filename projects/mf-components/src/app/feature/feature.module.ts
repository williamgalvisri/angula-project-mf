import { NgModule } from '@angular/core';
import { CoreModule } from '@core-mf-components/core.module';
import { DynamicFormBuilderModule } from '@shared-mf-components/lib/dynamic-form-builder/dynamic-form-builder.module';
import { FeatureRoutingModule } from './feature-routing.module';


@NgModule({
    imports: [DynamicFormBuilderModule, FeatureRoutingModule, CoreModule],
    exports: [],
    declarations: [],
    providers: [],
})
export class FeatureModule { }
