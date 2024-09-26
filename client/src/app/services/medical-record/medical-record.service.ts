import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoriaClinica } from '../../shared/interfaces/medical-record.interface';


@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {
  baseUrl = 'http://localhost:3001';
  constructor(private httpClient: HttpClient) { }

  getRecordById(cedula: string): Observable<HistoriaClinica> {
    return this.httpClient.get<HistoriaClinica>(`${this.baseUrl}/historiaclinica/${cedula}`);
  }

  getRecords(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/historiaclinica`);
  }
  // Crear una nueva historia clínica
  createRecord(historiaClinica: HistoriaClinica): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/historiaclinica/create`, historiaClinica);
  }

  // Actualizar una historia clínica existente
  updateRecord(historiaClinica: HistoriaClinica): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/historiaclinica/update`, historiaClinica);
  }

  // Eliminar una historia clínica
  deleteRecord(Numero: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/historiaclinica/delete/${Numero}`);
  }
}
