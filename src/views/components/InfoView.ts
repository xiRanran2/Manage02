interface RootObject {
  code: number;
  data: Data;
  msg: string;
}

interface Data {
  id: number;
  user_id_github: number;
  username: string;
  department_id?: any;
  nickname: string;
  email: string;
  state: number;
  phone: string;
  avatar: string;
  company: string;
  city: string;
  last_login: string;
  created_at: string;
  updated_at: string;
  roles: Role[];
  permissions: string[];
}

interface Role {
  id: number;
  name: string;
  is_default: number;
  created_at: string;
  updated_at: string;
  user_roles: Userroles;
  permissions: Permission[];
}

interface Permission {
  id: number;
  url: string;
  action: string;
  role_permissions: Rolepermissions;
}

interface Rolepermissions {
  id: number;
  role_id: number;
  permission_id: number;
  created_at: string;
  updated_at: string;
}

interface Userroles {
  id: number;
  user_id: number;
  role_id: number;
  created_at: string;
  updated_at: string;
}
