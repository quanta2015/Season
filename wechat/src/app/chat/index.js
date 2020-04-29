import React from 'react'
import dayjs from 'dayjs'
import { inject } from 'mobx-react'
import io from "socket.io-client";
import './index.less'


@inject('mainStore')
class Chat extends React.Component {
  constructor(props) {
    super(props)

    let username = `tom${parseInt(Math.random()*10)}`

    this.state = {
      uid: null,
      user: username,
      msg: "",
      data: [],
    }

    this.socket = io('localhost')
    this.socket.emit('user:login', {user: this.state.user})


    this.socket.on('response', (r)=>{
        console.log(r);
        switch(r.type) {
          case "user:login": this.setState({uid: r.data.userId});break;
          case "message:send": 
            let { data } = this.state
            data.push(r.data.msg)
            this.setState({data: data}, ()=>{ this.scrollToBottom('messages') })
            break;

          default: console.log(r);;
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
      this.refs[name].scrollTop = this.refs.messages.scrollHeight;
    }
  }


  render() {
    let {data, user, uid} = this.state

    console.log(uid)

    return (
      <div className="g-chat">
        chat

        <div className="m-chat">
          <div className="m-main" ref="messages">
            {data.map((item,i)=>
              <>
                {(parseInt(item.from)===parseInt(uid)) &&
                <div className="m-msg-wrap">
                  <label>{user}</label>
                  <span className="m-from">{item.content}</span>
                </div>}

                {(parseInt(item.to)===parseInt(uid)) &&
                <div className="m-msg-wrap sys">
                  <label>system</label>
                  <span className="m-to">{item.content}</span>
                </div>}
              </>
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