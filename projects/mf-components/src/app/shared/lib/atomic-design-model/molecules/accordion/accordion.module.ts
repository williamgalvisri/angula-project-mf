import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '@core-mf-components/angular-material/angular-material.module';
import { AccordionMolecule } from './accordion.component';
import { ItemAccordionMolecule } from './item-accordion/item-accordion.component';


@NgModule({
    imports: [
        AngularMaterialModule, 
        CommonModule],
    exports: [AccordionMolecule, ItemAccordionMolecule],
    declarations: [AccordionMolecule, ItemAccordionMolecule],
    providers: [],
})
export class AccordionMoleculeModule { }
