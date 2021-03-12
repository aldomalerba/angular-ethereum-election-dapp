import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EthereumBrowserAlertComponent } from './ethereum-browser-alert.component';

describe('EthereumBrowserAlertComponent', () => {
  let component: EthereumBrowserAlertComponent;
  let fixture: ComponentFixture<EthereumBrowserAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EthereumBrowserAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EthereumBrowserAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
