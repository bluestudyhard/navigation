const textInputConfig = {
  id: '',
  name: 'base-text-input',
  props: {
    type: 'text',
    label: '文本输入框',
    placeholder: '请输入',
    defaultValue: '',
    disabled: false,
    size: ['small', 'default', 'large'],
    state: ['normal', 'success', 'warning', 'error'],
    icon: {
      type: ['prefix-icon', 'suffix-icon'],
      iconName: '',
    },
    maxLength: 100,
    showWordLimit: false,
    clearable: false,
    showPassword: false,
    readonly: false,
    autofocus: false,
    autocomplete: 'off',
    inputStyle: {
      width: '12rem',
    },
    // 定义渲染配置项的配置

  },
  children: [],
  events: ['blur', 'focus', 'change', 'input', 'clear'],
}
const layoutConfig = {
  id: '',
  name: 'base-layout',
  props: {
    direction: ['horizontal', 'vertical'],
    horizontalAlign: ['left', 'center', 'right'],
    verticalAlign: ['top', 'middle', 'bottom'],
    spacing: {
      margin: ['top', 'right', 'bottom', 'left'],
      padding: ['top', 'right', 'bottom', 'left'],
    },
    deafultWidth: '100%',
    deafultHeight: '5rem',
    width: ['auto', 'fixed', 'flex'],
    height: ['auto', 'fixed', 'flex'],
    style: {
      border: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000000',
        borderRadius: 0,
      },
      background: {
        backgroundColor: '#ffffff',
      },
      shadow: {
        boxShadow: 'none',
      },
      radius: {
        borderRadius: 0,
      },
    },
  },
  children: [],
}
// 定义渲染配置项的配置
// interface configRegionType {
//   // 要渲染成switch的配置项
//   switch?: ['disabled', 'clearable', 'showPassword', 'readonly', 'autofocus', 'showWordLimit']
//   // 要渲染成input的配置项
//   input?: ['name', 'placeholder', 'defaultValue', 'maxLength', 'autocomplete']
//   // 要渲染成state的配置项
//   state?: ['state']
//   // 要渲染成size的配置项
//   size?: ['size']
//   //
//   icon?: ['iconName']
//   //
//   buttonType?: ['buttonType']
// }

// 基础配置
const baseRegion = {
  switch: ['disabled', 'clearable', 'showPassword', 'readonly', 'autofocus', 'showWordLimit', 'autocomplete'],
  input: ['name', 'placeholder', 'defaultValue', 'maxLength'],
  state: ['state'],
  size: ['size'],
  icon: ['iconName'],
  buttonType: ['buttonType'],
}

// 容器配置
const layoutRegion = {
  horizontalAlign: ['left', 'center', 'right'], // 水平对齐选项
  verticalAlign: ['top', 'middle', 'bottom'], // 垂直对齐选项
  spacing: ['margin', 'padding'], // 间距选项
  width: ['auto', 'fixed', 'flex'], // 宽度选项
  height: ['auto', 'fixed', 'flex'], //
  style: ['border', 'background', 'shadow', 'radius'], // 样式选项

}
export const configDisplayNames = {
  disabled: '显示禁用',
  clearable: '可清除',
  showPassword: '是否显示密码',
  readonly: '是否只读',
  autofocus: '自动聚焦',
  showWordLimit: '是否字数限制',
  name: '输入标签名称',
  placeholder: '输入提示',
  defaultValue: '默认值',
  maxLength: '最大长度',
  autocomplete: '自动完成',
  state: '状态',
  size: '尺寸',
  iconName: '图标名称',
  buttonType: '按钮类型',
  horizontalAlign: '水平对齐',
  verticalAlign: '垂直对齐',
  spacing: '间距',
  width: '宽度',
  height: '高度',
  border: '边框',
  background: '背景',
  shadow: '阴影',
  radius: '圆角',
}
export const configRegion = {
  ...baseRegion,
  ...layoutRegion,
}
export const InputConfig = {
  text: textInputConfig,
}
export const inputConfig = {
  textInputConfig,
}
