import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExtensionsComponent } from './edit-extensions.component';

describe('EditExtensionsComponent', () => {
  let component: EditExtensionsComponent;
  let fixture: ComponentFixture<EditExtensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExtensionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExtensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
