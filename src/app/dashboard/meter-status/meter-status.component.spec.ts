import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MeterStatusComponent } from './meter-status.component';

describe('MeterStatusComponent', () => {
  let component: MeterStatusComponent;
  let fixture: ComponentFixture<MeterStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeterStatusComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeterStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
