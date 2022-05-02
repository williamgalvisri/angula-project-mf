import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AppServiceService {
    constructor(private http: HttpClient) { 

    }
    
    public formBuilderGetOne(id: string): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:3000/forms/${id}`)
    }
}