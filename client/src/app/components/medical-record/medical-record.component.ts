import { HistoriaClinica } from '../../shared/interfaces/medical-record.interface';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PatientService } from '../../services/patient/patient.service';
import { Patient } from '../../shared/interfaces/patient.interface';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MedicalRecordService } from '../../services/medical-record/medical-record.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-medical-record',
  standalone: true,
  imports: [TableModule, ToastModule, CommonModule, TagModule, DropdownModule, ButtonModule, InputTextModule,FormsModule,HttpClientModule],
  templateUrl: './medical-record.component.html',
  styleUrl: './medical-record.component.scss',
  providers: [MessageService, MedicalRecordService]
})
export class MedicalRecordComponent implements OnInit{

  //@Output() newItemEvent = new EventEmitter<Patient>();
  historiasClinicas!: HistoriaClinica[];
  statuses!: SelectItem[];

  clonedHistoriasClinicas: { [s: string]: HistoriaClinica } = {};

  constructor(private medicalRecordService: MedicalRecordService, private messageService: MessageService) {}

  ngOnInit() {
      this.medicalRecordService.getRecords().subscribe((data) => {

          this.historiasClinicas = data;
          console.log(this.historiasClinicas)
      });

      this.statuses = [
          { label: 'In Stock', value: 'INSTOCK' },
          { label: 'Low Stock', value: 'LOWSTOCK' },
          { label: 'Out of Stock', value: 'OUTOFSTOCK' }
      ];
  }

  onRowEditInit(historiaClinica: HistoriaClinica) {
     // this.clonedHistoriasClinicas[patient.Cedula as string] = { ...patient };
  }

  onRowEditSave(historiaClinica: HistoriaClinica) {
    //this.patientService.updatePatient(patient).subscribe((data) => {
  //});
  }

  onRowEditCancel(historiaClinica: HistoriaClinica, index: number) {
      //this.patients[index] = this.clonedPatients[patient.Cedula as string];
     // delete this.clonedPatients[patient.Cedula as string];
  }

  openRecord(historiaClinica: HistoriaClinica) {
    //this.newItemEvent.emit(patient);
    
  }
}
