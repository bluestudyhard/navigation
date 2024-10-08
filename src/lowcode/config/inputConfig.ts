const textInputConfig = {
  type: 'text',
  label: '文本输入框',
  placeholder: '请输入',
  defaultValue: '',
  event: ['blur', 'focus', 'change', 'input', 'clear'],
  disable: false,
  size: ['small', 'default', 'large'],
  state: ['normal', 'success', 'warning', 'error'],
  icon: {
    iconPostion: ['prefix-icon', 'suffix-icon'],
    iconName: '',
  },
  props: {
    maxLength: 100,
    showWordLimit: false,
    clearable: false,
    showPassword: false,
    disabled: false,
    readonly: false,
    autofocus: false,
    autocomplete: 'off',
    inputStyle: {

    },
  },
}
export const inputConfig = {
  textInputConfig,
}
