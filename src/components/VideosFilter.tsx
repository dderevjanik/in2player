import * as React from 'react';
import { SortButton } from './SortButton';
import { Row, Col } from 'antd';

export class VideosFilter extends React.Component<{}, {}> {
  render() {
    return (
      <Row>
        <Col span={7} />
        <Col span={10} style={{ display: 'flex', flexDirection: 'row' }}>
          <b>Sort by:</b>&nbsp;
          <SortButton name="name" onClick={() => null} />&nbsp;
          <SortButton name="date added" onClick={() => null} />&nbsp;
        </Col>
        <Col span={7} />
      </Row>
    );
  }
}
