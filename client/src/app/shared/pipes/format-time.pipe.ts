import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
  standalone: true
})
export class FormatTimePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    // Aquí asumimos que el valor viene en formato "HH:mm:ss"
    const [hours, minutes] = value.split(':');

    // Formatear la hora en un formato más amigable (HH:mm)
    const formattedTime = `${hours}:${minutes}`;

    return formattedTime;
  }
}
