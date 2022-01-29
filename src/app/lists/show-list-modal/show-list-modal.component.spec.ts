import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListModalComponent } from './show-list-modal.component';

describe('ShowListModalComponent', () => {
  let component: ShowListModalComponent;
  let fixture: ComponentFixture<ShowListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
