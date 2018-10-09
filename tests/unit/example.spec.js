import { shallowMount } from '@vue/test-utils'
import VueTask from '@/components/VueTask.vue'

describe('VueTask.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(VueTask, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
