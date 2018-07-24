---
order: 4
chinese: 表格信息增删动画
english: TableAddAndDelete
image: https://zos.alipayobjects.com/rmsportal/wJDizWNyyxVhULT.png
---

对表格里的信息进行操作后的一个动画效果。

---

点击 Add 按钮为添加，Delete 为删除。

由于接近视频演示需要变动高度，所以此示例破坏了 table 的布局，如不想破坏表格的布局可以把 height 的动画去掉或可查看 [animate的实现方法](http://react-component.github.io/table/examples/animation.html)

此效果为设计语言里的对象增加与对象删除的实现。[查看视频演示](/language/interact)

```jsx
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types';
import { TweenOneGroup } from 'rc-tween-one';

class TableEnterLeave extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: 'table-enter-leave-demo',
  };

  constructor(props) {
    super(props);
    this.columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Age', dataIndex: 'age', key: 'age' },
      { title: 'Address', dataIndex: 'address', key: 'address' },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (text, record) => (
          <span
            className={`${this.props.className}-delete`}
            onClick={(e) => { this.onDelete(record.key, e); }}
          >
            Delete
          </span>),
      },
    ];
    this.enterAnim = [
      {
        opacity: 0, x: 30, backgroundColor: '#fffeee', duration: 0,
      },
      {
        height: 0,
        duration: 200,
        type: 'from',
        delay: 250,
        ease: 'easeOutQuad',
        onComplete: this.onEnd,
      },
      {
        opacity: 1, x: 0, duration: 250, ease: 'easeOutQuad',
      },
      { delay: 1000, backgroundColor: '#fff' },
    ];
    this.leaveAnim = [
      { duration: 250, opacity: 0 },
      { height: 0, duration: 200, ease: 'easeOutQuad' },
    ];
    this.data = [
      {
        key: 1,
        name: 'John Brown',
        age: 32,
        address: 'New York No.1 Lake Park',
      },
      {
        key: 2,
        name: 'Jim Green',
        age: 42,
        address: 'London No.1 Lake Park',
      },
      {
        key: 3,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No.1 Lake Park',
      },
      {
        key: 4,
        name: 'Jim Red',
        age: 18,
        address: 'London No.1 Lake Park',
      },
    ];
    this.currentPage = 1;
    this.state = {
      data: this.data,
      page: 1
    };
  }

  onEnd = (e) => {
    const dom = e.target;
    dom.style.height = 'auto';
  }

  onAdd = () => {
    const { data } = this.state;
    const i = Math.round(Math.random() * (this.data.length - 1));
    data.unshift({
      key: Date.now(),
      name: this.data[i].name,
      age: this.data[i].age,
      address: this.data[i].address,
    });
    this.setState({
      data,
    });
  };

  onDelete = (key, e) => {
    e.preventDefault();
    const data = this.state.data.filter(item => item.key !== key);
    this.setState({ data });
  }

  pageChange = (pagination) => {
    this.setState({
      page: pagination.current
    });
  };

  render() {
    const body = {};
    if (this.state.page !== this.currentPage) {
      this.currentPage = this.state.page;
      // 待 rc-table 修复
      // body.wrapper = (props) => props.children;
    } else {
      body.wrapper = props => (
        <TweenOneGroup
          component="tbody"
          {...props}
          className={props.className}
          enter={this.enterAnim}
          leave={this.leaveAnim}
          appear={false}
          exclusive
        >
          {props.children}
        </TweenOneGroup>
      );
    }
    return (
      <div>
        <div className={`${this.props.className}-wrapper`}>
          <div className={this.props.className}>
            <div className={`${this.props.className}-header`}>
              <ul>
                <li />
                <li />
                <li />
                <li />
                <li />
              </ul>
            </div>
            <div className={`${this.props.className}-nav`}>
              <span>
                <img
                  height="24"
                  src="https://zos.alipayobjects.com/rmsportal/TOXWfHIUGHvZIyb.svg"
                />
                <img
                  height="14"
                  src="https://zos.alipayobjects.com/rmsportal/bNfCyCcgnyTgRmz.svg"
                />
              </span>
            </div>
            <div className={`${this.props.className}-list`}>
              <QueueAnim type="bottom" component="ul">
                <li key="0" />
                <li key="1" />
                <li key="2" />
                <li key="3" />
                <li key="4" />
              </QueueAnim>
            </div>
            <div className={`${this.props.className}-table-wrapper`}>
              <div className={`${this.props.className}-action-bar`}>
                <Button type="primary" onClick={this.onAdd}>Add</Button>
              </div>
              <Table
                columns={this.columns}
                pagination={{ pageSize: 4 }}
                dataSource={this.state.data}
                className={`${this.props.className}-table`}
                components={{ body }}
                onChange={this.pageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ReactDOM.render(
  <TableEnterLeave />
, mountNode);
```

```css
/* 外壳样式 */
.table-enter-leave-demo-wrapper {
  position: relative;
  background: #ABC3FF;
  overflow: hidden;
  height: 500px;
}

.table-enter-leave-demo {
  margin: 40px auto;
  box-shadow: 0 10px 40px #506CB2;
  width: 60%;
  min-width: 550px;
  height: 420px;
  background: #F4F4F4;
  border-radius: 6px;
  overflow: hidden;
}

.table-enter-leave-demo-header {
  height: 32px;
  line-height: 32px;
  background: #D8D8D8;
}

.table-enter-leave-demo-header ul li {
  list-style: none;
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 4px;
  margin: 0 5px 0 0;
}

.table-enter-leave-demo-header ul li:nth-child(1) {
  background: #CF3333;
  margin-left: 3%;
}

.table-enter-leave-demo-header ul li:nth-child(2) {
  background: #DEC811;
}

.table-enter-leave-demo-header ul li:nth-child(3) {
  background: #28C026;
}

.table-enter-leave-demo-header ul li:nth-child(4) {
  background: #fff;
  width: 80%;
  height: 16px;
  vertical-align: middle;
  margin: 0 10px;
}

.table-enter-leave-demo-header ul li:nth-child(5),
.table-enter-leave-demo-header ul li:nth-child(5):before,
.table-enter-leave-demo-header ul li:nth-child(5):after {
  width: 20px;
  height: 2px;
  background: #BABABA;
  border-radius: 2px;
}

.table-enter-leave-demo-header ul li:nth-child(5) {
  vertical-align: middle;
  margin-left: 5px;
  position: relative;
}

.table-enter-leave-demo-header ul li:nth-child(5):before,
.table-enter-leave-demo-header ul li:nth-child(5):after {
  content: '';
  display: block;
  position: absolute;
}

.table-enter-leave-demo-header ul li:nth-child(5):before {
  top: -6px;
}

.table-enter-leave-demo-header ul li:nth-child(5):after {
  top: 6px;
}

/* 外壳 end */

.table-enter-leave-demo-nav {
  height: 50px;
  background: #080B20;
  line-height: 50px;
}

.table-enter-leave-demo-nav span {
  margin-left: 20px;
}

.table-enter-leave-demo-nav img:first-child {
  filter: grayscale(1) brightness(3);
}

.table-enter-leave-demo-nav img:last-child {
  margin-left: 10px;
}

.table-enter-leave-demo-list {
  width: 20%;
  height: calc(100% - 82px);
  display: inline-block;
  background: #171C3E;
}

.table-enter-leave-demo-list ul li {
  width: 80%;
  height: 15px;
  background: #23274A;
  margin: 20px auto;
  border-radius: 4px;
}

.table-enter-leave-demo-table-wrapper {
  width: 80%;
  display: inline-block;
  overflow: auto;
  height: calc(100% - 82px);
}

.table-enter-leave-demo-action-bar {
  margin: 20px;
  background: #fff;
  line-height: 40px;
  height: 40px;
  position: relative;
  border-radius: 4px;
}

.table-enter-leave-demo-action-bar:before, .table-enter-leave-demo-action-bar:after {
  content: '';
  display: inline-block;
  background: #E5E5E5;
  vertical-align: middle;
}

.table-enter-leave-demo-action-bar:before {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  margin-left: 10px;
}

.table-enter-leave-demo-action-bar:after {
  position: absolute;
  width: 100px;
  height: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 40px;
}

.table-enter-leave-demo-action-bar button {
  position: absolute;
  right: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 80px;
  height: 20px;
  border-radius: 4px;
  line-height: 1;
}

.table-enter-leave-demo-delete {
  color: #019BF0;
  cursor: pointer;
}

.table-enter-leave-demo-table {
  margin: 0 20px;
}

.table-enter-leave-demo-table .ant-table-thead > tr > th {
  background: #E5E5E5;
  padding: 10px 8px;
  display: inline-block;
}
.table-enter-leave-demo-table .ant-table-tbody > tr{
  background: #fff;
  /* 不能用
  border-bottom: 1px solid #e9e9e9;
  */
}
.table-enter-leave-demo-table .ant-table-tbody > tr > td {
  padding: 10px 8px;
  display: inline-block;
  vertical-align: bottom;
}


.table-enter-leave-demo-table .ant-table-thead > tr, .table-enter-leave-demo-table .ant-table-tbody > tr {
  display: block;
}

.table-enter-leave-demo-table .ant-table-thead > tr, .table-enter-leave-demo-table .ant-table-tbody > tr {
  transition: none;
}
.table-enter-leave-demo-table .ant-table-thead > tr > th:nth-child(1), .table-enter-leave-demo-table .ant-table-tbody > tr > td:nth-child(1) {
  width: 25%;
}
.table-enter-leave-demo-table .ant-table-thead > tr > th:nth-child(2), .table-enter-leave-demo-table .ant-table-tbody > tr > td:nth-child(2) {
  width: 15%;
}
.table-enter-leave-demo-table .ant-table-thead > tr > th:nth-child(3), .table-enter-leave-demo-table .ant-table-tbody > tr > td:nth-child(3) {
  width: 40%;
}
.table-enter-leave-demo-table .ant-table-thead > tr > th:nth-child(4), .table-enter-leave-demo-table .ant-table-tbody > tr > td:nth-child(4) {
  width: 20%;
}

@media screen and (max-width: 414px) {
  .table-enter-leave-demo {
    transform: scale(.65) translateX(12px);
    transform-origin: left center;
  }
}
@media screen and (max-width: 375px) {
  .table-enter-leave-demo {
    transform: scale(.6) translateX(7px);
  }
}
@media screen and (max-width: 320px) {
  .table-enter-leave-demo {
    transform: scale(.5) translateX(12px);
  }
}
```
