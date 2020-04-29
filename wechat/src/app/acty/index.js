import React from 'react'
import { inject } from 'mobx-react'
import { Icon, Tag, Result, Spin,Input,Button,AutoComplete,message, Carousel } from 'antd'
import './index.less'
import addr from 'img/addr.svg'
import icon_return from 'img/icon_return.svg'

import { API_SERVER } from 'constant/apis'

@inject('mainStore')
class Acty extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      acts: [],
      cur: 1,
    }
  }

  async componentDidMount() {

    this.setState({ loading: true })
    let r = await this.props.mainStore.getAct()
    this.setState({ loading: false, acts: r.acts})
  }

  showDetail=(e)=>{
    console.log(e)
    this.setState({ cur: e, show: true })
  }

  close =()=>{
    this.setState({ show: false })
  }


  render() {
    let {acts,cur,show} = this.state
    let act = (acts.length>0)?acts[cur]:null
    let imgs = (acts.length>0)?acts[cur].pic.split('|'):[]

    console.log(acts)

    return (
      <div className="g-acty">
        <div className="m-acty">
          {acts.map((item,i)=>
            <div className="m-item" key={i} onClick={this.showDetail.bind(this,i)}>
              <div className="m-tl">
                <i>{i+1}</i>
                <h1>{item.title}</h1>

                {(item.type==='线下')? (<Tag color="#0499ee">{item.type}</Tag>):(<Tag color="#ee6600">{item.type}</Tag>)}
                
              </div>
              <div className="m-cnt">
                <label>{item.target}</label>
                <span>详 情</span>
              </div>
            </div>
          )}
        </div>

        {act && show &&
        <div className="m-detail">
          <div className="m-title">
            <img src={icon_return} onClick={this.close} />
            <span>{act.title}</span>
          </div>

          <div className="m-bd">
            <Carousel autoplay effect="fade">
              {imgs.map((item,i)=>
                <li className="m-img"><img src={`${API_SERVER}/${item}`}/></li>
              )}
            </Carousel>
            
            <div className="m-row">
              <label>活动主题</label>
              <span>{act.title}</span>
            </div>
            
            <div className="m-row">
              <label>活动对象</label>
              <span>{act.target}</span>
            </div>
            <div className="m-row">
              <label>报名方式</label>
              <span>{act.regmd}</span>
            </div>


            {(act.type==='线下')?
              (<>
                <div className="m-row">
                  <label>活动地点</label>
                  <span>{act.addr}</span>
                </div>
                <div className="m-row">
                  <label>活动时间</label>
                  <span>{act.dt}</span>
                </div>
                <div className="m-row">
                  <label>活动内容</label>
                  <span>{act.cnt}</span>
                </div>
                <div className="m-row">
                  <label>收费标准</label>
                  <span>{act.charge}</span>
                </div>
                <div className="m-row">
                  <label>二维码</label>
                  <div className="m-qr"><img src={`${API_SERVER}/${act.qrcode}`}/></div>
                </div>
                </>)
              :
              (<><div className="m-row">
                  <label>活动形式</label>
                  <span>{act.form}</span>
                </div>
                <div className="m-row">
                  <label>注意事项</label>
                  <span>{act.note}</span>
                </div>
                <div className="m-row">
                  <label>奖项设置</label>
                  <span>{act.award}</span>
                </div>
                <div className="m-row">
                  <label>二维码</label>
                  <div className="m-qr"><img src={`${API_SERVER}/${act.qrcode}`}/></div>
                </div>
              </>)
            }
          </div>
        </div>}

      </div>
    )
  }
}

export default Acty