import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AtomsModule } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';
import { ToolbarOrganism } from './toolbar/toolbar.component';
import { TableOrganism } from './table/table.component';
import { NavOrganism } from './nav/nav.component';
import { IconSvgModule } from '../../icons-svg/icon-svg.module';
import { NavVerticalOrganism } from './nav-vertical/nav-vertical.component';
import { SettingsBarOrganism } from './settings-bar/settings-bar.component';
import { SplashViewOrganism } from './splash-view/splash-view.component';
import { SnackbarOrganism } from './snackbar/snackbar.component';
import { AngularMaterialModule } from '@core-mf-components/angular-material/angular-material.module';
import { CoreModule } from '@core-mf-components/core.module';

@NgModule({
    imports: [CoreModule, AtomsModule, MoleculesModule, ReactiveFormsModule, FormsModule, DragDropModule, IconSvgModule],
    exports: [ToolbarOrganism, TableOrganism, NavOrganism, NavVerticalOrganism, SettingsBarOrganism, SplashViewOrganism, SnackbarOrganism],
    declarations: [ToolbarOrganism, TableOrganism, NavOrganism, NavVerticalOrganism, SettingsBarOrganism, SplashViewOrganism, SnackbarOrganism],
    providers: [],
})
export class OrganismsModule { }
