<template>
  <div class="bg-[#f7f7f7] relative">
    <!-- 导航栏 -->

    <Head />

    <!-- 头部 -->
    <div
      class="h-[42px] flex items-center justify-between w-[96%] left-[22px] bg-[#fff] absolute top-[88px]"
    >
      <div class="pl-[12px] cursor-pointer w-[240px] truncate text-left">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{ getsect(selectedOptionName)?.name
            }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-input
              v-model="Search"
              class="p-[10px]"
              size="large"
              placeholder="搜索"
            />
            <Icon
              class="absolute top-[24px] left-[11px] text-[16px]"
              icon="iconamoon:search-thin"
              color="#ccc"
            />
            <el-dropdown-menu
              v-if="Search.length < 1"
              class="w-[272px] !h-[500px]"
            >
              <el-scrollbar :always="true" class="projectmenu">
                <el-dropdown-item
                  v-for="item in getDSelectata"
                  :key="item.id"
                  class="!h-[60px] box-border flex justify-between"
                  @click="handleDropdownItemClick(item.id)"
                >
                  <div class="w-[220px] flex items-center overflow-hidden">
                    <img
                      class="w-[32px] h-[32px] rounded-[50%]"
                      :src="`http://192.168.122.36:1024/${item.cover}`"
                      alt=""
                    />
                    <div class="!w-[140px] ml-[10px] overflow-hidden">
                      {{ item.name }}
                    </div>
                  </div>
                  <Icon
                    v-if="item.id == selectedOptionid"
                    icon="basil:check-outline"
                    class="text-[26px]"
                  />
                </el-dropdown-item>
              </el-scrollbar>
            </el-dropdown-menu>

            <el-dropdown-menu v-else class="w-[272px] !max-h-[500px]">
              <el-scrollbar :always="true">
                <el-dropdown-item
                  v-for="item in SerarchData"
                  :key="item.id"
                  class="!h-[60px] box-border"
                  @click="handleDropdownItemClick(item.id)"
                >
                  <div class="w-[220px] flex items-center overflow-hidden">
                    <img
                      class="w-[32px] h-[32px] rounded-[50%]"
                      :src="`http://192.168.122.36:1024/${item.cover}`"
                      alt=""
                    />
                    <div class="ml-[10px]">{{ item.name }}</div>
                  </div>
                </el-dropdown-item>
              </el-scrollbar>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="cursor-pointer flex items-center">
        <el-tabs
          v-model="activeName"
          style="border: none"
          class="demo-tabs task"
          @tab-click="handleClick"
        >
          <el-tab-pane label="任务" name="TaskView"></el-tab-pane>
          <el-tab-pane label="文件" name="FileView"></el-tab-pane>
          <el-tab-pane label="概览" name="OverView"></el-tab-pane>
          <el-tab-pane label="版本" name="VersionView"></el-tab-pane>
          <el-tab-pane label="日程" name="ScheduleView"></el-tab-pane>
        </el-tabs>
      </div>
      <div
        class="pr-[12px] text-[14px] cursor-pointer text-[#606266] flex items-center"
      >
        <div class="flex items-center pl-[5px]">
          <Icon icon="iconoir:book" color="#ccc" /><span>看板视图</span>
        </div>
        <div class="flex items-center pl-[5px]">
          <a-dropdown class="flex items-center" :trigger="['click']">
            <a class="ant-dropdown-link text-[14px] text-[#409eff]">
              <Icon icon="ep:search" color="#409eff" />筛选
            </a>
            <template #overlay>
              <a-menu>
                <ul class="w-[270px] text-[14px]">
                  <li class="flex items-center justify-around mt-[10px]">
                    <span class="w-[100px] text-center pl-[10px]">标题</span>
                    <a-input
                      class="border-[1.5px] w-[90%] mr-[11px] h-[32px] border-[#d3d3d3]"
                      placeholder="搜索任务标题"
                    />
                  </li>
                  <li class="flex items-center justify-around mt-[16px]">
                    <span class="w-[100px] text-center pl-[10px]">执行者</span>
                    <a-input-group compact>
                      <a-select v-model:value="valueH" style="width: 96%">
                        <a-select-option value="jjy">jjy</a-select-option>
                        <a-select-option value="zjl">zjl</a-select-option>
                      </a-select>
                    </a-input-group>
                  </li>
                  <li class="flex items-center justify-around mt-[16px]">
                    <span class="w-[100px] text-center pl-[10px]">创建者</span>
                    <a-input-group compact>
                      <a-select v-model:value="valueE" style="width: 96%">
                        <a-select-option value="jjy">jjy</a-select-option>
                        <a-select-option value="zjl">zjl</a-select-option>
                      </a-select>
                    </a-input-group>
                  </li>
                  <li class="flex items-center justify-around mt-[16px]">
                    <span class="w-[100px] text-center pl-[10px]"
                      >是否完成</span
                    >
                    <a-input-group compact>
                      <a-select v-model:value="valueR" style="width: 96%">
                        <a-select-option value="全部">全部</a-select-option>
                        <a-select-option value="是">是</a-select-option>
                        <a-select-option value="否">否</a-select-option>
                      </a-select>
                    </a-input-group>
                  </li>
                  <li class="flex items-center justify-around mt-[16px]">
                    <span class="w-[100px] text-center pl-[10px]">优先级</span>
                    <a-input-group compact>
                      <a-select v-model:value="valueD" style="width: 96%">
                        <a-select-option value="普通">普通</a-select-option>
                        <a-select-option value="紧急">紧急</a-select-option>
                        <a-select-option value="非常紧急"
                          >非常紧急</a-select-option
                        >
                      </a-select>
                    </a-input-group>
                  </li>
                  <li class="flex items-center justify-around mt-[16px]">
                    <span class="w-[100px] text-center pl-[10px]">优先级</span>
                    <a-input-group compact>
                      <a-select v-model:value="valueW" style="width: 96%">
                        <a-select-option value="待办的">待办的</a-select-option>
                        <a-select-option value="已确认">已确认</a-select-option>
                        <a-select-option value="修复中">修复中</a-select-option>
                        <a-select-option value="已完成">已完成</a-select-option>
                        <a-select-option value="已验收">已验收</a-select-option>
                        <a-select-option value="已取消">已取消</a-select-option>
                      </a-select>
                    </a-input-group>
                  </li>
                  <li
                    class="flex items-center justify-around mt-[20px] mb-[10px]"
                  >
                    <a-space wrap>
                      <a-button class="bg-[#e5e7e9] text-[#070707]"
                        >搜索</a-button
                      >
                      <a-button class="text-[#000]">重置</a-button>
                    </a-space>
                  </li>
                </ul>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <div class="">
          <div
            text
            @click="dialogVisible = true"
            class="flex items-center pl-[5px]"
          >
            <Icon icon="ic:outline-person" color="#409eff" />
            <span class="text-[#409eff]">{{ getCharact?.length }}</span>
          </div>
          <el-dialog
            v-model="dialogVisible"
            title="项目成员"
            width="33%"
            class="text-left"
          >
            <a-input
              class="border-[1.5px] w-[100%] h-[36px] mb-[8px] border-[#d3d3d3]"
              placeholder="请输入用户名或邮箱查找"
            />
            <hr />
            <div
              v-for="item in getCharact"
              :key="item.id"
              class="h-[60px] flex items-center justify-between mt-[10px]"
            >
              <div class="flex items-center">
                <div>
                  <img
                    class="w-[36px] h-[36px] rounded-[8px]"
                    :src="item.avatar"
                    alt=""
                  />
                </div>
                <div class="ml-[16px] flex flex-col">
                  <span>{{ item.username }}</span>
                  <span class="mt-[8px]">{{ item.email }}</span>
                </div>
              </div>
              <div class="flex">
                <Icon class="mr-[10px]" icon="game-icons:character" />
                <span>已加入</span>
              </div>
            </div>
          </el-dialog>
        </div>
        <div>
          <a-dropdown :trigger="['click']" class="flex items-center">
            <a class="ant-dropdown-link w-[50px]" @click.prevent>
              <Icon
                icon="eva:menu-2-outline"
                color="#409eff"
                :rotate="2"
              /><span class="text-[#409eff]">菜单</span>
            </a>
            <template #overlay>
              <a-menu class="text-[#727375 set">
                <a-menu-item key="0">
                  <div class="flex items-center">
                    <Icon icon="ic:sharp-settings" color="#727375" />
                    <span class="ml-[18px]" @click="showModalB">项目设置</span>
                    <!-- 项目设置蒙版 -->
                    <div>
                      <a-modal
                        v-model:open="openB"
                        :footer="null"
                        width="660px"
                        title="项目设置"
                        @ok="handleOkB"
                      >
                        <div class="h-[620px] overflow-hidden mt-[16px]">
                          <a-tabs
                            v-model:activeKey="activeKeyTab"
                            :tab-position="mode"
                            :style="{ height: '160px' }"
                            @tabScroll="callback"
                          >
                            <a-tab-pane key="1" tab="概览">
                              <div>
                                <form action="">
                                  <div class="text-[#606266] text-[14px]">
                                    <div class="pb-[10px]">项目封面</div>
                                    <div
                                      class="w-[290px] h-[160px] rounded-[3px]"
                                    >
                                      <img
                                        :src="`http://192.168.122.36:1024/${
                                          getsect(selectedOptionName).cover
                                        }`"
                                        alt=""
                                        class="w-[290px] h-[160px] rounded-[3px]"
                                      />
                                    </div>
                                  </div>
                                  <div
                                    class="flex text-[14px] justify-between mt-[20px]"
                                  >
                                    <div class="w-[220px] h-[56px] mb-[10px]">
                                      <div class="flex">
                                        <div class="text-[red]">*</div>
                                        <div class="pb-[5px]">项目名称</div>
                                      </div>
                                      <div>
                                        <a-input
                                          type="text"
                                          :value="
                                            getsect(selectedOptionName).name
                                          "
                                          disabled
                                          class="bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed h-[28px] pl-[10px] w-[100%]"
                                        />
                                      </div>
                                    </div>
                                    <div class="w-[220px] h-[56px] mb-[10px]">
                                      <div class="flex">
                                        <div class="text-[red]">*</div>
                                        <div class="pb-[5px]">项目进度(%)</div>
                                      </div>
                                      <div>
                                        <a-input
                                          type="text"
                                          placeholder="0"
                                          disabled
                                          class="bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed h-[28px] pl-[10px] w-[100%]"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div class="w-[100%] text-[14px] mb-[18px]">
                                    <div class="pb-[5px]">项目介绍</div>
                                    <div>
                                      <a-textarea
                                        name=""
                                        id=""
                                        disabled
                                        :value="
                                          getsect(selectedOptionName).intro
                                        "
                                        class="w-[100%] h-[60px] bg-[#F5F7FA] border-[#E4E7ED] px-[15px] py-[5px] text-[10px] rounded-[5px]"
                                      ></a-textarea>
                                    </div>
                                  </div>
                                  <div class="w-[100%] h-[56px] mb-[18px]">
                                    <div class="pb-[5px]">项目公开性</div>
                                    <div class="relative">
                                      <a-input
                                        type="text"
                                        disabled
                                        placeholder="公开项目（所有人都可通过链接访问，仅项目成员可编辑）"
                                        class="w-[100%] h-[28px] rounded-[5px] bg-[#F5F7FA] border-[#E4E7ED] text-[#C0C4CC] text-[10px] pl-[10px]"
                                      />
                                      <span
                                        class="absolute right-0 top-0 h-[28px] text-[#ccc] flex items-center"
                                        ><Icon
                                          icon="formkit:right"
                                          width="17"
                                          :rotate="1"
                                      /></span>
                                    </div>
                                  </div>
                                  <div class="w-[100%] text-[14px] mb-[18px]">
                                    <div class="pb-[10px]">项目拥有者</div>
                                    <div
                                      class="w-[100%] h-[40px] flex items-center"
                                    >
                                      <div class="rounded-[50%]">
                                        <img
                                          class="w-[40px] h-[40px] rounded-[50%]"
                                          :src="getCharact[0].avatar"
                                          alt=""
                                        />
                                      </div>
                                      <p class="pl-[10px]">
                                        {{ getCharact[0].username }}
                                      </p>
                                    </div>
                                  </div>
                                </form>
                                <div class="flex justify-end">
                                  <button
                                    class="w-[73px] h-[40px] bg-[#a0cfff] border-[#a0cfff] rounded-[5px] text-[#fff]"
                                  >
                                    确定
                                  </button>
                                </div>
                              </div>
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="项目偏好">
                              <div class="text-[14px] text-[#606266]">
                                <div
                                  class="flex justify-between items-center mb-[8px]"
                                >
                                  <p>自动更新项目进度</p>
                                  <a-switch
                                    class="bg-[#ccc]"
                                    v-model:checked="checked"
                                    disabled
                                  />
                                </div>
                                <div>
                                  根据当前任务的完成情况自动计算项目进度
                                </div>
                              </div>
                            </a-tab-pane>
                            <a-tab-pane key="3" tab="更多">
                              <div class="text-[14px]">
                                <div
                                  class="text-[16px] font-semibold leading-[30px] h-[30px]"
                                >
                                  项目操作
                                </div>
                                <div
                                  class="h-[30px] leading-[30px] text-[#ccc]"
                                >
                                  您可以执行以下操作
                                </div>
                                <div
                                  class="flex justify-between w-[260px] h-[40px] mt-[20px]"
                                >
                                  <button
                                    class="w-[97.6px] h-[39.6px] text-[#f9a7a7] bg-[#fef0f0] border-[#fde2e2] rounded-[5px]"
                                  >
                                    <span>归档项目</span>
                                  </button>
                                  <button
                                    class="w-[69.6px] h-[39.6px] text-[#f9a7a7] bg-[#fef0f0] border-[#fde2e2] rounded-[5px] ml-[10px]"
                                  >
                                    <span>退出</span>
                                  </button>
                                  <button
                                    class="w-[111.6px] h-[39.6px] text-[#fff] bg-[#fab6b6] border-[#fab6b6] rounded-[5px] ml-[10px]"
                                  >
                                    <span>移至回收站</span>
                                  </button>
                                </div>
                              </div>
                            </a-tab-pane>
                          </a-tabs>
                        </div>
                      </a-modal>
                    </div>
                  </div>
                </a-menu-item>
                <a-menu-item key="1">
                  <div class="flex items-center">
                    <Icon
                      icon="ps:label"
                      color="#727375"
                      width="15"
                      height="15"
                    />
                    <span class="ml-[18px]">标签*</span>
                  </div>
                </a-menu-item>
                <a-menu-item key="2">
                  <div class="flex items-center">
                    <Icon icon="ph:trash-light" color="#727375" />
                    <span class="ml-[18px]" @click="showModalE"
                      >查看回收站</span
                    >
                    <div>
                      <a-modal
                        v-model:open="openE"
                        :footer="null"
                        width="720px"
                        title="查看回收站"
                        @ok="handleOkE"
                      >
                        <hr />
                        <div class="h-[500px] overflow-hidden mt-[12px]">
                          <a-tabs
                            v-model:activeKey="activeKeyTab"
                            :tab-position="mode"
                            :style="{ height: '700px' }"
                            @tabScroll="callback"
                          >
                            <a-tab-pane key="1" tab="任务">
                              <div
                                class="h-[400px] flex items-center justify-center flex-col"
                              >
                                <Icon
                                  icon="clarity:file-group-line"
                                  color="#6eb0f3"
                                  width="50"
                                  height="50"
                                />
                                <p>空空如也...</p>
                              </div>
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="文件">
                              <div
                                class="h-[400px] flex items-center justify-center flex-col"
                              >
                                <Icon
                                  icon="clarity:file-group-line"
                                  color="#6eb0f3"
                                  width="50"
                                  height="50"
                                />
                                <p>空空如也...</p>
                              </div>
                            </a-tab-pane>
                          </a-tabs>
                        </div>
                      </a-modal>
                    </div>
                  </div>
                </a-menu-item>
                <a-menu-item key="3">
                  <div class="flex items-center">
                    <Icon icon="octicon:copy-24" color="#727375" />
                    <div>
                      <a-span
                        type="primary"
                        class="ml-[18px]"
                        @click="copyLinkToClipboard(item)"
                      >
                        复制项目链接
                      </a-span>
                    </div>
                  </div>
                </a-menu-item>
                <a-menu-item key="4">
                  <div class="flex items-center">
                    <Icon icon="bxs:copy-alt" color="#727375" />
                    <span class="ml-[18px]">复制项目*</span>
                  </div>
                </a-menu-item>
                <a-menu-item key="5">
                  <div class="flex items-center">
                    <Icon icon="fluent:save-copy-20-regular" color="#727375" />
                    <span class="ml-[18px]">保存为项目模板*</span>
                  </div>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
    <!-- 内容 -->

    <el-main>
      <main
        class="flex items-center justify-center w-full h-full mt-[130px] scrollbar-demo-item"
      >
        <el-scrollbar height="798px">
          <!-- 任务 -->
          <div v-if="activeName === 'TaskView'" class="h-full w-full">
            <ul
              class="w-[100%] h-[758px] m-[auto] relative flex justify-between"
            >
              <li>
                <div class="w-[284px] h-[40px] flex justify-between">
                  <span class="text-[14px] text-[#303133] font-[600]"
                    >产品计划·0</span
                  >
                  <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link" @click.prevent>
                      <Icon
                        icon="codicon:ellipsis"
                        width="22"
                        class="text-[#bfbfbf]"
                      />
                    </a>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item key="0">
                          <a class="flex">
                            <Icon
                              icon="solar:pen-2-line-duotone"
                              width="22"
                              class="text-[#bbb]"
                            />
                            <span class="text-[#bbb]">编辑列表</span></a
                          >
                        </a-menu-item>
                        <a-menu-item key="1">
                          <a class="flex"
                            ><Icon
                              icon="streamline:interface-delete-bin-2-remove-delete-empty-bin-trash-garbage"
                              width="22"
                              class="text-[#bbb]"
                            /><span class="text-[#bbb]"
                              >本列所有任务移至回收站</span
                            ></a
                          >
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="3"
                          ><a class="flex"
                            ><Icon
                              icon="streamline:interface-delete-bin-2-remove-delete-empty-bin-trash-garbage"
                              width="22"
                              class="text-[#bbb]"
                            /><span class="text-[#bbb]">删除列表</span></a
                          ></a-menu-item
                        >
                      </a-menu>
                    </template>
                  </a-dropdown>
                </div>
                <div
                  class="w-[274px] h-[30px] bg-[#fff] rounded-[8px] flex justify-center relative top-[18px]"
                >
                  <Icon
                    icon="ion:add"
                    width="22"
                    class="text-[#cdcdcd] relative top-[5px]"
                  />
                </div>
              </li>
              <li>
                <div class="w-[284px] h-[40px] flex justify-between">
                  <span class="text-[14px] text-[#303133] font-[600]"
                    >即将发布·0</span
                  >
                  <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link" @click.prevent>
                      <Icon
                        icon="codicon:ellipsis"
                        width="22"
                        class="text-[#bfbfbf]"
                      />
                    </a>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item key="0">
                          <a class="flex"
                            ><Icon
                              icon="solar:pen-2-line-duotone"
                              width="22"
                              class="text-[#bbb]"
                            /><span class="text-[#bbb]">编辑列表</span></a
                          >
                        </a-menu-item>
                        <a-menu-item key="1">
                          <a class="flex"
                            ><Icon
                              icon="streamline:interface-delete-bin-2-remove-delete-empty-bin-trash-garbage"
                              width="22"
                              class="text-[#bbb]"
                            /><span class="text-[#bbb]"
                              >本列所有任务移至回收站</span
                            ></a
                          >
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="3"
                          ><a class="flex"
                            ><Icon
                              icon="streamline:interface-delete-bin-2-remove-delete-empty-bin-trash-garbage"
                              width="22"
                              class="text-[#bbb]"
                            /><span class="text-[#bbb]">删除列表</span></a
                          ></a-menu-item
                        >
                      </a-menu>
                    </template>
                  </a-dropdown>
                </div>
                <div
                  class="w-[274px] h-[30px] bg-[#fff] rounded-[8px] flex justify-center relative top-[18px]"
                >
                  <Icon
                    icon="ion:add"
                    width="22"
                    class="text-[#cdcdcd] relative top-[5px]"
                  />
                </div>
              </li>
              <li>
                <div class="w-[284px] h-[40px] flex justify-between">
                  <span class="text-[14px] text-[#303133] font-[600]"
                    >测试·0</span
                  >
                  <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link" @click.prevent>
                      <Icon
                        icon="codicon:ellipsis"
                        width="22"
                        class="text-[#bfbfbf]"
                      />
                    </a>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item key="0">
                          <a class="flex"
                            ><Icon
                              icon="solar:pen-2-line-duotone"
                              width="22"
                              class="text-[#bbb]"
                            /><span class="text-[#bbb]">编辑列表</span></a
                          >
                        </a-menu-item>
                        <a-menu-item key="1">
                          <a class="flex"
                            ><Icon
                              icon="streamline:interface-delete-bin-2-remove-delete-empty-bin-trash-garbage"
                              width="22"
                              class="text-[#bbb]"
                            /><span class="text-[#bbb]"
                              >本列所有任务移至回收站</span
                            ></a
                          >
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="3"
                          ><a class="flex"
                            ><Icon
                              icon="streamline:interface-delete-bin-2-remove-delete-empty-bin-trash-garbage"
                              width="22"
                              class="text-[#bbb]"
                            /><span class="text-[#bbb]">删除列表</span></a
                          ></a-menu-item
                        >
                      </a-menu>
                    </template>
                  </a-dropdown>
                </div>
                <div
                  class="w-[274px] h-[30px] bg-[#fff] rounded-[8px] flex justify-center relative top-[18px]"
                >
                  <Icon
                    icon="ion:add"
                    width="22"
                    class="text-[#cdcdcd] relative top-[5px]"
                  />
                </div>
              </li>
              <li>
                <div class="w-[284px] h-[40px] flex justify-between">
                  <span class="text-[14px] text-[#303133] font-[600]"
                    >准备发布·0</span
                  >
                  <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link" @click.prevent>
                      <Icon
                        icon="codicon:ellipsis"
                        width="22"
                        class="text-[#bfbfbf]"
                      />
                    </a>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item key="0">
                          <a class="flex"
                            ><Icon
                              icon="solar:pen-2-line-duotone"
                              width="22"
                              class="text-[#bbb]"
                            /><span class="text-[#bbb]">编辑列表</span></a
                          >
                        </a-menu-item>
                        <a-menu-item key="1">
                          <a class="flex"
                            ><Icon
                              icon="streamline:interface-delete-bin-2-remove-delete-empty-bin-trash-garbage"
                              width="22"
                              class="text-[#bbb]"
                            /><span class="text-[#bbb]"
                              >本列所有任务移至回收站</span
                            ></a
                          >
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="3"
                          ><a class="flex"
                            ><Icon
                              icon="streamline:interface-delete-bin-2-remove-delete-empty-bin-trash-garbage"
                              width="22"
                              class="text-[#bbb]"
                            /><span class="text-[#bbb]">删除列表</span></a
                          ></a-menu-item
                        >
                      </a-menu>
                    </template>
                  </a-dropdown>
                </div>
                <div
                  class="w-[274px] h-[30px] bg-[#fff] rounded-[8px] flex justify-center relative top-[18px]"
                >
                  <Icon
                    icon="ion:add"
                    width="22"
                    class="text-[#cdcdcd] relative top-[5px]"
                  />
                </div>
              </li>
              <li>
                <div class="w-[284px] h-[40px] flex justify-between">
                  <span class="text-[14px] text-[#303133] font-[600]"
                    >发布成功·0</span
                  >
                  <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link" @click.prevent>
                      <Icon
                        icon="codicon:ellipsis"
                        width="22"
                        class="text-[#bfbfbf]"
                      />
                    </a>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item key="0">
                          <a class="flex"
                            ><Icon
                              icon="solar:pen-2-line-duotone"
                              width="22"
                              class="text-[#bbb]"
                            /><span class="text-[#bbb]">编辑列表</span></a
                          >
                        </a-menu-item>
                        <a-menu-item key="1">
                          <a class="flex"
                            ><Icon
                              icon="streamline:interface-delete-bin-2-remove-delete-empty-bin-trash-garbage"
                              width="22"
                              class="text-[#bbb]"
                            /><span class="text-[#bbb]"
                              >本列所有任务移至回收站</span
                            ></a
                          >
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="3"
                          ><a class="flex"
                            ><Icon
                              icon="streamline:interface-delete-bin-2-remove-delete-empty-bin-trash-garbage"
                              width="22"
                              class="text-[#bbb]"
                            /><span class="text-[#bbb]">删除列表</span></a
                          ></a-menu-item
                        >
                      </a-menu>
                    </template>
                  </a-dropdown>
                </div>
                <div
                  class="w-[274px] h-[30px] bg-[#fff] rounded-[8px] flex justify-center relative top-[18px]"
                >
                  <Icon
                    icon="ion:add"
                    width="22"
                    class="text-[#cdcdcd] relative top-[5px]"
                  />
                </div>
              </li>
              <li>
                <div class="w-[284px] h-[40px] flex">
                  <Icon
                    icon="ion:add"
                    width="22"
                    class="text-[#cdcdcd] relative top-[5px]"
                  />
                  <span
                    class="text-[14px] text-[#303133] font-[600] leading-[28px] text-[#00000073]"
                    >新建任务列表</span
                  >
                </div>
              </li>
            </ul>
          </div>

          <!-- 文件 -->
          <div v-else-if="activeName === 'FileView'">
            <div class="w-[1076px] h-[100%] text-center bg-white min-h-[100%]">
              <div class="h-[60px] flex justify-between">
                <div class="text-[18px] relative top-[13px] left-[17px]">
                  我的文件
                </div>
                <div class="relative top-[12px] left-[-22px]">
                  <button
                    class="w-[90px] h-[40px] flex border-[1px] justify-center relative leading-[38px] text-[14px] text-[#C0C4CC]"
                  >
                    <Icon
                      icon="material-symbols:cloud-upload"
                      width="22"
                      class="relative top-[7px]"
                    />上传
                  </button>
                </div>
              </div>
              <div class="w-[1076px] flex border-b-[2px]">
                <div
                  class="w-[56%] text-[14px] flex items-center pl-[25px] text-[#00000073]"
                >
                  名称
                </div>
                <div class="w-[300px] flex justify-between">
                  <div
                    class="text-[14px] w-[33%] text-[#00000073] leading-[38px]"
                  >
                    大小
                  </div>
                  <div
                    class="text-[14px] w-[33%] text-[#00000073] leading-[38px]"
                  >
                    创建日期
                  </div>
                  <div
                    class="text-[14px] w-[33%] text-[#00000073] leading-[38px]"
                  >
                    创建人
                  </div>
                </div>
              </div>
              <div
                v-for="item in getFileData"
                :key="item.id"
                class="h-[50px] px-[20px] flex items-center"
              >
                <div class="w-[55%] text-[14px] flex items-center">
                  <img
                    class="w-[32px] rounded-[8px]"
                    :src="`http://192.168.122.36:1024/${item.path}`"
                    alt=""
                  />
                  <a
                    :href="`http://192.168.122.36:1024/${item.path}`"
                    target="blank"
                    class="text-left ml-[12px]"
                    >{{ item.title }}{{ item.extension }}</a
                  >
                </div>
                <div class="w-[45%] flex text-[14px] text-[#cac3c3]">
                  <div class="w-[70%]">
                    <span>{{ (item.size / 1024).toFixed(2) + "kb" }}</span>
                    <span class="ml-[26px]">{{
                      item.created_at.slice(6, 19)
                    }}</span>
                    <span class="ml-[26px]">{{
                      getCharact && getCharact[0].username
                    }}</span>
                  </div>

                  <div
                    class="flex items-center justify-evenly text-[20px] w-[30%]"
                  >
                    <Icon icon="clarity:download-line" color="#ccc" />
                    <Icon icon="mingcute:pencil-2-line" color="#ccc" />
                    <el-dropdown trigger="click">
                      <span class="demonstration">
                        <Icon icon="ep:arrow-up" color="#ccc" :rotate="2" />
                      </span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item
                            ><Icon icon="gg:link" color="#ccc" />
                            <div class="flex items-center">
                              <a-span
                                type="primary"
                                class="ml-[6px]"
                                @click="openNotification(item)"
                              >
                                复制项目链接
                              </a-span>
                            </div></el-dropdown-item
                          >

                          <el-dropdown-item disabled
                            ><Icon icon="carbon:trash-can" color="#ccc" />
                            <span class="ml-[6px]"
                              >移动回收站</span
                            ></el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 概括 -->
          <div
            v-else-if="activeName === 'OverView'"
            class="w-[1076px] text-center bg-[f7f7f7] min-h-[100%]"
          >
            <div class="h-[320px] bg-[#fff]">
              <div ref="TaskStateEcharts" class="flex-1"></div>
              <div ref="TaskPrioritycharts" class="flex-1">2</div>
            </div>
            <div class="mt-[18px] flex">
              <div
                class="w-[690px] bg-[#fff] py-[10px] px-[20px] rounded-[8px] flex-none"
              >
                <div class="text-left">项目动态</div>
                <div
                  class="flex items-center w-[100%] py-[11px] border-b-[1px] border-[#e8e8e8] text-[14px]"
                  v-for="item in getSummarize"
                  :key="item.id"
                >
                  <div class="flex items-center">
                    <img
                      class="w-[36px] h-[36px] rounded-[50%]"
                      :src="item.operator.avatar"
                      alt=""
                    />
                  </div>
                  <div
                    class="w-[500px] text-left pl-[10px] h-[48px] flex flex-col justify-between"
                  >
                    <div class="">
                      {{ item.operator.username }}{{ item.remark }}
                    </div>
                    <div class="text-[#ccc]">
                      {{ item.task.name }}
                    </div>
                  </div>
                  <div class="w-[160px] text-right text-[#ccc]">
                    {{ item.created_at.slice(11, 16) }}
                  </div>
                </div>
                <div class="mt-[12px] px-[5px] flex justify-center">
                  <el-pagination
                    v-model:current-page="currentpage"
                    background
                    layout="prev, pager, next"
                    :total="logscount"
                    @current-change="getcurrentList"
                  />
                </div>
              </div>
              <div class="w-[100%] h-[800px] ml-[16px] bg-[#fff] rounded-[8px]">
                <div>
                  <div class="p-[10px] w-[260px] h-[70px] flex">
                    <img
                      class="w-[50px] h-[50px] rounded-[10px]"
                      :src="`http://192.168.122.36:1024/${
                        getsect(selectedOptionName).cover
                      }`"
                      alt=""
                    />
                    <div class="text-[14px] flex-none ml-[16px] text-left">
                      <p>{{ getsect(selectedOptionName).name }}</p>
                      <p class="text-[#ccc]">
                        <span>
                          {{
                            getsect(selectedOptionName).creator.username
                          }}</span
                        >于
                        <span>
                          {{
                            getsect(selectedOptionName).updated_at.slice(0, 10)
                          }}</span
                        >创建
                      </p>
                    </div>
                  </div>
                  <div class="w-[200px] h-[60px] flex items-center">
                    <span class="ml-[15px] text-[14px] text-[#ccc]">{{
                      getsect(selectedOptionName).intro
                    }}</span>
                  </div>
                </div>
                <div class="w-[240px] h-[40px] p-[5px] text-left">
                  <span class="ml-[12px] text-[14px]">项目统计</span>
                </div>
                <ul
                  class="w-[240px] h-[240px] flex flex-wrap justify-evenly items-center"
                >
                  <li
                    class="w-[70px] h-[100px] flex flex-col justify-evenly items-start"
                  >
                    <span>已完成</span>
                    <span>{{ getSummarizestatistics?.done }}</span>
                    <div style="width: 70px">
                      <a-progress :percent="30" size="small" />
                    </div>
                  </li>
                  <li
                    class="w-[70px] h-[100px] flex flex-col justify-evenly items-start"
                  >
                    <span>未完成</span>
                    <span>{{ getSummarizestatistics?.undone }}</span>
                    <div style="width: 70px">
                      <a-progress :percent="30" size="small" />
                    </div>
                  </li>
                  <li
                    class="w-[70px] h-[100px] flex flex-col justify-evenly items-start"
                  >
                    <span>以逾期</span>
                    <span>{{ getSummarizestatistics?.overdue }}</span>
                    <div style="width: 70px">
                      <a-progress :percent="30" size="small" />
                    </div>
                  </li>
                  <li
                    class="w-[70px] h-[100px] flex flex-col justify-evenly items-start"
                  >
                    <span>待认领</span>
                    <span>{{ getSummarizestatistics?.unreceived }}</span>
                    <div style="width: 70px">
                      <a-progress :percent="30" size="small" />
                    </div>
                  </li>
                  <li
                    class="w-[70px] h-[100px] flex flex-col justify-evenly items-start"
                  >
                    <span>今日到期</span>
                    <span>{{ getSummarizestatistics?.dueToday }}</span>
                    <div style="width: 70px">
                      <a-progress :percent="30" size="small" />
                    </div>
                  </li>
                  <li
                    class="w-[70px] h-[100px] flex flex-col justify-evenly items-start"
                  >
                    <span>逾期完成</span>
                    <span>{{ getSummarizestatistics?.completedOverdue }}</span>
                    <div style="width: 70px">
                      <a-progress :percent="30" size="small" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 版本 -->
          <div
            v-else-if="activeName === 'VersionView'"
            class="w-[1076px] h-[760px] text-center bg-white min-h-[100%] leading-[4.5rem]"
          >
            版本
          </div>

          <!-- 日程 -->
          <div
            v-else-if="activeName === 'ScheduleView'"
            class="w-[1076px] h-[760px] text-center bg-white min-h-[100%] leading-[4.5rem]"
          >
            日程
          </div>
        </el-scrollbar>
      </main>
    </el-main>
  </div>
</template>
<script setup lang="ts">
import Head from "@/views/NoviceGuidance/assembly/HeaderView.vue";
import { ArrowDown } from "@element-plus/icons-vue";
import { CheckCircleOutlined } from "@ant-design/icons-vue";
import { TabsProps } from "ant-design-vue/es/tabs";
import { notification } from "ant-design-vue";
import type { TabsPaneContext } from "element-plus";
import type { NotificationPlacement } from "ant-design-vue";
import { saveAs } from "file-saver";
import {
  getDocument,
  getSelectInfomation,
  getSummarydata,
  getSummaryStatistics,
  getCharacterData,
} from "@/service";
// 概览图表
import * as echarts from "echarts";

// tab切换
const activeName = ref("FileView");
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
const valueH = ref<string>("请选择");
const valueE = ref<string>("请选择");
const valueR = ref<string>("全部");
const valueD = ref<string>("请选择");
const valueW = ref<string>("请选择");

// 下拉菜单
const selectedOptionName = ref();
const Search = ref("");
const selectedOptionid = ref<number>(1000093);
const SerarchData = ref();

// 搜索框搜索成员
watchEffect(() => {
  if (Search.value.length > 0) {
    SerarchData.value = getDSelectata.value?.filter((item) => {
      return item.name.indexOf(Search.value) != -1;
    });
    console.log("搜索到的成员", SerarchData.value);
  }
});
// 点击菜单项时更新选中项名称
const router = useRouter();
const route = useRoute();
const handleDropdownItemClick = (id: number) => {
  router.push(`/Guida/${id}`);
  selectedOptionid.value = id;
  selectedOptionName.value = id;
  // console.log(2222, route); //获取的id
};

//点击文件项目复制链接
function openNotification(item) {
  const link = "http://192.168.122.36:1024" + item.path;
  const textArea = document.createElement("textarea");
  textArea.value = link;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
  notification.open({
    type: "success",
    placement: "bottomLeft",
    message: `复制项目链接成功`,
    description: "可粘贴到地址栏中,快速打开此项目",
  });
}
// 点击菜单复制链接
function copyLinkToClipboard(item) {
  const link = "http://192.168.122.36:1024" + item.path;
  const textArea = document.createElement("textarea");
  textArea.value = link;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
  notification.open({
    type: "success",
    placement: "bottomLeft",
    message: `复制项目链接成功`,
    description: "可粘贴到地址栏中,快速打开此项目",
  });
}

//项目回收站显示与隐藏
const datas = ref();
const openE = ref<boolean>(false);
const showModalE = () => {
  datas.value = route.params.id;
  openB.value = true;
};
const handleOkE = (e: MouseEvent) => {
  console.log(e);
  openE.value = false;
};
//项目设置显示与隐藏
const openB = ref<boolean>(false);
const showModalB = () => {
  openB.value = true;
};
const handleOkB = (e: MouseEvent) => {
  console.log(e);
  openB.value = false;
};
const mode = ref<TabsProps["tabPosition"]>("left");
const activeKeyTab = ref("1");
const callback: TabsProps["onTabScroll"] = (val) => {
  console.log(val);
};

// 项目设置里面的项目偏好
const checked = ref<boolean>(false);

// 人物控件部分
const dialogVisible = ref(false);

//引导数据
const { data: getDSelectata } = useRequest(
  () =>
    getSelectInfomation({
      limit: 1000,
    }),
  {
    // 请求成功时
    onSuccess: () => {
      // console.log(getDSelectata.value);
    },
  }
);
// 点击左侧用户在上面显示名字
const getsect = (id: number) => {
  return (
    getDSelectata.value &&
    getDSelectata.value.filter((item: any) => {
      return item.id == id;
    })[0]
  );
};
// 菜单人物数据
const getCharact = ref();
watchEffect(() => {
  getCharacterData({
    limit: 6,
    offset: 0,
    project_id: selectedOptionid.value,
  }).then((res: unknown) => {
    getCharact.value = res;
    console.log(getCharact.value[0]);
  });
});
//文件数据
const getFileData = ref();
watchEffect(() => {
  getDocument({
    project_id: selectedOptionid.value,
    prop_order: "id",
    order: "desc",
    is_recycle: 0,
  }).then((res) => {
    getFileData.value = res;
  });
});
//概括开始
//概括项目动态数据
const getSummarize = ref();
watchEffect(() => {
  getSummarydata({
    project_id: selectedOptionid.value,
    prop_order: "id",
    order: "desc",
    limit: 1000,
    offset: 0,
  }).then((res) => {
    getSummarize.value = res;
  });
});
// 分页
// const DataScount = ref<number>(0);// 总数
// const NewData = ref()

//概括统计数据
const getSummarizestatistics = ref();
watchEffect(() => {
  getSummaryStatistics({
    id: selectedOptionid.value,
  }).then((res) => {
    getSummarizestatistics.value = res;
  });
});
// 概括结束
</script>
<style>
.el-tabs__nav-wrap::after {
  height: 0 !important;
}
.el-tabs__active-bar {
  height: 2.5px;
}
.task .is-top {
  margin: 0 !important;
}
.ant-tabs-nav {
  margin-top: 13px;
}
.ant-dropdown-menu {
  width: 270px;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 796px;
  text-align: center;
  border-radius: 4px;
}
</style>
