// This test will always fail because there is 'vuex' involved.
// Simulating vuex stores with mocks is cumbersome and out of the scope of the interview task.
import { mount } from '@vue/test-utils'
import VueTask from '@/components/VueTask.vue'

describe('VueTask', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(VueTask)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
