import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HistoriaClinica {
  id: number;
  cedula: string;
  nombres: string;
  apellidos: string;
  numero: number;
  enfermedadesBase: string;
  virus: string;
  bacterias: string;
  hongos: string;
  parasitos: string;
  emociones: string;
  brujeria: string;
}

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {
  baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getHistoriasClinicas(): Observable<HistoriaClinica[]> {
    return this.http.get<HistoriaClinica[]>(this.baseUrl);
  }
}
