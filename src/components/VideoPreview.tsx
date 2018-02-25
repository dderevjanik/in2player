import * as React from 'react';
import { Video } from '../types/Video';
import { style } from 'typestyle';
import { Row, Col } from 'antd';
import { px } from 'csx';

const base = style({
  cursor: 'pointer',
  padding: px(3)
});

const video = style({
  background: 'black',
  width: px(300),
  height: px(210),
  margin: '5px 10px 5px 10px',
  transition: '0.2s ease',
  $nest: {
    '&:hover': {
      margin: '0px 0px 0px 0px',
      transition: '0.2s ease',
      width: px(320),
      height: px(220)
    }
  }
});

type Props = { video: Video; onSelect: (id: number) => void };
type State = { duration: string };

export class VideoPreview extends React.Component<Props, State> {
  state = {
    duration: ''
  };

  componentDidMount() {
    const video = this.refs.video as HTMLVideoElement;
    video.addEventListener('loadedmetadata', () => {
      this.setState({
        duration: video.duration.toFixed(0)
      });
    });
  }

  render() {
    return (
      <div className={base} onClick={() => this.props.onSelect(this.props.video.id)}>
        <video ref="video" className={`animated zoomIn ${video}`} controls={false}>
          <source src={this.props.video.url} />
        </video>
        <Row style={{ padding: '0px 10px 10px 10px' }}>
          <Col span={20}>{this.props.video.name}</Col>
          <Col span={4} style={{ textAlign: 'right' }}>
            <small>{this.state.duration}s</small>
          </Col>
        </Row>
      </div>
    );
  }
}
