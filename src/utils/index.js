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
  // 是否请求完成
  isRequest: false,
  // 权限集合
  permissionList: [],
  tasks: [],
};

const checkPermission = async (value = null) => {
  // 截取对应的模块和操作
  const [module = null, operate = null] = splitPermissionString(value) ?? [];

  // 判断模块和操作是否存在
  if (!module || !operate) return false;

  // 判断是否有权限
  return controller.permissionList[module]?.includes(operate) ?? false;
};

export default {
  install(Vue, opts) {
    console.log(opts);
    Vue.directive("permission", {
      async inserted(el, binding) {
        const hasPermission = await checkPermission(binding.value);
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
  },
};
