import { Component } from '@angular/core';
import { LocationComponent } from '../location/location.component';

@Component({
  selector: 'app-general-info',
  standalone: true,
  imports: [LocationComponent],
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.scss',
})
export class GeneralInfoComponent {}
