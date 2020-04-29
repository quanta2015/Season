import React from "react";
import { inject } from 'mobx-react'
import "./index.less";
import intr01 from "img/intr01.png";
import intr02 from "img/intr02.png";
import intr03 from "img/intr03.png";
import intr04 from "img/intr03.png";

import logol from "img/logol.svg";
import logoi from "img/logoi.svg";
import logo  from "img/logo.svg";


@inject('mainStore')
class Intr extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      unioninfo: [],
    }
  }

  async componentDidMount() {
    this.setState({ loading: true })
    let r = await this.props.mainStore.getUnionInfo()
    this.setState({ loading: false, unioninfo: r.unioninfo})
  }

  render() {
    let { unioninfo } = this.state

    // console.log(unioninfo)


    return (
      <div className='g-intr'>
        <header>
          <div className="m-logo">
            <img src={intr01}/>
          </div>
          <div className="m-txt">
            <img src={logol}/>
          </div>
        </header>

        <div className="m-main">
          {unioninfo.map((item,i)=>
            <div key={i}>
              <div className="u-idx"><span>{(i+1).toString().padStart(2,'0')}</span></div>
              <p>{item.desc}</p>
            </div>
          )}
        </div>

        <footer>
          <div className="m-txt">
            <img src={logo}/>
          </div>
          <div className="m-info">
            <span>四季惠享服务中心</span>
            <span>浙ICP备xxxxxxx号-1</span>
            <span>2020@All Rights Researved</span>
          </div>
        </footer>
      </div>
    );
  }
}


export default Intr;
