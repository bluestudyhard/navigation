import BaseInput from '@/lowcode/components/BaseInput.vue'
import BaseContainer from '@/lowcode/components/BaseContainer.vue'

export const renderComponents = ref(
  {
    BaseInput,
    BaseContainer,
  },
)

export const renderList = ref([

  {
    name: 'input',
    render: 'BaseInput',
  },
  {
    name: 'container',
    render: 'BaseContainer',
  },
])
export function renderComponent(item: any) {
  const componentName = renderList.value.find(i => i.name === item.name)
  if (componentName) {
    const component = renderComponents.value[componentName.render as keyof typeof renderComponents.value] || null
    return component
  }
  return null
}
