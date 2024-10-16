import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppointmentService } from '../../services/appointment/appointment.service';
import { Appointment } from '../../shared/interfaces/appointment.interface';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormatTimePipe } from '../../shared/pipes/format-time.pipe';
import { Patient } from '../../shared/interfaces/patient.interface';

@Component({
  selector: 'app-appointment',
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
    DropdownModule,
    CommonModule,
    FormsModule,
    FormatTimePipe
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
  providers: [MessageService, ConfirmationService, AppointmentService]
})
export class AppointmentComponent implements OnInit {
  @Input() patient!: Patient;
  appointments: Appointment[] = [];
  selectedAppointments: Appointment[] | null = null;
  appointmentDialog: boolean = false;
  appointment: Appointment = {} as Appointment;
  submitted: boolean = false;
  blockNumeroCita: boolean = false;

  tiposCita = [
    { label: 'Presencial', value: 'Presencial' },
    { label: 'Virtual', value: 'Virtual' }
  ];

  estadosEdicion = [
    { label: 'Cancelada', value: 'Cancelada' },
    { label: 'Completada', value: 'Completada' }
  ];

  constructor(
    private appointmentService: AppointmentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadAppointments();

    if(this.patient.Cedula) {
      this.appointment = {} as Appointment;
      this.appointment.cedula = this.patient.Cedula;
      this.openNewAppointment();
    }
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe((data) => {
      this.appointments = data;
    });
  }

  openNewAppointment() {
    this.blockNumeroCita = false;
    this.appointment = { ...this.appointment, estado_cita: 'Programada' }; // Estado siempre será Programada en la creación
    this.submitted = false;
    this.appointmentDialog = true;
  }

  editAppointment(appointment: Appointment) {
    this.blockNumeroCita = true;
    this.appointment = { ...appointment };
    this.appointmentDialog = true;
  }

  deleteAppointment(appointment: Appointment) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar la cita número ' + appointment.numeroCita + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.appointmentService.deleteAppointment(appointment.numeroCita).subscribe((response) => {
          if (response.message === "Cita eliminada con éxito!") {
            this.appointments = this.appointments.filter(val => val.numeroCita !== appointment.numeroCita);
            this.appointment = {} as Appointment;
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cita Eliminada', life: 3000 });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la cita', life: 3000 });
          }
        });
      }
    });
  }

  hideDialog() {
    this.appointmentDialog = false;
    this.submitted = false;
  }

  saveAppointment() {
    this.submitted = true;
    if (this.blockNumeroCita) {
      // Actualizar historia clínica existente
      this.appointmentService.updateAppointment(this.appointment).subscribe(
        (data) => {
          const index = this.appointments.findIndex((hc) => hc.numeroCita === this.appointment.numeroCita);
          this.appointments[index] = this.appointment;
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Historia Clínica Actualizada', life: 3000 });
          this.appointmentDialog = false;
          this.appointment = {} as Appointment;
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la Historia Clínica', life: 3000 });
        }
      );
    } else {
      // Crear nueva historia clínica
      this.appointmentService.createAppointment(this.appointment).subscribe(
        (data) => {
          this.appointments.push(this.appointment);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Historia Clínica Creada', life: 3000 });
          this.appointmentDialog = false;
          this.appointment = {} as Appointment;
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la Historia Clínica', life: 3000 });
        }
      );
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Programada':
        return 'text-success';
      case 'Cancelada':
        return 'text-danger';
      case 'Completada':
        return 'text-primary';
      default:
        return '';
    }
  }
}
