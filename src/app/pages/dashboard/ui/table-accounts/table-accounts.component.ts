import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Account {
  account_name: string;
  type: string;
  line: string;
  broker: string;
  renewal_date: string;
  premium: string;
  rated_premium: string;
  loss_ratio: string;
  appetite: string;
  status: string;
  triage: number;
  winnability: string;
}

@Component({
  selector: 'app-table-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-accounts.component.html',
  styleUrl: './table-accounts.component.scss',
})
export class TableAccountsComponent implements OnInit {
  private http = inject(HttpClient);
  accounts: Account[] = [];

  ngOnInit() {
    this.http.get<Account[]>('/data/myAccounts.json').subscribe((data) => {
      this.accounts = data;
      console.log(data);
    });
  }
}
