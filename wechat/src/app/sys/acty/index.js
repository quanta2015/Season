import React from "react";
import { inject } from 'mobx-react'
import "./index.less";
import { Table, Input, Icon, Select, Button, Tag, Popconfirm, Form, message } from 'antd';
import Highlighter from 'react-highlight-words';
import {API_SERVER} from 'constant/apis'

var tpList = ['线下','征集']


@inject('mainStore')
class Acty extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'ID',
        dataIndex: 'key',
        align: 'center',
        className: 'm-tb-id',
      },{
        title: '类型',
        dataIndex: 'type',
        className: 'm-tb-type',
        ...this.getColumnSearchProps('type'),
      },{
        title: '主题',
        dataIndex: 'title',
        className: 'm-tb-title',
        ...this.getColumnSearchProps('title'),
      },{
        title: '对象',
        dataIndex: 'target',
      },{
        title: '功能',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.id)}>
              <Tag color="red">删除</Tag>
            </Popconfirm>
          ) : null,
      },
    ]

    this.state = {
      dataSource: [],
      count: 0,
      type: tpList[0],
      actImgList: [],
      qrcode: null,
      open: false,
    }
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });


  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleDelete = async(key) => {
    // const dataSource = [...this.state.dataSource];
    // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    let params = { id: key }
    this.setState({ loading: true })
    let r = await this.props.mainStore.delAct(params)
    r.acts.forEach((item,i)=>{ item.key = i+1})
    this.setState({ loading: false, dataSource: r.acts, count:r.acts.length })
    message.info("删除数据成功")

  };

  async componentDidMount() {
    this.setState({ loading: true })
    let r = await this.props.mainStore.getAct()
    r.acts.forEach((item,i)=>{ item.key = i+1})
    this.setState({ loading: false, dataSource: r.acts, count:r.acts.length })
  }


  doApply = (e)=>{
    e.preventDefault()
    this.props.form.validateFields( async (err, values) => {
      if (!err) {
        values.qrcode = this.state.qrcode
        values.actImgList = this.state.actImgList
        values.type = this.state.type

        this.setState({ loading: true })
        let r = await this.props.mainStore.addAct(values)
        r.acts.forEach((item,i)=>{ item.key = i+1})
        this.setState({ 
          loading: false, 
          dataSource: r.acts, 
          count:r.acts.length, 
          actImgList:[], 
          qrcode: null
        })
      }
    })
  }

  

  upload = async(tp, e) => {
    if (e.target.files.length < 1) return;
    var file = e.target.files[0]
    this.setState({ loading: true })
    let r = await this.props.mainStore.uploadImg(file)

    if (tp === 'act') {
      let { actImgList } = this.state
      actImgList.push(r.data.path)
      this.setState({ actImgList })
    }else {
      let { qrcode } = this.state
      qrcode = r.data.path
      this.setState({ qrcode })
    }
  }

  handleDel =(i,tp)=>{
    switch(tp) {
      case 'qr': this.setState({ qrcode: null});break;
      case 'act': 
        let {actImgList} = this.state
        actImgList.splice(i,1)
        this.setState({actImgList})
    }
  }



  render() {
    const { dataSource, type, actImgList, qrcode, open } = this.state
    const columns = this.columns
    const { getFieldDecorator } = this.props.form;

    return (
      <div className='g-sysproj'>
        <div className="m-main">
          <div className="m-fun">
            <span className="c-red" onClick={e=>this.setState({open: true})}    type="primary"> 添加</span>
          </div>
          
          <Table
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
        </div>

        
        { (open) && 
        <div className="g-add">
          <div className="m-add">
            <div className="m-type">
              <Select defaultValue="线下" style={{ width: 120 }} onChange={e=>this.setState({type: e})}>
                {tpList.map((item,i)=> <Option key ={i} value={item}>{item}</Option> )}
              </Select>

            </div>
            <Form className="m-appy-form">
              <Form.Item label="活动主题">
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: '请输入活动主题！' }],
                  initialValue:''
                })(<Input.TextArea placeholder="请输入活动主题..."/>)}
              </Form.Item>
              <Form.Item label="活动对象">
                {getFieldDecorator('target', {
                  rules: [{ required: true, message: '请输入活动对象！' }],
                  initialValue: '' 
                })(<Input placeholder="请输入活动对象..."/>)}
              </Form.Item>
              <Form.Item label="报名方式">
                {getFieldDecorator('msg', {
                  rules: [{ required: true, message: '请输入报名方式！' }],
                  initialValue: '' 
                })(<Input.TextArea  placeholder="请输入报名方式..."/>)}
              </Form.Item>

              {(type=='线下') && <>
                <Form.Item label="活动地点">
                  {getFieldDecorator('addr', {
                    rules: [{ required: true, message: '请输入活动地点！' }],
                    initialValue: '' 
                  })(<Input.TextArea  placeholder="请输入活动地点..."/>)}
                </Form.Item>
                <Form.Item label="活动时间">
                  {getFieldDecorator('dt', {
                    rules: [{ required: true, message: '请输入活动时间！' }],
                    initialValue: '' 
                  })(<Input  placeholder="请输入活动时间..."/>)}
                </Form.Item>
                <Form.Item label="活动内容">
                  {getFieldDecorator('cnt', {
                    rules: [{ required: true, message: '请输入活动内容！' }],
                    initialValue: '' 
                  })(<Input.TextArea  placeholder="请输入活动内容..."/>)}
                </Form.Item>
                <Form.Item label="收费标准">
                  {getFieldDecorator('charge', {
                    rules: [{ required: true, message: '请输入收费标准！' }],
                    initialValue: '' 
                  })(<Input.TextArea  placeholder="请输入收费标准..."/>)}
                </Form.Item>
              </>}


              {(type=='征集') && <>
                <Form.Item label="活动形式">
                  {getFieldDecorator('form', {
                    rules: [{ required: true, message: '请输入活动形式！' }],
                    initialValue: '' 
                  })(<Input.TextArea  placeholder="请输入活动地点..."/>)}
                </Form.Item>
                <Form.Item label="注意事项">
                  {getFieldDecorator('note', {
                    rules: [{ required: true, message: '请输入注意事项！' }],
                    initialValue: '' 
                  })(<Input.TextArea  placeholder="请输入注意事项..."/>)}
                </Form.Item>
                <Form.Item label="奖项设置">
                  {getFieldDecorator('award', {
                    rules: [{ required: true, message: '请输入奖项设置！' }],
                    initialValue: '' 
                  })(<Input.TextArea  placeholder="请输入奖项设置..."/>)}
                </Form.Item>
              </>}


              <div className="m-img">
                <label>活动图片</label>
                <div className="m-img-wrap">
                  {actImgList.map((item,i)=>
                    <div className="m-item" key={i}>
                      <div className="u-del" onClick={this.handleDel.bind(this,i,'act')}></div>
                      <img src={`${API_SERVER}/${item}`}/>
                    </div>
                  )}
                  <div className="m-item">
                    <input type="file" className="u-upload" accept="image/*" onChange={this.upload.bind(this,'act')}/>
                    <div className="u-img-add"></div>
                  </div>
                </div>
              </div>

              <div className="m-img">
                <label>二维码</label>
                <div className="m-img-wrap">
                  {(qrcode)? 
                    (<div className="m-item">
                      <div className="u-del" onClick={this.handleDel.bind(this,null,'qr')}></div>
                      <img src={`${API_SERVER}/${qrcode}`}/>
                    </div>):(

                  <div className="m-item">
                    <input type="file" className="u-upload" accept="image/*" onChange={this.upload.bind(this,'qr')}/>
                    <div className="u-img-add"></div>
                  </div>)}
                </div>
              </div>


              <div class="m-fun">
                <Button type="default" onClick={e=>this.setState({ open: false})} block>取 消</Button>
                <Button type="primary" onClick={this.doApply} block>提 交</Button>
              </div>
            </Form>
          </div>

        </div>}
      </div>
    );
  }
}

export default Form.create()(Acty)
