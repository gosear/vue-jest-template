import { shallowMount ,mount,createLocalVue } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import Vuex from 'vuex'
const localVue = createLocalVue()

localVue.use(Vuex)

// 测试两种渲染方法
describe('HelloWorld.vue', () => {
  it('测试动态渲染的options.propsData', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })

  it('测试setProps方法 ', async () => {
    const wrapper = mount(HelloWorld)

    await wrapper.setProps({ msg: 'new message' })

    expect(wrapper.vm.msg).toBe('new message')
  })
  it('测试$emit', async () => {
    const wrapper = mount(HelloWorld)

    wrapper.vm.$emit('foo')
    wrapper.vm.$emit('foo', 123)

    await wrapper.vm.$nextTick() // Wait until $emits have been handled

    /*
    wrapper.emitted() returns the following object:
    {
      foo: [[], [123]]
    }
    */

    // assert event has been emitted
    expect(wrapper.emitted().foo).toBeTruthy()

    // assert event count
    expect(wrapper.emitted().foo.length).toBe(2)

    // assert event payload
    expect(wrapper.emitted().foo[1]).toEqual([123])
  })


  let actions
  let store
  beforeEach(() => {
    actions = {
      actions_1: jest.fn(),
    }
    store = new Vuex.Store({
      state: {
        project_id:"2"
      },
      getters:{
        project_id :(state) => state.project_id
      },
      actions
    })
  })
  it('测试Vuex',  async () => {

    const wrapper = shallowMount(HelloWorld, { store, localVue })
    await wrapper.vm.$nextTick()
    const button = wrapper.find('#testVuex')
    await button.trigger('click')
    expect(actions.actions_1).toHaveBeenCalled()
  })

})


