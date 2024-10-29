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
export const containerConfig = {
  layout: layoutConfig,
}
