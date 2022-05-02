import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtomsModule } from '../atoms/atoms.module';
import { AccordionMoleculeModule } from './accordion/accordion.module';
import { CardMolecule } from './card/card.component';
import { LabelDropdwonMolecule } from './label-dropdown/label-dropdown.component';
import { LabelTextFieldMolecule } from './label-text-field/label-text-field.component';
import { LabelCheckBoxMolecule } from './label-checkbox/label-checkbox.component';
import { FieldBuilderMolecule } from './field-builder/field-builder.component';
import { LabelRadioMolecule } from './label-radio/label-radio.component';
import { ResizableModule } from 'angular-resizable-element';
import { ResizeWrapperMolecule } from './resize-wrapper/resize-wrapper.component';
import { SideMenuContainerMolecule } from './side-menu-container/side-menu-container.component';
import { SplashViewMolecule } from './splash-view/splash-view.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { AngularMaterialModule } from '@core-mf-components/angular-material/angular-material.module';
import { CoreModule } from '@core-mf-components/core.module';

@NgModule({
  imports: [
    CoreModule,
    AtomsModule,
    ReactiveFormsModule,
    FormsModule,
    AccordionMoleculeModule,
    ResizableModule,
    AngularDraggableModule
  ],
  exports: [
    LabelTextFieldMolecule,
    LabelCheckBoxMolecule,
    CardMolecule,
    AccordionMoleculeModule,
    LabelDropdwonMolecule,
    FieldBuilderMolecule,
    LabelRadioMolecule,
    ResizeWrapperMolecule,
    SideMenuContainerMolecule,
    SplashViewMolecule,
  ],
  declarations: [
    LabelTextFieldMolecule,
    LabelCheckBoxMolecule,
    CardMolecule,
    LabelDropdwonMolecule,
    FieldBuilderMolecule,
    LabelRadioMolecule,
    ResizeWrapperMolecule,
    SideMenuContainerMolecule,
    SplashViewMolecule,
  ],
  providers: [],
})
export class MoleculesModule {}
