import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvProgramsComponent } from './tv-programs.component';

describe('TvProgramsComponent', () => {
  let component: TvProgramsComponent;
  let fixture: ComponentFixture<TvProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvProgramsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
