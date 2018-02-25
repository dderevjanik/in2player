import * as React from 'react';
import { Template } from './Template';
import { Row, Col } from 'antd';
import { Video } from '../types/Video';
import { VideoPlayer } from '../components/VideoPlayer';

type Props = {
  video: Video;
  routeTo: (page: 'intro' | 'video' | 'videos') => void;
};

export class VideoPage extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Template onLogoClick={() => this.props.routeTo('intro')}>
        <Row>
          <Col span={7}>
            <h2>
              <a href="#" onClick={() => this.props.routeTo('videos')}>
                <i className="fa fa-angle-left" /> Back to collection
              </a>
            </h2>
          </Col>
          <VideoPlayer video={this.props.video} />
        </Row>
      </Template>
    );
  }
}
