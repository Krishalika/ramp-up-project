import { TestBed } from '@angular/core/testing';

import { StudentManagementService } from './student-management.service';

describe('StudentService', () => {
  let service: StudentManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
