import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Form,
  GeneralSchemaFormBuilder,
} from 'projects/mf-components/src/utils/models/global.model';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SnackbarOrganism } from '@shared-mf-components/lib/atomic-design-model/organisms/snackbar/snackbar.component';
import { CacheLoaderService } from '@shared-mf-components/services/cache-loader.service';
import { FormBuilderService } from '@shared-mf-components/services/form-builder.service';

@Component({
  selector: 'constructor-page',
  templateUrl: 'constructor.component.html',
  styleUrls: ['constructor.component.css'],
})
export class ConstructorPage implements OnInit, OnDestroy {
  public formSchemaGeneralSettings: GeneralSchemaFormBuilder =
    new GeneralSchemaFormBuilder();
  public selectedForm!: Form;
  private snackBarSaveValue!: MatSnackBarRef<SnackbarOrganism>
  private routerSubscription$!: Subscription;
  private actionObservable$!: Subscription;
  private selectedFormSubscription$!: Subscription;
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilderService: FormBuilderService,
    public cacheLoaderService: CacheLoaderService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.listenChangesRouter();
    const snackBarRef = this.matSnackBar.openFromComponent(SnackbarOrganism, {});
    this.actionObservable$ = snackBarRef.instance.getActionObservable().pipe(
      switchMap(() => {
        snackBarRef.instance.loadingAction = true;
        return this.formBuilderService.formBuilderUpdateForm(this.selectedForm._id, {settings: this.formSchemaGeneralSettings})
      }),
      tap()
    ).subscribe({
        next: () => {
          snackBarRef.instance.loadingAction = false;
        }
    });
    this.listenChangesSelectedForm();
    this.snackBarSaveValue = snackBarRef;
  }

  ngOnDestroy(): void {
    this.routerSubscription$.unsubscribe();
    this.actionObservable$.unsubscribe();
    this.selectedFormSubscription$.unsubscribe();
  }

  private listenChangesSelectedForm() {
    this.selectedFormSubscription$ = this.formBuilderService.onChangesSelectedForm().subscribe((value) => {
      this.selectedForm = { ...this.formBuilderService.selectedForm };
      this.formSchemaGeneralSettings = this.selectedForm.settings ?? new GeneralSchemaFormBuilder();
    })
  }
  
  private getFormById(id: string) {
    this.formBuilderService.getFormById(id);
    this.selectedForm = { ...this.formBuilderService.selectedForm };
    this.formSchemaGeneralSettings = this.selectedForm.settings ?? new GeneralSchemaFormBuilder();
  }

  private listenChangesRouter() {
    // const currentValueNavigation = this.route?.browserUrlTree?.queryParams ?? {};
    this.routerSubscription$ = this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.getFormById(params.formId);
      }
    );
  }

}
