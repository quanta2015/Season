import React from "react";
import { inject } from 'mobx-react'
import "./index.less";
import { Table, Input,Tag, Button, Popconfirm, Form, message } from 'antd';


const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)
const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input.TextArea ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
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
class Intr extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: '序号',
        dataIndex: 'key',
        width: '10%',
        align: 'center',
      },{
        title: '描述',
        dataIndex: 'desc',
        editable: true,
        width: '80%',
        align: 'left',
      },{
        title: '功能',
        dataIndex: 'operation',
        width: '10%',
        align: 'center',
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

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  async componentDidMount() {
    this.setState({ loading: true })
    let r = await this.props.mainStore.getUnionInfo()
    r.unioninfo.forEach((item,i)=>{ item.key = i+1})
    this.setState({ loading: false, dataSource: r.unioninfo, count:r.unioninfo.length })
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
    let r = await this.props.mainStore.saveUnionInfo(params)
    r.unioninfo.forEach((item,i)=>{ item.key = i+1})
    this.setState({ loading: false, dataSource: r.unioninfo, count:r.unioninfo.length })
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
      <div className='g-sysintr'>

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


export default Intr;
