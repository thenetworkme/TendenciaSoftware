// src/database/entities/prescription.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Pharmacy } from './pharmacy.entity';

export enum PrescriptionStatus {
  ISSUED = 'issued',
  DISPENSED = 'dispensed',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

@Entity('prescriptions')
export class Prescription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  doctorId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'doctorId' })
  doctor: User;

  @Column()
  patientId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'patientId' })
  patient: User;

  @Column({ type: 'jsonb' })
  medications: Record<string, any>[]; // Simplified for now

  @Column({
    type: 'enum',
    enum: PrescriptionStatus,
    default: PrescriptionStatus.ISSUED,
  })
  status: PrescriptionStatus;

  @Column({ unique: true, nullable: true })
  blockchainHash: string;

  @Column({ type: 'text' })
  digitalSignature: string;

  @CreateDateColumn()
  issuedAt: Date;

  @Column()
  expiresAt: Date;

  @Column({ nullable: true })
  dispensedAt?: Date;

  @Column({ nullable: true })
  pharmacyId?: string;

  @ManyToOne(() => Pharmacy, { nullable: true })
  @JoinColumn({ name: 'pharmacyId' })
  pharmacy?: Pharmacy;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
