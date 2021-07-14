import { cjMessage, cjLoading } from './cjMessage'
import {
  cjSetInterfereProdId,
  getInterfereProdId,
  setInterfereProdVersion,
  getInterfereProdVersion,
  getTempUserId,
  isTempUserId
} from './cjSetInterfereProdId'


window.cjMessage = cjMessage
window.cjLoading = cjLoading


window.cjSetInterfereProdId = cjSetInterfereProdId
window.getInterfereProdId = getInterfereProdId
window.setInterfereProdVersion = setInterfereProdVersion
window.getInterfereProdVersion = getInterfereProdVersion
window.isTempUserId = isTempUserId

export {
  getInterfereProdId,
  setInterfereProdVersion,
  getInterfereProdVersion,
  getTempUserId,
  isTempUserId
}