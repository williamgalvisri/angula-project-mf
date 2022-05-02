import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import {
  ElementsTheming,
  EventTypeElementsEnum,
  EventTypeTrigger,
  Form,
  FormFieldValue,
  FormSchemaField,
  FormSchemaGeneralSettings,
  GeneralSchemaFormBuilder,
  SelectionModel,
} from 'projects/mf-components/src/utils/models/global.model';
import { ObjectUtilities } from 'projects/mf-components/src/utils/objects.utils';
import { ELEMENTS_TOOLBAR, SECTION_ELEMENTS_TOOLBAR } from './toolbar.utils';
import {
  ApplyNewSettingSchema,
  ElementToolbarType,
  SectionToolbarElement,
  ToolbarElement,
} from './toolbar.model';
import { FormBuilderService } from '@shared-mf-components/services/form-builder.service';
import { Subscription } from 'rxjs';
import { FormBuilderTypesElementsEnum } from '@shared-mf-components/lib/dynamic-form-builder/dynamic-form-builder.model';
import { uiElementsTheming, uiElementsThemingSettingNav } from 'projects/mf-components/src/utils/page/app.utils';
import { Router } from '@angular/router';
import { FormGroupUtils } from '@utils-mf-components/formgroup.utils';

export const _idListToolElement = 'tools-elements-list';
type StateFormType = 'none' | 'create' | 'update' | 'remove';
@Component({
  selector: 'toolbar-organism',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarOrganism extends FormGroupUtils implements OnInit, OnDestroy, OnChanges {
  @Input() fields: FormSchemaField[] = [];
  @Input() section: string = 'elements';
  @Output() onApplyChangesFields = new EventEmitter<ApplyNewSettingSchema>();

  public connectColumnList: Array<string> = [];
  public selectedFieldKey: string = '';
  public selectedTypeField: string = '';
  public sectionElementsTools: Array<SectionToolbarElement> =
    SECTION_ELEMENTS_TOOLBAR;
  public formIsReady: boolean = false;
  public idListToolElement = _idListToolElement;
  public elementTheming: ElementsTheming = uiElementsTheming;
  public elementThemingSettingNav: ElementsTheming = uiElementsThemingSettingNav;
  public elementsOptionEventType: SelectionModel[] = [
    {
      key: EventTypeElementsEnum.ONINIT,
      label: EventTypeElementsEnum.ONINIT,
    },
  ];

  public stateFormToolbar: StateFormType = 'none';

  public searchFormGroup: FormGroup = new FormGroup({})
  public actionFormFormGroup: FormGroup = new FormGroup({});

  public forms: Form[] = []
  public selectedForm?: Form;
  public variables: SelectionModel[] = []
  private connectColumnSubscription$!: Subscription;
  private showSectionToolbarSubscription$!: Subscription;
  private selectedFormSubscription$!: Subscription;
  private updateFormsCollectionSubscription$!: Subscription;

  constructor(
    private formBuilderService: FormBuilderService,
    private router: Router
  ) {
    super();
    // TODO: Create a search input for the forms
    // this.searchFormGroup = new FormGroup({
    //   search: new FormControl('')
    // });
    this.initializeForm()
  }

  get isValidForm() {
    return this.actionFormFormGroup.valid
  }

  // Hooks mehthods
  ngOnInit(): void {
    this.initializeSubsctiption();
    this.loadAllVariablesCreated();
    this.getAllForms();
  }

  ngOnDestroy(): void {
    this.connectColumnSubscription$?.unsubscribe();
    this.showSectionToolbarSubscription$?.unsubscribe();
    this.selectedFormSubscription$?.unsubscribe();
    this.updateFormsCollectionSubscription$?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadAllVariablesCreated()
  }

  initializeForm() {
    this.actionFormFormGroup = new FormGroup({
      name: new FormControl(''),
      endpointUrlBase: new FormControl(''),
      description: new FormControl(''),
      variables: new FormArray([]),
      fetching: new FormGroup({
        typEvent: new FormControl(''),
        urlFetching: new FormControl(''),
        variable: new FormControl(''),
      })
    })
  }

  private initializeSubsctiption() {
    this.listenChangesSharedConnection();
    this.listenChangesShowSectionToolbar();
    this.listenChangesSelectedForm();
    this.listenChangesFormsCollection();
  }
  private loadAllVariablesCreated() {
    this.variables = this.formBuilderService.selectedForm?.settings?.variables?.map(k => ({key: k, label: k})) ?? [];
  }
  // -------------------- Subscriptions --------------------

  private listenChangesSharedConnection() {
    this.connectColumnSubscription$ = this.formBuilderService
      .onChangesSharedConnectList()
      .subscribe((connected: string[]) => {
        this.connectColumnList = [...connected, 'gridZone'];
      });
  }

  public listenChangesShowSectionToolbar() {
    this.showSectionToolbarSubscription$ = this.formBuilderService.onChangesShowSectionToolbar().subscribe((section: string) => {
      this.section = section;
    });
  }

  public listenChangesSelectedForm() {
    this.selectedForm = this.formBuilderService.selectedForm;
    this.selectedFormSubscription$ = this.formBuilderService.onChangesSelectedForm().subscribe((form: Form) => {
      this.selectForm(form._id)
    });
  }

  public listenChangesFormsCollection() {
    this.getAllForms();
    this.updateFormsCollectionSubscription$ = this.formBuilderService.onChangesuUpdateFormsCollection().subscribe(() => {
      this.getAllForms();
    });
  }

  /**
   * Todo: explicar por que se hizo esto, devuelve un array de string para poder asociar bien el sdk de angular drag and drop
   * @param key
   * @returns
   */
  valueFromElement(key: string): ToolbarElement {
    return ELEMENTS_TOOLBAR.find((e) => e.key === key) ?? new ToolbarElement();
  }



  // Form methods

  createForm() {
    this.stateValueForm('create');
    this.actionFormFormGroup.reset();
    this.initializeForm();
  }

  cancelCreate() {
    this.stateValueForm('none');
  }

  updateForm(id: string) {
    this.stateValueForm('update');
    this.selectForm(id);
    const formGroupArray = this.selectedForm?.settings?.variables?.map(v => (new FormGroup({variable: new FormControl(v)}))) ?? []
    this.actionFormFormGroup = new FormGroup({
      name: new FormControl(this.selectedForm?.name ?? ''),
      description: new FormControl(this.selectedForm?.description ?? ''),
      endpointUrlBase: new FormControl(this.selectedForm?.settings?.generalSetting?.endpointUrlBase ?? ''),
      variables: new FormArray(formGroupArray),
      fetching: new FormGroup({
        typEvent: new FormControl(this.selectedForm?.settings?.fetching?.typEvent ?? ''),
        urlFetching: new FormControl(this.selectedForm?.settings?.fetching?.urlFetching ?? ''),
        variable: new FormControl(this.selectedForm?.settings?.fetching?.variable ?? ''),
      })
    })
  }

  private stateValueForm(value: StateFormType) {
    this.stateFormToolbar = value;
  }
  
  selectForm(id: string) {
    this.selectedForm = this.formBuilderService.selectedForm;
    this.router.navigate([`constructor`], {queryParams: {formId: id}})
  }

  async actionForm(action: StateFormType) {
    try {
      const actionFormValue = this.actionFormFormGroup.value;
      switch(action) {
        case 'create':
          const payloadCreate = {
            name: actionFormValue.name, 
            description: actionFormValue.description,
            settings: {
              ...new GeneralSchemaFormBuilder(),
              generalSetting: {
                ...new FormSchemaGeneralSettings(),
                endpointUrlBase: actionFormValue?.endpointUrlBase
              },
              variables: actionFormValue.variables.map((v: any) => v.variable),
              fetching: actionFormValue?.fetching ?? null
            }
          } as Form;
          return await this.formBuilderService.formBuilderCreateForm(payloadCreate).toPromise();
        case 'update':
          const payloadUpdate = {
            name: actionFormValue.name, 
            description: actionFormValue.description,
            settings: {
              ...this.selectedForm?.settings,
              generalSetting: {
                ...this.selectedForm?.settings?.generalSetting,
                endpointUrlBase: actionFormValue?.endpointUrlBase
              },
              variables: actionFormValue.variables.map((v: any) => v.variable),
              fetching: actionFormValue?.fetching ?? null
            }
          } as Form;
          if (this.selectedForm?._id) {
            return await this.formBuilderService.formBuilderUpdateForm(this.selectedForm?._id, payloadUpdate).toPromise();
          } else {
            throw new Error('No form selected!')
          }
        case 'remove':
          if (this.selectedForm?._id) {
            return await this.formBuilderService.formBuilderRemoveOne(this.selectedForm?._id).toPromise();
          } else {
            throw new Error('No form selected!')
          }
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.stateValueForm('none');
      this.actionFormFormGroup.reset();
    }
  }

  getAllForms() {
    this.forms = this.formBuilderService.forms
    // .filter(f => f.active === 1);
  }
  // Helper methods

  /**
   * It is necessary to ensure the existence of an element within the dictionary.
   * @param type element type registered within enum
   * @returns type of element
   */
  getType(type: keyof typeof FormBuilderTypesElementsEnum) {
    return ObjectUtilities.EnumToObject(FormBuilderTypesElementsEnum)[type];
  }

  getTypeElementsTools(type: keyof typeof ElementToolbarType) {
    return ObjectUtilities.EnumToObject(ElementToolbarType)[type];
  }


  // Utils formGroup

  public createItemFormArray(): FormGroup {
    return new FormGroup({
      variable: new FormControl(''),
    }) as FormGroup;
  }
}
