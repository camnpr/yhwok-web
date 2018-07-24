---
order: 4
title: 自定义动画进出场
---

通过 `animConfig` 来自定义动画进出场。

````jsx
import Button from 'antd/lib/button';
import QueueAnim from 'rc-queue-anim';

class Test extends React.Component{
  state = {
    show: true,
  };
  onClick = () => {
    this.setState({
      show: !this.state.show,
    });
  }
  render() {
    return (
      <div className="queue-demo">
        <p className="buttons">
          <Button type="primary" onClick={this.onClick}>切换</Button>
        </p>
        <QueueAnim className="demo-content"
          animConfig={[
            { opacity: [1, 0], translateY: [0, 50] },
            { opacity: [1, 0], translateY: [0, -50] }
          ]}>
          {this.state.show ? [
            <div className="demo-thead" key="a">
              <ul>
                <li />
                <li />
                <li />
              </ul>
            </div>,
            <div className="demo-tbody" key="b">
              <ul>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          ] : null}
        </QueueAnim>
      </div>
    );
  }
};

ReactDOM.render(<Test />, mountNode);
````
