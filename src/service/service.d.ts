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
//ZhouYu数据开始

//新手引导开始
type getFreshManIntroduceData = IBaseResponse<GetDataData>;
interface GetDataRootObject {
  code: number;
  data: Data;
  msg: string;
}

interface GetDataData {
  count: number;
  rows: Row[];
}

interface GetDataRow {
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
  collector: unknown[];
  member: Member[];
}

interface GetDataMember {
  id: number;
  user_id_github: number;
  username: string;
  department_id?: null | number | number;
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
  deleted_at?: unknown;
  user_projects: Userprojects;
}

interface GetDataUserprojects {
  id: number;
  user_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
}

interface GetDataCreator {
  username: string;
  id: number;
  avatar: string;
}
//新手引导结束

//菜单右侧人物数据开始
type getCharacterDataDetails = IBaseResponse<Row>;
interface RootObject {
  code: number;
  data: Data;
  msg: string;
}

interface Data {
  count: number;
  rows: Row[];
}

interface Row {
  id: number;
  user_id_github: number;
  username: string;
  department_id?: unknown;
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
  projects: Project[];
  roles: Role[];
  department?: unknown;
}

interface Role {
  id: number;
  name: string;
  user_roles: Userroles;
}

interface Userroles {
  id: number;
  user_id: number;
  role_id: number;
  created_at: string;
  updated_at: string;
}

interface Project {
  id: number;
  user_projects: Userprojects;
}

interface Userprojects {
  id: number;
  user_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
}
//菜单右侧人物数据结束

// tab栏文文件开始
type getFiletData = IBaseResponse<Row>;
interface RootObject {
  code: number;
  data: Data;
  msg: string;
}

interface Data {
  count: number;
  rows: Row[];
}

interface Row {
  id: number;
  title: string;
  project_id: number;
  task_id?: any;
  creator_id: number;
  filename: string;
  path: string;
  extension: string;
  file_type: string;
  size: number;
  downloads: number;
  is_recycle: number;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
}
// tab栏文文件结束

// tab栏 概括开始
type getSummarizeRequestData = IBaseResponse<Data>;
interface RootObject {
  code: number;
  data: Data;
  msg: string;
}

interface Data {
  count: number;
  rows: Row[];
}

interface Row {
  [x: string]: unknown;
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

interface Task {
  id: number;
  name: string;
}

interface Operator {
  id: number;
  user_id_github: number;
  username: string;
  department_id?: unknown;
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
  deleted_at?: unknown;
}
// 概括结束

//概括统计部分开始
type getSummarizetData = IBaseResponse<Data>;
interface RootObject {
  code: number;
  data: Data;
  msg: string;
}

interface Data {
  taskCount: number;
  done: number;
  undone: number;
  overdue: number;
  unreceived: number;
  dueToday: number;
  completedOverdue: number;
  taskPriority: TaskPriority;
  taskState: TaskState;
  taskType: TaskType;
}

interface TaskType {
  "2": number;
}

interface TaskState {
  "2": number;
  "4": number;
  "6": number;
}

interface TaskPriority {
  "2": number;
  "4": number;
  "5": number;
}
//概括统计部分结束

//ZhouYu数据结束
//CaiZhi数据开始
//
interface RootObjectdata {
  code: number;
  data: Data;
  msg: string;
}

type Novicepage = RootObjectdata<Novicepages>;

interface Novicepages {
  count: number;
  rows: Row[];
}

interface Row {
  id: number;
  name: string;
  creator_id: number;
  project_id: number;
  parent_id: number;
  task_list_id: number;
  task_state_id: number;
  task_type_id: number;
  task_priority_id: number;
  executor_id: number;
  start_date: string;
  end_date: string;
  remark?: string;
  is_done: number;
  is_privacy: number;
  is_recycle: number;
  likes: number;
  plan_work_hours: number;
  sort: number;
  created_at: string;
  updated_at: string;
  task_tags: any[];
  executor?: Executor;
  participators: Executor[];
  project: Project;
  likers: any[];
}

interface Project {
  id: number;
  name: string;
  member: Member[];
}

interface Member {
  id: number;
  username: string;
}

interface Executor {
  username: string;
  id: number;
  avatar: string;
}

//
interface RootObject {
  code: number;
  data: Data;
  msg: string;
}

type foos = RootObject<foo>;

interface foo {
  count: number;
  rows: Row[];
}

interface Row {
  id: number;
  name: string;
  project_id: number;
  sort: number;
  created_at: string;
  updated_at: string;
}

type IgetData = IRootObject<IRootObject>;
interface IRootObject {
  code: number;
  data: Data;
  msg: string;
}

interface Data {
  count: number;
  rows: Row[];
}

interface Row {
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

interface Member {
  id: number;
  user_id_github: number;
  username: string;
  department_id?: null | number | number;
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

interface Userprojects {
  id: number;
  user_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
}

interface Creator {
  username: string;
  id: number;
  avatar: string;
}

//id值
type Novicepages = RootObject<RootObject>;

interface RootObject {
  code: number;
  data: Data;
  msg: string;
}

interface Data {
  id: number;
  name: string;
  creator_id: number;
  project_id: number;
  parent_id: number;
  task_list_id: number;
  task_state_id: number;
  task_type_id: number;
  task_priority_id: number;
  executor_id: number;
  start_date: string;
  end_date: string;
  remark: string;
  is_done: number;
  is_privacy: number;
  is_recycle: number;
  likes: number;
  plan_work_hours: number;
  sort: number;
  created_at: string;
  updated_at: string;
  task_tags: any[];
  participators: Participator[];
  project: Project;
  likers: any[];
}

interface Project {
  id: number;
  name: string;
  member: Member[];
}

interface Member {
  id: number;
  username: string;
  user_projects: Userprojects;
}

interface Userprojects {
  id: number;
  user_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
}

interface Participator {
  id: number;
  username: string;
  avatar: string;
  user_tasks: Usertasks;
}

interface Usertasks {
  id: number;
  user_id: number;
  task_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
}
type zhipai = IBaseResponse<IsRootObject>;
interface IsRootObject {
  code: number;
  data: Data;
  msg: string;
}

interface Data {
  id: number;
  name: string;
  creator_id: number;
  project_id: number;
  parent_id: number;
  task_list_id: number;
  task_state_id: number;
  task_type_id: number;
  task_priority_id: number;
  executor_id: number;
  start_date: string;
  end_date: string;
  remark: string;
  is_done: number;
  is_privacy: number;
  is_recycle: number;
  likes: number;
  plan_work_hours: number;
  sort: number;
  created_at: string;
  updated_at: string;
  task_tags: any[];
  participators: Participator[];
  project: Project;
  likers: any[];
}

interface Project {
  id: number;
  name: string;
  member: Member[];
}

interface Member {
  id: number;
  username: string;
  user_projects: Userprojects;
}

interface Userprojects {
  id: number;
  user_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
}

interface Participator {
  id: number;
  username: string;
  avatar: string;
  user_tasks: Usertasks;
}

interface Usertasks {
  id: number;
  user_id: number;
  task_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
}
//CaiZhi数据结束
