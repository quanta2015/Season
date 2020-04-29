import React from 'react'
import { inject } from 'mobx-react'
import './index.less'


@inject('mainStore')
class Ques extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quess: [],
    }
  }

  async componentDidMount() {

    this.setState({ loading: true })
    let r = await this.props.mainStore.getQues()
    this.setState({ loading: false, quess: r.quess})
  }

  render() {
    let {quess} = this.state

    console.log(quess)

    return (
      <div className="g-ques">
        <div className="m-title"> 常见问题</div>
        {quess.map((item,i)=>
          <div className="m-item">
            <label><i>Q{i+1}: </i> {item.question}</label>
            <span><i>A{i+1}: </i>{item.answer}</span>
          </div>
        )}
        


      </div>
    )
  }
}

export default Ques