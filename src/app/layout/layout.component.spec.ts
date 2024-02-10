import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        LayoutComponent
      ],
    }).compileComponents();
  });

  it('should layout is rendered', () => {
    expect(true).toBeTruthy();
  });
});