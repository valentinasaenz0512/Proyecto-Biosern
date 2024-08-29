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

  getRecord(cedula: string): Observable<HistoriaClinica> {
    return this.httpClient.get<HistoriaClinica>(`${this.baseUrl}/historiaclinica/${cedula}`);
  }
}
