import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-medical-record',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './medical-record.component.html',
  styleUrl: './medical-record.component.scss'
})
export class MedicalRecordComponent {
  @Input() historiaClinica: any;
  historiaForm: FormGroup;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder) {
    this.historiaForm = this.fb.group({
      nombre: [''],
      cedula: [''],
      diagnostico: [''],
      tratamiento: ['']
    });
  }

  ngOnChanges(): void {
    if (this.historiaClinica) {
      this.historiaForm.patchValue(this.historiaClinica);
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    console.log(this.historiaForm.value);
    // Aquí iría la lógica para enviar los datos al backend y guardar los cambios
    this.isEditing = false;
  }
}
