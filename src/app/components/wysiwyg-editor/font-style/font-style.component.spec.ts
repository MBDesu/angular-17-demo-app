import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontStyleComponent } from './font-style.component';

describe('FontStyleComponent', () => {
  let component: FontStyleComponent;
  let fixture: ComponentFixture<FontStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontStyleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FontStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
