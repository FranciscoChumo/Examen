import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchncPage } from './searchnc.page';

describe('SearchncPage', () => {
  let component: SearchncPage;
  let fixture: ComponentFixture<SearchncPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchncPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
