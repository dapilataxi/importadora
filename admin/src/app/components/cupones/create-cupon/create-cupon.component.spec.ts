import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCuponComponent } from './create-cupon.component';

describe('CreateCuponComponent', () => {
  let component: CreateCuponComponent;
  let fixture: ComponentFixture<CreateCuponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCuponComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCuponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
