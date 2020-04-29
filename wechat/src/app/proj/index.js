import React from 'react'
import { inject } from 'mobx-react'
import './index.less'

@inject('mainStore')
class Proj extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      projects: [],
    }
  }

  async componentDidMount() {
    this.setState({ loading: true })
    let r = await this.props.mainStore.getProject()
    this.initMap(r.projects)
    this.setState({ loading: false, projects: r.projects})
  }

  initMap = (data)=>{
    const { BMapGL }=window;
    var map = new BMapGL.Map("unmap")

    map.enableScrollWheelZoom(true);
    var scaleCtrl = new BMapGL.ScaleControl()
    map.addControl(scaleCtrl);
    var zoomCtrl = new BMapGL.ZoomControl()
    map.addControl(zoomCtrl)

    var point = new BMapGL.Point(120.220134,30.267188)
    map.centerAndZoom(point, 15)

    data.map(item=>{
      let poi = new BMapGL.Point(item.lat,item.lng)
      var marker = new BMapGL.Marker(poi)
      map.addOverlay(marker)
      var opts = { title: `<label>${item.area}</label><span>${item.name}</span>` }
      var cnts = `<div class="m-item"><label>主培项目: </label><span>艺术绘画</span></div><div class="m-item"><label>地址: </label><span>${item.addr}</span></div><div class="m-item"><img src="#"/><img src="#"/><img src="#" /><img src="#"/></div>`
      var infoWindow = new BMapGL.InfoWindow(cnts, opts)
      marker.addEventListener("click", function(){          
          map.openInfoWindow(infoWindow, poi)
      }) 
    })
  }

  render() {
    return (
      <div className="g-about">
        <div id="unmap" className="m-map"></div>
      </div>
    )
  }
}

export default Proj