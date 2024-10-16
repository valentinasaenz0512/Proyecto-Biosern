import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { MedicalRecordComponent } from '../../components/medical-record/medical-record.component';
import { ListPatientComponent } from '../../components/list-patient/list-patient.component';
import { AppointmentComponent } from '../../components/appointment/appointment.component';
import { CommonModule } from '@angular/common';
import { Patient } from '../../shared/interfaces/patient.interface';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TabMenuModule,MedicalRecordComponent,ListPatientComponent,AppointmentComponent,CommonModule,ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  items: MenuItem[] | undefined;
  patient: Patient = {} as Patient;
  stateMenu: number = 0;
  constructor(private router: Router) {}

  ngOnInit() {
    this.patient.Cedula = "";
    this.items = [
      {
          label: 'Pacientes',
          icon: 'pi pi-user',
          command: () => {
            this.stateMenu = 0;
        }
      },
      {
          label: 'Historia Clinica',
          icon: 'pi pi-book',
          command: () => {
            this.stateMenu = 1;
        }
      },
      {
          label: 'Citas',
          icon: 'pi pi-receipt',
          command: () => {
            this.stateMenu = 2;
        }
      },
    ]
  }
  newRecord(patient: Patient) {
    this.patient = patient;
    this.stateMenu = 1;
    this.executeAfterOneSecond();

  }
  newAppointment(patient: Patient) {
    this.patient = patient;
    this.stateMenu = 2;
    this.executeAfterOneSecond();
  }
  executeAfterOneSecond() {
    setTimeout(() => {
      this.patient.Cedula = "";
    }, 1000);
  }
  logout() {
    console.log('Cerrando sesión...');
    this.router.navigate(['/login']); // Redirige al usuario a la página de login
  }

}
