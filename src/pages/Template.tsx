import * as React from 'react';
import { Row, Col, Layout } from 'antd';

type Props = {
  children: any;
  onLogoClick: () => void;
};

export const Template = (props: Props) => (
  <Layout>
    <Layout.Header>
      <h2>
        <span style={{ color: 'white', cursor: 'pointer' }} onClick={props.onLogoClick}>
          <i className="fa fa-video-camera" /> In2Player
        </span>
      </h2>
    </Layout.Header>
    <Layout.Content style={{ padding: '10px' }}>{props.children}</Layout.Content>
    <Layout.Footer style={{ borderTop: '1px solid lightgrey' }}>
      <small>
        <Row>
          {/* ABOUT */}
          <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              About
              <div>
                <i className="fa fa-code" />{' '}
                <a href="https://github.com/dderevjanik/in2player" target="_blank">
                  source code
                </a>
              </div>
              <div>
                <i className="fa fa-code" />{' '}
                <a href="https://github.com/dderevjanik/in2player" target="_blank">
                  video player component
                </a>
              </div>
            </div>
          </Col>
          {/* EMPTY */}
          <Col span={8} />
          {/* CONTACT */}
          <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              Contact
              <div>
                <i className="fa fa-github" />{' '}
                <a href="https://github.com/dderevjanik" target="_blank">
                  dderevjanik
                </a>
              </div>
              <div>
                <i className="fa fa-twitter" />{' '}
                <a href="twitter.com/dderevjanik" target="_blank">
                  dderevjanik
                </a>
              </div>
              <div>
                <i className=" fa fa-linkedin" />{' '}
                <a href="https://sk.linkedin.com/in/danielderevjanik" target="_blank">
                  daniel derevjanik
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </small>
    </Layout.Footer>
  </Layout>
);
