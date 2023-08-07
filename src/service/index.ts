import http from "@/utils/http";

//获取menu
//获取头部的用户信息
export const getMenuData = async () =>
  (await http.get<IBaseResponse<getMemberData>>("/api/v1/menus/user_menus"))
    .data;
// 用户名 | 邮箱
export const isUserExists = async (
  params: { username: string } | { email: string }
) =>
  (
    await http.get<IBaseResponse>("/api/v1/users/exists_user_unique_fields", {
      params,
    })
  ).data.code;

//获取头部导航栏
// export const Nav
export const register = async (data: {
  avatar: string;
  code: string;
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
  verification_type: 1;
}) => (await http.post("/api/v1/users", data)).data.code;
// 发送验证码
export const sendVerificationCodes = async (data: {
  target: string;
  type: 1;
}) =>
  (await http.post<IBaseResponse>("/api/v1/verification_codes", data)).data
    .code;

// 重置密码
export const resetPassword = async (data: {
  email: string;
  code: string;
  password: string;
  passwordConfirm: string;
}) => (await http.put<IBaseResponse>("/api/v1/users/password", data)).data.code;

// 注册账号
export const registeredAccount = async (data: {
  email: string;
  code: string;
  username: string;
  password: string;
  passwordConfirm: string;
  avatar: string;
  verification_type: number;
}) => (await http.post<IBaseResponse>("/api/v1/users", data)).data.code;

// 登录账号
export const isUsersLogin = async (data: {
  password: string;
  username: string;
}) => (await http.post<IBaseResponse>("/api/v1/users/login", data)).data.code;

//获取头部的用户信息
export const getUserInfoData = async () =>
  (await http.get<IBaseResponse<getMemberData>>("api/v1/users/user_info")).data
    .data;
// 首页导航项目请求数据
export const getProjectsData = async (params: {
  collection: number;
  is_recycle: number;
}) =>
  (
    await http.get<getProjectData>("api/v1/projects/list", {
      params,
    })
  ).data.data.rows;

//已归档项目
export const getFileProject = async (params: {
  collection: number;
  is_archived: number;
}) =>
  (
    await http.get<getProjectData>("api/v1/projects/list", {
      params,
    })
  ).data.data.rows;

//回收站
export const getRecyleProject = async (params: {
  collection: number;
  is_recycle: number;
}) =>
  (
    await http.get<getProjectData>("api/v1/projects/list", {
      params,
    })
  ).data.data.rows;

//收藏
export const getCollectionProject = async (params: {
  collection: number;
  is_recycle: number;
}) =>
  (
    await http.get<getProjectData>("api/v1/projects/list", {
      params,
    })
  ).data.data;

//获取模板信息
export const getTemplateData = async (params: {
  is_custom: number;
  limit: number;
  offset: number;
}) =>
  (
    await http.get<getProjectData>("/api/v1/project_templates/list", {
      params,
    })
  ).data.data.rows;

//消息提醒
export const getMessageMention = async (params: {
  is_custom: number;
  limit: number;
  offset: number;
}) =>
  (
    await http.get<getProjectData>("/api/v1/project_templates/list", {
      params,
    })
  ).data.data.rows;

//路由
export const GetUserMenus = async () =>
  (await http.get<TLayout>("/api/v1/menus/user_menus")).data.data;

//上传图片
export const upLoadFileRecord = async (fd: FormData) =>
  await http.post<IBaseResponse<ResponseData_1>>("/api/va/uploads", fd, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const Task = async (params: { prop_order: "sort"; order: "desc" }) =>
  (
    await http.get<ResponseData_2>("/api/v1/task_types/list?prop_order", {
      params,
    })
  ).data.data.rows;
//用户
export const User = async () =>
  (await http.get<ResponseData>("/api/v1/users/user_info")).data.data;
// 私信
export const getPersonalMessage = async (params: {
  prop_order: string;
  order: string;
  pageNo: number;
  pageSize: number;
  keyword: unknown;
  type: string;
  receiver_id: number;
  limit: number;
  offset: number;
}) =>
  (
    await http.get<getProjectData>("/api/v1/messages/list", {
      params,
    })
  ).data.data;

// 通知
export const getInformMessage = async (params: {
  prop_order: string;
  order: string;
  pageNo: number;
  pageSize: number;
  keyword: unknown;
  type: string;
  receiver_id: number;
  limit: number;
  offset: number;
}) =>
  (
    await http.get<getProjectData>("/api/v1/messages/list", {
      params,
    })
  ).data.data;

//添加项目模板的数据  产品进展
export const AddProjectTemplate = async (params: {
  limit: number;
  offset: number;
}) =>
  (
    await http.get<getProjectData>("/api/v1/project_templates/list", {
      params,
    })
  ).data.data.rows;

//邀请的请求
//添加项目模板的数据  产品进展  需要传的参数
export const FetchInviteData = async (params: { uuid: string }) =>
  (
    await http.get<getProjectData>("/api/v1/invites/uuid", {
      params,
    })
  ).data;
