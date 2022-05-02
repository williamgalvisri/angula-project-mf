import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from './../../../environments/environment';
import { FormBuilderCreateFormApi, FormBuilderUpdateFormApi } from './../../../utils/models/global-api.model';
import { Form, SocketReceivers } from './../../../utils/models/global.model';
import { io } from 'socket.io-client';
import { ApplyNewSettingSchema } from '../lib/atomic-design-model/organisms/toolbar/toolbar.model';

const COLLECTION = 'forms';
@Injectable({ providedIn: 'root' })
export class FormBuilderService {
    private baseUrl = environment.baseUrl;

    private _fieldSchemaObservable$ = new Subject<ApplyNewSettingSchema>();
    public fieldSchemaSubject$ = this._fieldSchemaObservable$.asObservable();
    
    private _selectedFieldKeySubject$ = new Subject<string>();
    public selectedFieldKeyObservable$ = this._selectedFieldKeySubject$.asObservable();

    private _sharedConnectListSubject$ = new Subject<string[]>();
    public sharedConnectListObservable$ = this._sharedConnectListSubject$.asObservable();
    
    private _showSectionToolbarSubject$ = new Subject<string>();
    public showSectionToolbarObservable$ = this._showSectionToolbarSubject$.asObservable();

    private _selectedFormSubject$ = new Subject<Form>();
    public selectedFormObservable$ = this._selectedFormSubject$.asObservable();

    private _updateFormsCollectionSubject$ = new Subject<boolean>();
    public updateFormsCollectionObservable$ = this._updateFormsCollectionSubject$.asObservable();

    // Form data shared
    private _selectedForm!: Form;
    public forms: Form[] = []; 

    constructor(private http: HttpClient) {}

    get selectedForm(): Form {
        return this._selectedForm;
    }

    set selectedForm(value: Form) {
        this._selectedForm = value;
    }

    // -------------------------- _fieldSchemaObservable --------------------------
    public emmitChangesFields(setting: ApplyNewSettingSchema) {
        this._fieldSchemaObservable$.next(setting);
    }

    public onChangesField(): Observable<ApplyNewSettingSchema> {
        return this.fieldSchemaSubject$
    }

    // -------------------------- _selectedFieldKeySubject --------------------------
    public emmitFieldKey(fieldKey: string) {
        this._selectedFieldKeySubject$.next(fieldKey)
    }

    public onChangedFieldKey(): Observable<string>{
        return this.selectedFieldKeyObservable$
    }

    // -------------------------- _sharedConnectListSubject --------------------------
    public emmitSharedConnectList(setting: string[]) {
        this._sharedConnectListSubject$.next(setting);
    }

    public onChangesSharedConnectList(): Observable<string[]> {
        return this.sharedConnectListObservable$
    }

    // -------------------------- _showSectionToolbarSubject  --------------------------

    public emmitShowSectionToolbar(section: string) {
        this._showSectionToolbarSubject$.next(section);
    }

    public onChangesShowSectionToolbar(): Observable<string> {
        return this.showSectionToolbarObservable$
    }

    // -------------------------- _showSectionToolbarSubject  --------------------------

    public emmitSelectedForm(form: Form) {
        this._selectedFormSubject$.next(form);
    }

    public onChangesSelectedForm(): Observable<Form> {
        return this.selectedFormObservable$
    }

    // -------------------------- _updateFormsCollection  --------------------------
    public emmitUpdateFormsCollection(value: boolean) {
        this._updateFormsCollectionSubject$.next(value);
    }

    public onChangesuUpdateFormsCollection(): Observable<boolean> {
        return this.updateFormsCollectionObservable$
    }


    // onSnapshotSuccesEvent
    public onSnapshotSuccess = (forms: Form[]) => {
        this.forms = forms;
        // Activate socket
        const socket = io(this.baseUrl);
        socket.on(COLLECTION, (snapshot: SocketReceivers<Form>) => {
            switch(snapshot.operationType) {
                case 'update':
                    const formIndex = this.forms.findIndex( f => f._id === snapshot.documentKey._id);
                    this.forms[formIndex] = {...this.forms[formIndex], ...snapshot.updateDescription?.updatedFields};
                    if (this.selectedForm._id) {
                        this.getFormById(this.selectedForm._id)
                    }
                    break;
                case 'insert': 
                    const newDocument = snapshot.fullDocument;
                    this.forms.push(newDocument);
                    this.getFormById(newDocument._id);
                    break;
                case 'delete': 
                    const documentKeyDeleted = snapshot.documentKey._id;
                    const formIndexDeleted = this.forms.findIndex( f => f._id === documentKeyDeleted);
                    this.forms.splice(formIndexDeleted, 1);
                    if (this.selectedForm._id === documentKeyDeleted) {
                        this.forms[this.forms.length-1];
                        this.getFormById(this.forms[this.forms.length-1]._id);
                    }
                    break;
            }
            this.emmitUpdateFormsCollection(true)
        })
    }

    public onSnapshotError = (error: any) => {
        console.log(error)
    }

    public getFormById(id: string) {
        let form = this.forms.find(f => f._id === id) ?? this.forms[this.forms.length-1];
        // if (!form?.active) {
        //     const activeForms = this.forms.filter(f => f?.active);
        //     form = activeForms[activeForms.length-1];
        // }
        this.selectedForm = form ?? new Form();
        this.emmitSelectedForm(form);
    }


    // Services connection db
    public formBuilderCreateForm(data: FormBuilderCreateFormApi): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/forms`, data)
    }

    public formBuilderUpdateForm(id: string, data: FormBuilderUpdateFormApi): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/forms/${id}`, data)
    }

    public formBuilderGetAll(): Observable<Form[]> {
        return this.http.get<Form[]>(`${this.baseUrl}/forms`)
    }

    public formBuilderGetOne(id: string): Observable<Form[]> {
        return this.http.get<Form[]>(`${this.baseUrl}/forms/${id}`)
    }

    public formBuilderRemoveOne(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/forms/${id}`)
    }
}