import { NgModule } from '@angular/core';
import { ChevronIconSvg } from './chevron-icon/chevron-icon.component';
import { FileIconSvg } from './file-icon/file-icon.component';
import { IconMobileformSvg } from './icon-mobilform/icon-mobilform.component';
import { LayersIconSvg } from './layers-icon/layers-icon.component';
import { MinusCircleIconSvg } from './minus-circle-icon/minus-circle-icon.component';
import { PlusCircleIconSvg } from './plus-circle-icon/plus-circle-icon.component';
import { PlusiconSvg } from './plus-icon/plus-icon.component';
import { SearchIconSvg } from './search-icon/search-icon.component';
import { SettingIconSvg } from './setting-icon/setting-icon.component';
import { XIconSvg } from './x-icon/x-icon.component';


@NgModule({
    imports: [],
    exports: [IconMobileformSvg, FileIconSvg, PlusiconSvg, LayersIconSvg, MinusCircleIconSvg, PlusCircleIconSvg, SearchIconSvg, SettingIconSvg, ChevronIconSvg, XIconSvg],
    declarations: [IconMobileformSvg, FileIconSvg, PlusiconSvg, LayersIconSvg, MinusCircleIconSvg, PlusCircleIconSvg, SearchIconSvg, SettingIconSvg, ChevronIconSvg, XIconSvg],
    providers: [],
})
export class IconSvgModule { }
