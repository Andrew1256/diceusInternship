import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  inject, // Імпортуємо inject
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  standalone: true,
  styleUrls: ['./navigation.component.scss'],
  imports: [RouterLink, RouterLinkActive],
})
export class NavigationComponent implements AfterViewInit {
  @ViewChild('navScroll') navScroll!: ElementRef;

  isOverflowing = false;

  private readonly cdr = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    setTimeout(() => this.checkOverflow(), 150);
  }

  checkOverflow(): void {
    if (this.navScroll) {
      const el = this.navScroll.nativeElement;
      // Використовуємо Math.ceil, бо дробові пікселі ламають порівняння
      const hasOverflow =
        el.scrollWidth > Math.ceil(el.getBoundingClientRect().width);

      if (this.isOverflowing !== hasOverflow) {
        this.isOverflowing = hasOverflow;
        this.cdr.detectChanges(); // cdr тепер доступний через inject
      }
    }
  }

  scroll(amount: number): void {
    const el = this.navScroll.nativeElement;
    const start = el.scrollLeft;
    const duration = 400;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const ease = progress * (2 - progress);

      el.scrollLeft = start + amount * ease;

      if (timeElapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}
