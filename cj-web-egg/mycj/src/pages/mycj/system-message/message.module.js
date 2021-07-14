import { messageAllCtrl } from './msg-all';
import { messageListCtrl } from './msg-list';

export function messageFactory(angular) {

  const module = angular.module('system-message', []);

  // 所有消息
  module.controller('system-message-all.ctrl', [
    '$rootScope', '$scope', '$timeout', '$location', 'dsp', '$stateParams',
    messageAllCtrl]);

  // 消息详情
  module.controller('system-message-list.ctrl', [
    '$rootScope', '$scope', 'dsp', '$stateParams', '$timeout', '$location', '$sce',
    messageListCtrl]);

  return module;
}
