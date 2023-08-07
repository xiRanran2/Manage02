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
//zhouyu数据
type getProListData = IBaseResponse<RootODatabject>;
interface RootODatabject {
  code: number;
  data: Data;
  msg: string;
}

interface DataData {
  count: number;
  rows: Row[];
}

interface RowData {
  id: number;
  remark: string;
  task_id: number;
  project_id: number;
  operator_id: number;
  icon: string;
  content?: string;
  is_comment: number;
  type: string;
  created_at: string;
  updated_at: string;
  operator: Operator;
  task: Task;
}

interface TaskData {
  id: number;
  name: string;
}

interface OperatorData {
  id: number;
  user_id_github: number;
  username: string;
  department_id?: any;
  nickname: string;
  password: string;
  email: string;
  state: number;
  phone: string;
  avatar: string;
  company: string;
  city: string;
  last_login: string;
  created_at: string;
  deleted_at?: any;
}

type AllItem = IBaseResponse<{
  count: number;
  rows: {
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
    creator: {
      username: string;
      id: number;
      avatar: string;
    };
    collector: never[]; // Assuming it's an array of any type
    member: {
      id: number;
      user_id_github: number;
      username: string;
      department_id: number | null;
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
      deleted_at: string | null;
      user_projects: {
        id: number;
        user_id: number;
        project_id: number;
        created_at: string;
        updated_at: string;
      };
    };
  };
}>;
// 路由
type TLayout = IBaseResponse<
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: string;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: string | (() => Promise<any>);
    redirect: string;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  }[]
>;
type ResponseData = ResponseData<{
  username: string;
  email: string;
  avatar: string;
}>;
type ResponseData_1 = ResponseData_1<{
  code: number;
  data: {
    filename: string;
    path: string;
    file_type: string;
    size: string;
    extension: string;
  };
  msg: string;
}>;

type ResponseData_2 = {
  code: number;
  data: {
    count: number;
    rows: {
      id: number;
      name: string;
      color: string;
      icon: string;
      sort: number;
      created_at: string;
      updated_at: string;
    }[];
  };
  msg: string;
};
// 邀请数据开始
interface RootDataObject {
  code: number;
  data: InvitesData;
  msg: string;
}
type TInviteGetData = IBaseResponse<RootDataObject>;
interface InvitesData {
  count: number;
  rows: Rowdatas[];
}

interface Rowdatas {
  id: number;
  actor_id: number;
  receiver_id: number;
  content: string;
  is_read: number;
  type: string;
  url: string;
  created_at: string;
  updated_at: string;
  actor: Actordatas;
}

interface Actordatas {
  username: string;
  id: number;
  avatar: string;
}

//邀请数据结束
