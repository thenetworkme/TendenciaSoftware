// src/database/entities/medication.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('medications')
export class Medication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  activeIngredient: string;

  @Column()
  dosage: string; // e.g., "500mg", "10ml"

  @Column()
  form: string; // e.g., "tablet", "syrup"

  @Column({ default: false })
  isControlled: boolean;

  @Index()
  @Column({ nullable: true })
  atcCode: string;

  @Column({ type: 'jsonb', nullable: true })
  contraindications: string[];

  @Column({ nullable: true })
  maxDailyDose: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
