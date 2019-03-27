import Alert from '@/components/common/Alert'
import Avatar from '@/components/common/Avatar'
import Dropdown from '@/components/common/Dropdown'
import Loading from '@/components/common/Loading'
import Icon from '@/components/common/Icon'
import BaseForm from '@/components/common/form/BaseForm'
import FormGroup from '@/components/common/form/FormGroup'
import Modal from '@/components/common/modal/Modal'
import ModalOpener from '@/components/common/modal/ModalOpener'

export default function registerGlobalComponents (Vue) {
  Vue.component('alert', Alert)
  Vue.component('avatar', Avatar)
  Vue.component('dropdown', Dropdown)
  Vue.component('icon', Icon)
  Vue.component('loading', Loading)
  Vue.component('base-form', BaseForm)
  Vue.component('form-group', FormGroup)
  Vue.component('modal', Modal)
  Vue.component('modal-opener', ModalOpener)
}
