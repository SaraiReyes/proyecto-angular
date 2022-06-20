import { TestBed } from '@angular/core/testing';

import { ConexionFirestoreService } from './conexion-firestore.service';

describe('ConexionFirestoreService', () => {
  let service: ConexionFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexionFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
