import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../shared/interfaces/patient.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseUrl = 'http://localhost:3001/paciente';

  constructor(private httpClient: HttpClient) { }

  createPatient(patient:Patient) {
      return this.httpClient.post<any>(this.baseUrl + "/create", patient);
  }

  getPatients() : Observable<any> {
      return this.httpClient.get<any>(this.baseUrl);
  }

  updatePatient(patient: Patient) : Observable<any> {
    return this.httpClient.put<any>(this.baseUrl + "/update",patient);
  }
  deletePatient(Cedula: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/delete/${Cedula}`);
  }
}
