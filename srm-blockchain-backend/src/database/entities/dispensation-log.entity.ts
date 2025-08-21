// src/database/entities/dispensation-log.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Prescription } from './prescription.entity';
import { Pharmacy } from './pharmacy.entity';

@Entity('dispensation_logs')
export class DispensationLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  prescriptionId: string;

  @ManyToOne(() => Prescription)
  @JoinColumn({ name: 'prescriptionId' })
  prescription: Prescription;

  @Column()
  pharmacyId: string;

  @ManyToOne(() => Pharmacy)
  @JoinColumn({ name: 'pharmacyId' })
  pharmacy: Pharmacy;

  @Column('jsonb')
  quantity: Record<string, any>; // Details about what was dispensed

  @CreateDateColumn()
  dispensedAt: Date;

  @Column('text', { nullable: true })
  notes: string;
}
