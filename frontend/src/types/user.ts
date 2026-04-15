export interface User {
  id : number;
  center_id : number;
  name : string;
  phone : string;
  email: string;
  role: 'admin' | 'super_admin' | 'EMT' | 'driver' | 'EMT-assistant';
  photo : string | null;
  is_active: boolean;
  blood_type : string;
  join_year : string;
  birthdate : string;
  created_at: string;
  updated_at: string;
}