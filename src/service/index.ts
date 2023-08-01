import http from "@/utils/http";

// 用户名 | 邮箱
export const isUserExists = async (
  params: { username: string } | { email: string }
) =>
  (
    await http.get<IBaseResponse>("/api/v1/users/exists_user_unique_fields", {
      params,
    })
  ).data.code;

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
  ).data;

//已归档项目
export const getFileProject = async (params: {
  collection: number;
  is_archived: number;
}) =>
  (
    await http.get<getProjectData>("api/v1/projects/list", {
      params,
    })
  ).data;

//回收站
export const getRecyleProject = async (params: {
  collection: number;
  is_recycle: number;
}) =>
  (
    await http.get<getProjectData>("api/v1/projects/list", {
      params,
    })
  ).data;
