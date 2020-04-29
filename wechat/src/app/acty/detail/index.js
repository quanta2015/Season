import React from 'react'
import { inject } from 'mobx-react'
import { Icon, Tag, Result, Spin,Input,Button,AutoComplete,message } from 'antd'
import './index.less'

@inject('mainStore')
class Detail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      acts: [],
    }
  }

  async componentDidMount() {

    this.setState({ loading: true })
    let r = await this.props.mainStore.getAct()
    this.setState({ loading: false, acts: r.acts})


  }


  render() {
    let {acts} = this.state

    console.log(acts)

    return (
      <div className="g-acty">
        <div className="m-acty">
          {acts.map((item,i)=>
            <div className="m-item" key={i}>
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
      </div>
    )
  }
}

export default Detail