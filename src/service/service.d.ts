interface IBaseResponse<T = null> {
  code: 0 | 404;
  data: T;
  msg: string;
}
type TLoginResponse = IBaseResponse<{
  accessToken: string;
  csrf: string;
  refreshToken: string;
}>;
type getProjectData = IBaseResponse<getProjectDatas>;

interface getProjectDatas {
  count: number;
  rows: Row[];
}

interface getRowdata {
  id: number;
  name: string;
  parent_id: number;
  manager_id: number;
  project_template_id: number;
  progress: number;
  cover: string;
  is_recycle: number;
  is_archived: number;
  is_private: number;
  is_auto_progress: number;
  state: number;
  intro: string;
  created_at: string;
  updated_at: string;
  creator: Creator;
  collector: any[];
  member: Member[];
}

interface getMemberData {
  id: number;
  user_id_github: number;
  username: string;
  department_id?: number;
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
  deleted_at?: any;
  user_projects: Userprojects;
}

interface getUserprojectsData {
  id: number;
  user_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
}

interface getCreatorData {
  username: string;
  id: number;
  avatar: string;
}
