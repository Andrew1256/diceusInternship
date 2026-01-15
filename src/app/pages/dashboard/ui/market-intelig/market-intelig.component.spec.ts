import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketInteligComponent } from './market-intelig.component';

describe('MarketInteligComponent', () => {
  let component: MarketInteligComponent;
  let fixture: ComponentFixture<MarketInteligComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketInteligComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MarketInteligComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
