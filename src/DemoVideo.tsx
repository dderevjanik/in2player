import * as React from 'react';
import { render } from 'react-dom';
import { VideoPlayer } from './components/VideoPlayer';
import { Row, Col } from 'antd';

render(
  <div>
    <Row>
      <Col span={7} />
      <VideoPlayer
        video={{
          date: new Date(),
          id: 0,
          name: 'Qtake',
          url: 'http://qtakehd.com/video/new_features/QTAKE_1_3_new_features.mp4',
          sequences: [
            [0.0, 0.2, 'start'],
            [0.4, 0.5, 'core principles'],
            [0.7, 0.8, 'ending'],
            [0.9, 1.0, 'hiring process']
          ]
        }}
      />
    </Row>
  </div>,
  document.getElementById('app') as HTMLDivElement
);
