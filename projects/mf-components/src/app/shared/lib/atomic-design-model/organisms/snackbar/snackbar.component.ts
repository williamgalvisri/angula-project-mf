import { Component, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { uiElementsTheming } from '@utils-mf-components/page/app.utils';

@Component({
  selector: 'snackbar-organism',
  templateUrl: 'snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
})
export class SnackbarOrganism {
  public elementTheming = uiElementsTheming;
  public elementThemingButton = {
    ...uiElementsTheming['button'],
    minWidth: '144px',
  };
  public loadingAction: boolean = false;
  public status: Subject<any> = new Subject<any>();
  private status$: Observable<any> = this.status.asObservable();
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string,
    public snackBarRef: MatSnackBarRef<any>
  ) {}

  onActionCustom() {
    this.status.next();
  }

  getActionObservable() {
    return this.status$;
  }
}
