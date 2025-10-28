import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkManagementComponent } from './clerk-management.component';

describe('ClerkManagementComponent', () => {
  let component: ClerkManagementComponent;
  let fixture: ComponentFixture<ClerkManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClerkManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClerkManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
