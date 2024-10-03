// medical-record.component.ts

import { HistoriaClinica } from '../../shared/interfaces/medical-record.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MedicalRecordService } from '../../services/medical-record/medical-record.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { Patient } from '../../shared/interfaces/patient.interface';

@Component({
  selector: 'app-medical-record',
  standalone: true,
  imports: [
    TableModule,
    ToastModule,
    CommonModule,
    TagModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    HttpClientModule,
    DialogModule,
    ToolbarModule,
    ConfirmDialogModule,
    MultiSelectModule
  ],
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.scss'],
  providers: [MessageService, ConfirmationService, MedicalRecordService],
})
export class MedicalRecordComponent implements OnInit {
  @Input() patient!: Patient;
  historiasClinicas: HistoriaClinica[] = [];
  selectedHistoriasClinicas: HistoriaClinica[] = [];
  historiaClinicaDialog: boolean = false;
  historiaClinica: HistoriaClinica = {} as HistoriaClinica;
  submitted: boolean = false;
  blockNumero: boolean = false;



  constructor(
    private medicalRecordService: MedicalRecordService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.medicalRecordService.getRecords().subscribe((data) => {
      this.historiasClinicas = data;
    });

    if(this.patient.Cedula) {
      this.historiaClinica = {} as HistoriaClinica;
      this.historiaClinica.Cedula = this.patient.Cedula;
      this.openNewMedicalRecord();
    }
  }

  openNewMedicalRecord() {
    this.blockNumero = false;
    this.submitted = false;
    this.historiaClinicaDialog = true;
  }

  editMedicalRecord(historiaClinica: HistoriaClinica) {
    this.blockNumero = true;
    this.historiaClinica = { ...historiaClinica };
    this.historiaClinicaDialog = true;
  }

  deleteMedicalRecord(historiaClinica: HistoriaClinica) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar la historia clínica número ' + historiaClinica.Numero + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.medicalRecordService.deleteRecord(historiaClinica.Numero).subscribe(
          (data) => {
            this.historiasClinicas = this.historiasClinicas.filter((val) => val.Numero !== historiaClinica.Numero);
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Historia Clínica Eliminada', life: 3000 });
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la Historia Clínica', life: 3000 });
          }
        );
      },
    });
  }

  saveMedicalRecord() {
    this.submitted = true;
    if (this.blockNumero) {
      // Actualizar historia clínica existente
      this.medicalRecordService.updateRecord(this.historiaClinica).subscribe(
        (data) => {
          const index = this.historiasClinicas.findIndex((hc) => hc.Numero === this.historiaClinica.Numero);
          this.historiasClinicas[index] = this.historiaClinica;
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Historia Clínica Actualizada', life: 3000 });
          this.historiaClinicaDialog = false;
          this.historiaClinica = {} as HistoriaClinica;
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la Historia Clínica', life: 3000 });
        }
      );
    } else {
      // Crear nueva historia clínica
      this.medicalRecordService.createRecord(this.historiaClinica).subscribe(
        (data) => {
          this.historiasClinicas.push(this.historiaClinica);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Historia Clínica Creada', life: 3000 });
          this.historiaClinicaDialog = false;
          this.historiaClinica = {} as HistoriaClinica;
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la Historia Clínica', life: 3000 });
        }
      );
    }

  }

  hideDialog() {
    this.historiaClinicaDialog = false;
    this.submitted = false;
  }
}
