import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListPaginationComponent } from './contact-list-pagination.component';

describe('ContactListPaginationComponent', () => {
  let component: ContactListPaginationComponent;
  let fixture: ComponentFixture<ContactListPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactListPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
