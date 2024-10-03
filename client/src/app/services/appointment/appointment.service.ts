// src/app/services/appointment/appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Appointment } from '../../shared/interfaces/appointment.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3001/citas';

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<any>(this.apiUrl);
  }

  createAppointment(appointment: Appointment): Observable<any> {
    console.log("entro create cita")
    return this.http.post(`${this.apiUrl}/create`, appointment);
  }

  updateAppointment(appointment: Appointment): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, appointment);
  }

  deleteAppointment(numeroCita: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${numeroCita}`);
  }
}
