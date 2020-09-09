import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfWrapperComponent } from './pdf-wrapper.component';

describe('PdfWrapperComponent', () => {
  let component: PdfWrapperComponent;
  let fixture: ComponentFixture<PdfWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
