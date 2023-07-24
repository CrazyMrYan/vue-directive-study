import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
// 模拟请求
const getPermissionsApi = async () =>
  fetch(`/api.json?t=${new Date().getTime()}`).then((res) => res.json());

// 分割字符串
const splitPermissionString = (str) => {
  try {
    if (typeof str === "string" && str.includes("::")) {
      const [firstPart, secondPart] = str.split("::");
      return [firstPart.trim(), secondPart.trim()];
    } else {
      throw new Error("Invalid permission string or delimiter not found");
    }
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

// 使用示例
const controller = {
  // 是否发去过请求
  hasRequested: false,
  // 权限集合
  permissionList: [],
  // 真正的请求任务
  task: null,
};

const checkPermission = async (value = null) => {
  // 判断是否发送过请求
  if (!controller.hasRequested) {
    controller.hasRequested = true;
    controller.task = getPermissionsApi();
  }

  // 进行赋值
  controller.permissionList = await controller.task;

  // 截取对应的模块和操作
  const [module = null, operate = null] = splitPermissionString(value) ?? [];

  // 是否存在权限
  const hasModule = module && controller.permissionList[module];

  // 判断模块和操作是否存在
  if (!module || !operate || !hasModule) return false;

  // 判断是否有权限
  return hasModule?.includes(operate) ?? false;
};

// 全局自定义指令
Vue.directive("permission", {
  async inserted(el, binding) {
    el.style.display = "none";
    const hasPermission = await checkPermission(binding.value);
    el.style.display = "";
    if (!hasPermission) {
      el.parentNode?.removeChild(el); // 移除元素
    }
  },
  async update(el, binding) {
    const hasPermission = await checkPermission(binding.value);
    if (hasPermission) {
      if (!el.parentNode) {
        el.__v_originalParent?.insertBefore(el, el.__v_anchor || null); // 插入元素
      }
    } else {
      if (el.parentNode) {
        el.__v_anchor = document.createComment("");
        el.__v_originalParent = el.parentNode;
        el.parentNode.replaceChild(el.__v_anchor, el); // 替换元素
      }
    }
  },
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
