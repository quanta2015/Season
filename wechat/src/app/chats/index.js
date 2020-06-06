import React from 'react'
import dayjs from 'dayjs'
import { inject } from 'mobx-react'
import { message } from 'antd'
import io from "socket.io-client";
import './index.less'
import { API_SERVER } from 'constant/apis'
import sys_icon from 'img/logoi.svg'

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

    this.socket = io(API_SERVER)
    this.socket.emit('user:login-sys')

    this.socket.on('response', (r)=>{
        let { userlist } = this.state

        switch(r.type) {
          case 'user:login': this.setState({uid: r.data.userId});break;
          case 'message:send': 
            userlist.forEach(item=>{
              if ((item.uid === r.data.msg.from)||(item.uid === r.data.msg.to)) {
                item.msg.push(r.data.msg)
              }
            })

            // data.push(r.data.msg)
            this.setState({userlist: userlist}, ()=>{ this.scrollToBottom('messages') })
            break;

          case 'user:list': 
            // console.log(r.data);
            this.setState({userlist: r.data})
            break;

          case 'add': 
            r.data.msg = []
            userlist.push( r.data )
            this.setState({userlist: userlist})
            break;

          case 'del':

            userlist.forEach((item,i,arr)=>{
              if (item.user === r.data.user) {
                // console.log('sss')
                arr.splice(i,1)
              }
            })
            this.setState( {userlist: userlist})

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

    if (this.state.msg === "") {
      message.error('请输入发送内容！')
      return
    }else if (userlist.length === 0) {
      return
    }

    let msg = {
      content: this.state.msg,
      from:    'system',
      time:    dayjs().format('YYYY-MM-DD HH:mm:ss'),
      to:      userlist[cur].uid,
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

    // console.log(msgs)

    return (
      <div className="g-chats">
        一对一服务应用

        <div className="m-chats">
          <div className="m-list">
            {userlist.map((item,i)=>
              <div className="m-uc" key={i} onClick={e=> this.setState({cur: i})}>
                <img src={item.head}/>
                <span>{item.user}</span>
              </div>
              
            )}

          </div>
          <div className="m-main" ref="messages">
            {msgs.map((item,i)=>
              <div className="m-msg" key={i}>
                {(item.from==='system') &&
                <div className="m-msg-wrap">
                  <label><img src={sys_icon} /></label>
                  <span className="m-from">{item.content}</span>
                </div>}

                {(item.to==='system') &&
                <div className="m-msg-wrap cli">
                  <label><img src={userlist[cur].head}/></label>
                  <span className="m-to">{item.content}</span>
                </div>}
              </div>
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