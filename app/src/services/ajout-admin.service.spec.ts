import { TestBed } from '@angular/core/testing';
import { AjoutAdminService } from './ajout-admin.service';



describe('AjoutAdminService', () => {
  let service: AjoutAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjoutAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
