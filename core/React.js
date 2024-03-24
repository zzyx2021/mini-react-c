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
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el]
    }
  }
}

let nextWorkOfUnit = null
function workloop(deadline) {
  let shouldYield = false
  while(!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit)
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workloop)
}

function createDom(type) {
 return type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(type)
}

function updateProps(dom, props) {
  Object.keys(props).forEach((key) => {
    if (key !== 'children') {
      dom[key] = props[key]
    }
  })
}

function initChildren(fiber) {
  const children = fiber.props.children
  let prevChild = null
  children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      parent: fiber,
      sibling: null,
      dom: null
    }
    if(index === 0){
      fiber.child = newFiber
    } else {
      prevChild.sibling = newFiber
    }
    prevChild = newFiber
  })
}
function performWorkOfUnit(fiber) {
  if(!fiber.dom) {
    const dom = (fiber.dom = createDom(fiber.type))
    fiber.parent.dom.append(dom)
    updateProps(dom, fiber.props)
  }

  //3.转换链表 设置好指针
  initChildren(fiber)

  //4.返回下一个要执行的任务
  if(fiber.child) {
    return fiber.child
  }

  if(fiber.sibling) {
    return fiber.sibling
  }

  return fiber.parent?.sibling
}

requestIdleCallback(workloop)

const React = {
  render,
  createElement
}

export default React