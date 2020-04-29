import React from 'react'
import { inject } from 'mobx-react'
import './index.less'


class Hist extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    window.location.replace(`https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI0MjkzNDEyOA==&scene=124#wechat_redirect`)
    
  }


  render() {
    return (
      <div className="g-hist"></div>
    )
  }
}

export default Hist