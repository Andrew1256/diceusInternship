import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

export interface WorkAccount {
  originator: string;
  client: string;
  line: string;
  type: string;
  status: 'New' | 'Pending Review' | 'Completed';
  created: string;
}

@Component({
  selector: 'app-work-queue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-queue.component.html',
  styleUrl: './work-queue.component.scss',
})
export class WorkQueueComponent implements OnInit {
  private http = inject(HttpClient);
  allAccounts = signal<WorkAccount[]>([]);
  activeTab = signal<string>('Assigned');

  // Реальна кількість для кожної категорії
  countAssigned = computed(
    () => this.allAccounts().filter((item) => item.status === 'New').length,
  );

  countPending = computed(
    () =>
      this.allAccounts().filter((item) => item.status === 'Pending Review')
        .length,
  );

  countReferrals = computed(
    () =>
      this.allAccounts().filter((item) =>
        item.type.toLowerCase().includes('referral'),
      ).length,
  );

  // Фільтрований список для відображення (як ми робили раніше)
  filteredAccounts = computed(() => {
    const data = this.allAccounts();
    switch (this.activeTab()) {
      case 'Pending':
        return data.filter((item) => item.status === 'Pending Review');
      case 'Referrals':
        return data.filter((item) =>
          item.type.toLowerCase().includes('referral'),
        );
      default:
        return data.filter((item) => item.status === 'New');
    }
  });

  getInitials(name: string): string {
    if (!name) return '--';

    const words = name.trim().split(/\s+/);
    if (words.length >= 2) {
      // Беремо перші літери перших двох слів
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    // Якщо ім'я з одного слова, беремо перші дві літери
    return words[0].substring(0, 2).toUpperCase();
  }

  ngOnInit() {
    this.http.get<WorkAccount[]>('/data/workQueue.json').subscribe((data) => {
      this.allAccounts.set(data);
    });
  }
}
