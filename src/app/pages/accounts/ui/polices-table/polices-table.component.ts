import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe, NgClass, DecimalPipe } from '@angular/common';

export interface Policy {
  id: string;
  line: string;
  eff_date: string;
  exp_date: string;
  status: string;
  expiring_tech: number;
  expiring_premium: number;
  renewal_to_tech: number;
  renewal_tech: number;
  renewal_premium: number;
  rate_change: number;
  loss_ratio: number | null;
  icon_type: string;
  icon_url: string;
}

@Component({
  selector: 'app-polices-table',
  standalone: true,
  imports: [NgClass, CurrencyPipe, DecimalPipe],
  templateUrl: './polices-table.component.html',
  styleUrl: './polices-table.component.scss',
})
export class PolicesTableComponent implements OnInit {
  private http = inject(HttpClient);

  // Стан даних з чітким типом
  policies = signal<Policy[]>([]);
  searchQuery = signal('');

  // Обчислюваний список із безпечною перевіркою значень
  filteredPolicies = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    return this.policies().filter(
      (p) =>
        p.line?.toLowerCase().includes(query) ||
        p.id?.toString().includes(query),
    );
  });

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.http.get<Policy[]>('data/polices.json').subscribe({
      next: (data) => {
        console.log('Дані завантажено:', data);
        this.policies.set(data);
      },
      error: (err) => {
        console.error(
          'Помилка завантаження JSON. Перевірте шлях у папці public та HttpClient у config!',
          err,
        );
      },
    });
  }

  getLossRatioClass(ratio: number | null): string {
    if (ratio === null || ratio === undefined) return 'none';
    if (ratio < 30) return 'low';
    if (ratio <= 60) return 'mid';
    return 'high';
  }
}
