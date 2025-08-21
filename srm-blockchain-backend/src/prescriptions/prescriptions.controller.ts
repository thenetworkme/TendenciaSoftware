// src/prescriptions/prescriptions.controller.ts
import { Controller, Post, Get, Put, Param, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PrescriptionsService } from './prescriptions.service';

@ApiBearerAuth()
@ApiTags('prescriptions')
@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new prescription (Doctors only)' })
  @ApiResponse({
    status: 201,
    description: 'The prescription has been successfully created.',
  })
  create() {
    // TODO: Implement DTO and user role guard
    return this.prescriptionsService.create();
  }

  @Get('patient/:id')
  @ApiOperation({ summary: "Get a patient's prescription history" })
  getPatientHistory(@Param('id') id: string) {
    return this.prescriptionsService.getPatientHistory(id);
  }

  @Get(':id/validate')
  @ApiOperation({ summary: 'Validate a prescription (Pharmacists only)' })
  validate(@Param('id') id: string) {
    // TODO: Implement user role guard
    return this.prescriptionsService.validate(id);
  }

  @Put(':id/dispense')
  @ApiOperation({
    summary: 'Mark a prescription as dispensed (Pharmacists only)',
  })
  dispense(@Param('id') id: string) {
    // TODO: Implement DTO and user role guard
    return this.prescriptionsService.dispense(id);
  }

  @Get('suspicious')
  @ApiOperation({
    summary: 'Get suspicious prescription patterns (Admin/Analytics only)',
  })
  getSuspicious() {
    // TODO: Implement user role guard
    return this.prescriptionsService.getSuspicious();
  }
}
