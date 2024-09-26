import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HistoriaClinicaService, HistoriaClinica } from '../historia-clinica.service';
@Component({
  selector: 'app-list-medical-record',
  standalone: true,
  imports: [],
  templateUrl: './list-medical-record.component.html',
  styleUrl: './list-medical-record.component.scss'
})
export class ListMedicalRecordComponent implements OnInit {
  historiasClinicas: HistoriaClinica[] = [];

  constructor(private historiaClinicaService: HistoriaClinicaService) { }

  ngOnInit(): void {
    this.historiaClinicaService.getHistoriasClinicas().subscribe(data => {
      this.historiasClinicas = data;
    });
  }
}
