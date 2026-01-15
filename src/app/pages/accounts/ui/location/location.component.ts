import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {
  private router = inject(Router);

  private urlSignal = signal<string>(this.router.url);

  constructor() {
    this.router.events
      .pipe(
        filter(
          (e: RouterEvent): e is NavigationEnd => e instanceof NavigationEnd,
        ),
      )
      .subscribe((e) => {
        this.urlSignal.set(e.urlAfterRedirects);
      });
  }

  breadcrumbs = computed(() => {
    const url = this.urlSignal();
    const segments = url
      .split('/')
      .filter((path) => !!path && !path.includes('?'))
      .map((path) => decodeURIComponent(path));

    if (segments.length === 0) return [];

    return segments.map((segment, index) => {
      if (index === 0) {
        return segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
      } else {
        return segment.toLowerCase();
      }
    });
  });
}
