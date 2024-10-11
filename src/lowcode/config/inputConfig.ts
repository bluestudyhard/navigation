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
  },
  events: ['blur', 'focus', 'change', 'input', 'clear'],
}
export const InputConfig = {
  text: textInputConfig,
}
