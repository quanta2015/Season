import React from 'react'
import dayjs from 'dayjs'
import { inject } from 'mobx-react'

import io from "socket.io-client";
// import { Event, SocketContext } from 'react-socket-io';

import './index.less'



// Chat.contextType = ReactSocketIO.SocketContext;

@inject('mainStore')
class Chats extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      uid: null,
      user: 'tom',
      msg: "",
      data: [],
      userlist: [],
      cur: 0,
    }

    this.socket = io('localhost')
    this.socket.emit('user:login-sys')

    this.socket.on('response', (r)=>{
        console.log(r);
        switch(r.type) {
          case 'user:login': this.setState({uid: r.data.userId});break;
          case 'message:send': 
            let { userlist } = this.state
            userlist.forEach(item=>{
              if ((item.userId === r.data.msg.from)||(item.userId === r.data.msg.to)) {
                item.msg.push(r.data.msg)
              }
            })

            // data.push(r.data.msg)
            this.setState({userlist: userlist}, ()=>{ this.scrollToBottom('messages') })
            break;

          case 'user:list': this.setState({userlist: r.data});break;

          default: ;
        }
    })
  }

  

  async componentDidMount() {
    document.querySelector('.g-menu').classList.add('fn-hide')
    document.querySelector('.g-menu-wrap').classList.add('fn-hide')

    this.socket.emit('user:list')
  }

  componentWillUnmount() {
    this.socket.emit('user:logout-sys')
  }

  doSendMsg = (e)=>{
    let { userlist,cur } = this.state
    let msg = {
      content: this.state.msg,
      from:    'system',
      time:    dayjs().format('YYYY-MM-DD HH:mm:ss'),
      to:      userlist[cur].userId,
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
    let {data, user, uid, userlist, cur} = this.state
    let msgs = (userlist.length>0)?userlist[cur].msg:[]

    console.log(msgs)

    return (
      <div className="g-chats">
        一对一服务应用

        <div className="m-chats">
          <div className="m-list">
            {userlist.map((item,i)=>
              <span key={i} onClick={e=> this.setState({cur: i})}>{item.username}</span>
            )}

          </div>
          <div className="m-main" ref="messages">
            {msgs.map((item,i)=>
              

              <>
                {(item.from==='system') &&
                <div className="m-msg-wrap" key={i}>
                  <label>system</label>
                  <span className="m-from">{item.content}</span>
                </div>}

                {(item.to==='system') &&
                <div className="m-msg-wrap cli" key={i}>
                  <label>{userlist[cur].username}</label>
                  <span className="m-to">{item.content}</span>
                </div>}
              </>
            )}
          </div>
        </div>
        
        <div className="m-footer">
          <input type="text" placeholder="请输入内容..." value={this.state.msg} onChange={e => this.setState({msg: e.target.value})}/>
          <span onClick={this.doSendMsg}> 发送</span>
        </div>
      </div>
      
    )
  }
}

export default Chats