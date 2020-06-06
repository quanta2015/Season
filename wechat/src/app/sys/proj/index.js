import React from "react";
import { inject } from 'mobx-react'
import "./index.less";
import { Table, Input, Icon, Button, Tag, Popconfirm, Form, message } from 'antd';
import Highlighter from 'react-highlight-words';


const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)
const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
  state = { editing: false }
  toggleEdit = () => {
    const editing = !this.state.editing
    this.setState({ editing }, () => {
      if (editing) { this.input.focus() }
    })
  }

  save = e => {
    const { record, handleSave } = this.props
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) { return }
      this.toggleEdit()
      handleSave({ ...record, ...values })
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props
    const { editing } = this.state
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [{ required: true, message: `${title} is required.` }],
          initialValue: record[dataIndex],
        })(<Input.TextArea ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={this.toggleEdit} >
        {children}
      </div>
    );
  };

  render() {
    const { editable,dataIndex,title,record,index,handleSave,children,...restProps} = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
};



@inject('mainStore')
class Proj extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'ID',
        dataIndex: 'key',
        align: 'center',
        className: 'm-tb-id',
      },{
        title: '区域',
        dataIndex: 'area',
        editable: true,
        className: 'm-tb-area',
        ...this.getColumnSearchProps('area'),
      },{
        title: '名称',
        dataIndex: 'name',
        editable: true,
        ...this.getColumnSearchProps('name'),
      },{
        title: '地址',
        dataIndex: 'addr',
        editable: true,
        ...this.getColumnSearchProps('addr'),
      },{
        title: '经度',
        dataIndex: 'lat',
        editable: true,
      },{
        title: '纬度',
        dataIndex: 'lng',
        editable: true,
      },{
        title: '功能',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.key)}>
              <Tag color="red">删除</Tag>
            </Popconfirm>
          ) : null,
      },
    ]

    this.state = {
      dataSource: [],
      count: 0,
    };
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

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  async componentDidMount() {
    this.setState({ loading: true })
    let r = await this.props.mainStore.getProject()
    r.projects.forEach((item,i)=>{ item.key = i+1})
    this.setState({ loading: false, dataSource: r.projects, count:r.projects.length })
  }

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count+1,
      desc: `xxx`
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  }

  handleSubmit=async ()=> {
    let params = this.state.dataSource
    this.setState({ loading: true })
    let r = await this.props.mainStore.saveProject(params)
    r.projects.forEach((item,i)=>{ item.key = i+1})
    this.setState({ loading: false, dataSource: r.projects, count:r.projects.length })
    message.info("保存数据成功")
  }

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    }

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    

    return (
      <div className='g-sysproj'>
        <div className="m-main">
          <div className="m-fun">
            <span className="c-red" onClick={this.handleAdd}    type="primary"> 添加</span>
            <span className="c-green" onClick={this.handleSubmit} type="primary"> 保存</span>
          </div>
          
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
        </div>

      </div>
    );
  }
}


export default Proj;
