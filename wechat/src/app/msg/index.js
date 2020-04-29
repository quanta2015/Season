import React from 'react'
import { inject } from 'mobx-react'
import { Input, Tabs, Form, Button,Icon, DatePicker,Result,Modal, message, Skeleton } from "antd";
import clone from 'util/clone'
import './index.less'

const { TextArea } = Input

@inject('mainStore')
class Msg extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      code: null,
      loading: false,
      succ: false,
      visible: false,
    }
  }

  doReturn = (link) =>{
    // window.location.replace(`/#msg`)
    this.props.history.push('msg')
  }

  doApply = (e)=>{
    e.preventDefault()
    this.props.form.validateFields( async (err, values) => {
      if (!err) {
        this.setState({ visible: true, values: values });
      }
    })
  }

  handleOk = async () => {
    let params = clone(this.state.values)

    this.setState({ loading: true })
    let r = await this.props.mainStore.saveMsg(params)
    if (r && r.code === 200) {
      this.setState({ loading: false, succ: true, visible: false })
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {succ,visible, loading} = this.state

    return (
      <div className='g-msg'>
        <div className="m-title">留言板</div>

        {(!succ)&&
        <div className="m-msg">
          <Form className="m-appy-form">
            <Form.Item label="姓名">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入姓名！' }],
                initialValue:''
              })(<Input className="input-text" placeholder="请输入姓名..." />)}
            </Form.Item>
            <Form.Item label="电话">
              {getFieldDecorator('mobile', {
                rules: [{ required: true, message: '请输入电话！' }],
                initialValue: '' 
              })(<Input className="input-text" placeholder="请输入电话..."/>)}
            </Form.Item>
            <Form.Item label="留言内容">
              {getFieldDecorator('msg', {
                rules: [{ required: true, message: '请输入留言信息！' }],
                initialValue: '' 
              })(<TextArea rows={4} placeholder="请输入留言信息..."/>)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.doApply} block>提 交</Button>
            </Form.Item>
          </Form>
        </div>}
        
        {(succ)&&
        <div className="m-ret">
          <Result
            title="留言提交成功，请等待工作人员回复"
            extra={ <Button type="primary" onClick={this.doReturn} block>返 回</Button> }
          />
        </div>}

        <Modal
          visible={visible}
          confirmLoading={loading}
          onOk={this.handleOk}
          onCancel={e=> this.setState({ visible: false }) }
        >
          <p>确认留言信息?</p>
        </Modal>

      </div>
    )
  }
}

export default Form.create()(Msg)