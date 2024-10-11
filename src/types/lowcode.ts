// 定义input的配置类型

interface InputConfig {
  name: string
  props: {
    type: string
    label: string
    placeholder: string
    defaultValue: string
    disabled: boolean
    size: string[]
    state: string[]
    icon: {
      type: string[]
      iconName: string
    }
    maxLength: number
    showWordLimit: boolean
    clearable: boolean
    showPassword: boolean
    readonly: boolean
    autofocus: boolean
    autocomplete: string
    inputStyle: {
      width: string
    }
    [key: string]: any
  }
  events: string[]
}
export interface LowCodeConfig {
  InputConfig: {
    text: InputConfig
  }
}
