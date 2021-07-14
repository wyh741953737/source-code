import MessageTpl from './Message.vue'

const NoticeConstructor = Vue.extend(MessageTpl)

let nId = 1
//在body下新建的标签类名
let tagClass = 'cuchengui-dialog-message'

const Message = options => {
  if (JSON.stringify(options) === undefined) { return false }
  let id = 'notice-' + nId++
  options = options || {}
  if (typeof options === 'string') {
    options = {
      msg: options
    }
  }
  const NoticeInstance = new NoticeConstructor({
    data: options
  })
  NoticeInstance.id = id
  NoticeInstance.vm = NoticeInstance.$mount()
  NoticeInstance.vm.visible = true
  NoticeInstance.dom = NoticeInstance.vm.$el
  if (!document.querySelector(`body > .${tagClass}`)) {
    let div = document.createElement('div')
    div.classList.add(tagClass)
    document.body.appendChild(div)
    document.querySelector(`body > .${tagClass}`).appendChild(NoticeInstance.dom)
  }
  document.querySelector(`body > .${tagClass}`).appendChild(NoticeInstance.dom)
  return NoticeInstance.vm
}
['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        msg: options
      }
    }
    options.type = type
    return Message(options)
  }
})

export default {
  install (Vue, options = {}) {
    Vue.prototype.$my_message = Message
  }
}