import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { GisHeatmapComponent } from './gis-heatmap.component';

describe('GisHeatmapComponent', () => {
  let component: GisHeatmapComponent;
  let fixture: ComponentFixture<GisHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GisHeatmapComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GisHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
