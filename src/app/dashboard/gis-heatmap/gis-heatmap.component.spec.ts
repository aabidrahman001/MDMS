import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GisHeatmapComponent } from './gis-heatmap.component';

describe('GisHeatmapComponent', () => {
  let component: GisHeatmapComponent;
  let fixture: ComponentFixture<GisHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GisHeatmapComponent]
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
