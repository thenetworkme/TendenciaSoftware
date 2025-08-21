// src/prescriptions/prescriptions.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrescriptionsService {
  create() {
    return 'This action adds a new prescription';
  }

  getPatientHistory(id: string) {
    return `This action returns the history for patient #${id}`;
  }

  validate(id: string) {
    return `This action validates prescription #${id}`;
  }

  dispense(id: string) {
    return `This action dispenses prescription #${id}`;
  }

  getSuspicious() {
    return 'This action returns suspicious patterns';
  }
}
