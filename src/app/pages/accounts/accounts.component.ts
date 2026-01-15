import { Component } from '@angular/core';
import { GeneralInfoComponent } from './ui/general-info/general-info.component';
import { PerformanceComponent } from './ui/performance/performance.component';
import { PolicesComponent } from './ui/polices/polices.component';
import { StatusComponent } from './ui/status/status.component';
import { CommunicationComponent } from './ui/communication/communication.component';
import { PolicesTableComponent } from './ui/polices-table/polices-table.component';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    GeneralInfoComponent,
    PerformanceComponent,
    PolicesComponent,
    StatusComponent,
    CommunicationComponent,
    PolicesTableComponent,
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent {}
