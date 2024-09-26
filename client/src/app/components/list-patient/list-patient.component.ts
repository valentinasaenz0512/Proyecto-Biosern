import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PatientService } from '../../services/patient/patient.service';
import { Patient } from '../../shared/interfaces/patient.interface';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list-patient',
  standalone: true,
  imports: [TableModule, ToastModule, CommonModule, TagModule, DropdownModule, ButtonModule, InputTextModule,FormsModule,HttpClientModule],
  templateUrl: './list-patient.component.html',
  styleUrl: './list-patient.component.scss',
  providers: [MessageService, PatientService]
})
export class ListPatientComponent implements OnInit {
    @Output() newItemEvent = new EventEmitter<Patient>();
    patients!: Patient[];
    statuses!: SelectItem[];

    clonedPatients: { [s: string]: Patient } = {};

    constructor(private patientService: PatientService, private messageService: MessageService) {}

    ngOnInit() {
        this.patientService.getPatients().subscribe((data) => {

            this.patients = data;
   
        });

        this.statuses = [
            { label: 'In Stock', value: 'INSTOCK' },
            { label: 'Low Stock', value: 'LOWSTOCK' },
            { label: 'Out of Stock', value: 'OUTOFSTOCK' }
        ];
    }

    onRowEditInit(patient: Patient) {
        this.clonedPatients[patient.Cedula as string] = { ...patient };
    }

    onRowEditSave(patient: Patient) {
      this.patientService.updatePatient(patient).subscribe((data) => {
    });
    }

    onRowEditCancel(patient: Patient, index: number) {
        this.patients[index] = this.clonedPatients[patient.Cedula as string];
        delete this.clonedPatients[patient.Cedula as string];
    }

    openRecord(patient: Patient) {
      this.newItemEvent.emit(patient);
      
    }
}
