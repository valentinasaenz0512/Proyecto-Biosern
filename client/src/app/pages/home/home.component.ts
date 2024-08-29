import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { MedicalRecordComponent } from '../../components/medical-record/medical-record.component';
import { ListPatientComponent } from '../../components/list-patient/list-patient.component';
import { AppointmentComponent } from '../../components/appointment/appointment.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TabMenuModule,MedicalRecordComponent,ListPatientComponent,AppointmentComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  items: MenuItem[] | undefined;

  stateMenu: number = 0;

  ngOnInit() {
      this.items = [
          {
              label: 'Pacientes',
              icon: 'pi pi-user',
              command: () => {
                this.stateMenu = 0;
                console.log("holka")
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

}
