import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilPanelComponent } from './profil-panel.component';

describe('ProfilPanelComponent', () => {
  let component: ProfilPanelComponent;
  let fixture: ComponentFixture<ProfilPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
