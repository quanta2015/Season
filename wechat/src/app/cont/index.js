import React from 'react'
import './index.less'
import logoi from "img/logoi.svg";

var data = {
  "addr": "四季青街道社会服务管理中心4F",
  "mob": "15869147612",
  "per": "李老师",
  "email": "sjhxgylm@foxmail.com",
  "lat": 120.221638,
  "lng": 30.269322,
}

class Cont extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { BMapGL }=window;
    let map = new BMapGL.Map("unmap")


    map.enableScrollWheelZoom(true);
    let scaleCtrl = new BMapGL.ScaleControl()
    map.addControl(scaleCtrl);
    let zoomCtrl = new BMapGL.ZoomControl()
    map.addControl(zoomCtrl)

    let poi = new BMapGL.Point(data.lat,data.lng)
    map.centerAndZoom(poi, 17)
    
    let marker = new BMapGL.Marker(poi)
    map.addOverlay(marker)
    let opts = { title: `<img src=${logoi} /> <span>四季惠享服务中心</span>` }
    let cnts = `<div class="m-item"><label>负责教师: </label><span>${data.per}</span></div><div class="m-item"><label>联系电话: </label><span>${data.mob}</span></div><div class="m-item"><label> 电子邮件: </label><span>${data.email}</span></div><div class="m-item"><label>联系地址: </label><span>${data.addr}</span></div>`
    let infoWindow = new BMapGL.InfoWindow(cnts, opts)
    map.openInfoWindow(infoWindow, poi)
  }

  render() {
    return (
      <div className="g-cont">
        <div id="unmap" className="m-map"></div>
      </div>
    )
  }
}

export default Cont