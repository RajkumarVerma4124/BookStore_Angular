import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllbooksComponent } from './allbooks.component';

fdescribe('AllbooksComponent', () => {
  let component: AllbooksComponent;
  let fixture: ComponentFixture<AllbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllbooksComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
