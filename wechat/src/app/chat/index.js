import React from 'react'
import dayjs from 'dayjs'
import { inject } from 'mobx-react'
import { message } from 'antd'

import io from "socket.io-client";
import './index.less'
import { API_SERVER } from 'constant/apis'
import sys_icon from 'img/logoi.svg'

@inject('mainStore')
class Chat extends React.Component {
  constructor(props) {
    super(props)

    let params = new URLSearchParams(this.props.location.search)
    let code = params.get("code")
    let head = params.get("head").replace(/\'/g, "")
    let nick = params.get("nick")

   //  let code = 'ocD9LwSM2vTrXkvQ9JcB8HMrR7aM'
   //  let nick = '慢清尘'
   //  let head = 
   // 'http://thirdwx.qlogo.cn/mmopen/7vl0y4QMR4D4QhbTjn21xI3icTougoEKJgVv9tnqShbBiamOqlib40hCEGeCLIyXjkxWEc8AsWFTnIuf7vSWJY37b50G22QZXbC/132'

    this.state = {
      uid: null,
      user: code,
      msg: "",
      data: [],
      head: head,
    }

    this.socket = io(API_SERVER)
    this.socket.emit('user:login', {user: code, head: head})


    this.socket.on('response', (r)=>{
        console.log(r);
        switch(r.type) {
          case "user:login": 
            let uid = r.data.uid
            this.setState({uid: uid })
            break;
          case "message:send": 
            let { data } = this.state
            data.push(r.data.msg)
            this.setState({data: data}, ()=>{ this.scrollToBottom('messages') })
            break;
          case "err":
            message.info(r.data)
            break;
          default: console.log(r)
        }
    })
  }

  async componentDidMount() {
    
  }

  componentWillUnmount() {
    let user = {
      userId: this.state.uid,
      username: this.state.user,
    }
    this.socket.emit('user:logout', {user: user})
  }

  doSendMsg = (e)=>{
    if (this.state.msg === "") {
      message.error('请输入发送内容！')
      return
    }

    let msg = {
      content: this.state.msg,
      from:    this.state.uid,
      time:    dayjs().format('YYYY-MM-DD HH:mm:ss'),
      to:      'system',
    }
    this.socket.emit('message:send', { msg: msg })
    this.setState({msg: ''})
  }

  scrollToBottom = (name)=>{
    if (this.refs[name]) {
      this.refs[name].scrollTop = this.refs.messages.scrollHeight
    }
    document.body.scrollTop = document.body.scrollTop
  }


  render() {
    let {data, user, uid, head} = this.state

    console.log(uid)

    return (
      <div className="g-chat">
        <div className="m-chat">
          <div className="m-main" ref="messages">
            {data.map((item,i)=>
              <div className="m-msg" key={i}>
                {(parseInt(item.from)===parseInt(uid)) &&
                <div className="m-msg-wrap" key={i}>
                  <label><img src={head}/></label>
                  <span className="m-from">{item.content}</span>
                </div>}

                {(parseInt(item.to)===parseInt(uid)) &&
                <div className="m-msg-wrap sys" key={i}>
                  <label><img src={sys_icon} /></label>
                  <span className="m-to">{item.content}</span>
                </div>}
              </div>
            )}

          </div>
          <div className="m-footer">
            <input type="text" placeholder="请输入内容..." value={this.state.msg} onChange={e => this.setState({msg: e.target.value})}/>
            <span onClick={this.doSendMsg}> 发送</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat