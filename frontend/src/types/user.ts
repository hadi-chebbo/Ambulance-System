export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'dispatcher' | 'paramedic' | 'driver';
  isActive: boolean;
  createdAt: string;
}