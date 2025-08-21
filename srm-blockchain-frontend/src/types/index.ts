export type UserRole = 'doctor' | 'patient' | 'pharmacist' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  profile: {
    name: string;
    lastName: string;
    [key: string]: any;
  };
}

export interface Prescription {
  id: string;
  // Add all prescription fields
}
