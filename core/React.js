function createTextNode(child) {
  return {
    type: 'TEXT_ELEMENT',
    props:{
      nodeValue: child,
      children:[]
    }
  }
}

function createElement(type, props, ...children) {
  return {
    type: type,
    props: {
      ...props,
      children: children.map(child => typeof child === 'string' ? createTextNode(child) : child)
    }
  }
}

function render(el, container) {
  const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(el.type)

  Object.keys(el.props).forEach((key) => {
    if (key !== 'children') {
      dom[key] = el.props[key]
    }
  })

  const children = el.props.children
  children.forEach((child) => {
    render(child, dom)
  })
  container.append(dom)
}

const React = {
  render,
  createElement
}

export default React