import React from 'react'
import { Route } from 'react-router-dom'
import Loadable from 'component/Loadable'
import { inject } from 'mobx-react'
import './index.less'


var MENU_SYS = [
    { tl:'联盟介绍管理' },
    { tl:'主培项目管理' },
    { tl:'活动在线管理' },
    { tl:'常见问题管理' },
    { tl:'意见箱管理  ' }]


@inject('mainStore')
class Sys extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quess: [],
      id: 2,
    }
  }

  async componentDidMount() {
    document.querySelector('.g-menu').classList.add('fn-hide')
    document.querySelector('.g-menu-wrap').classList.add('fn-hide')
  }

  selMenu = (e)=>{
    if (e!==this.state.id) {
      this.setState({id:e})
    }
  }

  render() {
    let {quess, id} = this.state

    console.log(quess)

    return (
      <div className="g-sys">
        <div className="m-sys">
          <div className="m-bar">
            {MENU_SYS.map((item,index)=>
              <span className={`${(id == index)?'active':''}`} key={index} onClick={this.selMenu.bind(this,index)}>
                {item.tl}
              </span>
            )}
          </div>
          <div className="m-main">
            {(id == 0) && <Route component={Loadable({loader:()=>import('app/sys/intr')})} /> }
            {(id == 1) && <Route component={Loadable({loader:()=>import('app/sys/proj')})} /> }
            {(id == 2) && <Route component={Loadable({loader:()=>import('app/sys/acty')})} /> }
            
            {(id == 3) && <Route component={Loadable({loader:()=>import('app/sys/ques')})} /> }

            {(id == 5) && <Route component={Loadable({loader:()=>import('app/sys/msg')})} /> }
          </div>

        </div>
      </div>
    )
  }
}

export default Sys