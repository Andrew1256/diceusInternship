import { Component } from '@angular/core';
import { QuickActionComponent } from './ui/quick-action/quick-action.component';
import { WorkQueueComponent } from './ui/work-queue/work-queue.component';
import { PortfolioGoalsComponent } from './ui/portfolio-goals/portfolio-goals.component';
import { MarketInteligComponent } from './ui/market-intelig/market-intelig.component';
import { TableAccountsComponent } from './ui/table-accounts/table-accounts.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    QuickActionComponent,
    WorkQueueComponent,
    PortfolioGoalsComponent,
    MarketInteligComponent,
    TableAccountsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
