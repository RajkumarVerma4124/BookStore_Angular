import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllbooksComponent } from './allbooks.component';
import { HttpClientModule } from '@angular/common/http';

describe('AllbooksComponent', () => {
  let component: AllbooksComponent;
  let fixture: ComponentFixture<AllbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllbooksComponent ],
      imports: [HttpClientModule]
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
  it('get all books', () => {
    component.getAllbooks()
    expect(component.getAllbooks).toBeTruthy();
  });
});
