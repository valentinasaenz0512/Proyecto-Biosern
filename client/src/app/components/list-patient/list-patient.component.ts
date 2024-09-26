import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PatientService } from '../../services/patient/patient.service';
import { Patient } from '../../shared/interfaces/patient.interface';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrl: './list-patient.component.scss',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    InputTextareaModule,
    CommonModule,
    FileUploadModule,
    DropdownModule,
    TagModule,
    RadioButtonModule,
    RatingModule,
    FormsModule,
    InputNumberModule
  ],
  providers: [MessageService, ConfirmationService, PatientService]
})
export class ListPatientComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<Patient>();
  patients!: Patient[];
  selectedPatients!: Patient[] | null;
  patientDialog: boolean = false;
  patient!: Patient;
  submitted: boolean = false;
  clonedPatients: { [s: string]: Patient } = {};

  blockCedula: boolean = false;

  constructor(
    private patientService: PatientService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.patientService.getPatients().subscribe((data) => {
      this.patients = data;
    });
  }

  openNewPatient() {
    this.blockCedula = false;
    this.patient = {} as Patient;
    this.submitted = false;
    this.patientDialog = true;
  }
  newRecord(patient: Patient) {
    this.newItemEvent.emit(patient);
  }

  editPatient(patient: Patient) {
    this.blockCedula = true;
    this.patientDialog = true;
    this.patient = { ...patient };


  }

  deletePatient(patient: Patient) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar al paciente ' + patient.Nombres + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.patientService.deletePatient(patient.Cedula).subscribe((data) => {
          if(data.message == "Paciente eliminado con éxito!") {
            this.patients = this.patients.filter((val) => val.Cedula !== patient.Cedula);
            this.patient = {} as Patient;
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Paciente Eliminado', life: 3000 });

          } else {
            this.messageService.add({ severity: 'failure', summary: 'Fracaso', detail: 'No se pudo eliminar el Paciente', life: 3000 });
          }

        });

      }
    });
  }

  deleteSelectedPatients() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar los pacientes seleccionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.patients = this.patients.filter((val) => !this.selectedPatients?.some(sel => sel.Cedula === val.Cedula));
        this.selectedPatients = null;
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Pacientes Eliminados', life: 3000 });
      }
    });
  }

  savePatient() {
    this.submitted = true;

    if (this.patient.Nombres?.trim()) {
      if (this.patient.Cedula) {
        const index = this.findIndexByCedula(this.patient.Cedula);
        if (index >= 0) {
          this.patients[index] = this.patient;
          this.patientService.updatePatient(this.patient).subscribe((data) => {
            if(data.message == "Paciente actualizado con éxito!") {
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Paciente Actualizado', life: 3000 });

            } else {
              this.messageService.add({ severity: 'failure', summary: 'Fracaso', detail: 'No se pudo actualizar el Paciente', life: 3000 });
            }

          });


        } else {
          this.patientService.createPatient(this.patient).subscribe((data) => {
            if(data.message == "Paciente registrado con éxito!") {
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Paciente Creado', life: 3000 });
              this.patients.push(this.patient);
            } else {
              this.messageService.add({ severity: 'failure', summary: 'Fracaso', detail: 'No se pudo crear el Paciente', life: 3000 });
            }


          });


        }
      }

      this.patients = [...this.patients];
      this.patientDialog = false;
      this.patient = {} as Patient;
    }
  }

  hideDialog() {
    this.patientDialog = false;
    this.submitted = false;
  }

  findIndexByCedula(cedula: string): number {
    return this.patients.findIndex(patient => patient.Cedula === cedula);
  }
}
