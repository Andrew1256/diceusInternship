import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicesTableComponent } from './polices-table.component';

describe('PolicesTableComponent', () => {
  let component: PolicesTableComponent;
  let fixture: ComponentFixture<PolicesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PolicesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
