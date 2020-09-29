import {mount} from '@vue/test-utils'
import Charge from '@/component/charge/charge'

describe('续费充值组件', ()=>{
  it('挂载组件', ()=>{
    const wrapper=mount(Charge)
    let info={
      title:'续费',
      showTime:true
    }
    expect(wrapper.open(info).find('.title').text()).toEqual('续费')
    expect(wrapper.open(info).find('.charge-time>.title').text()).toEqual('续费时间')
  })
})