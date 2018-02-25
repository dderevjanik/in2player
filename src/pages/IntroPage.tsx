import * as React from 'react';
import { Row, Col } from 'antd';
import { BlockButton } from '../components/BlockButton';
import { Action } from '../store/Actions';
import { store } from '../store/Store';
import { AddVideoBtn } from '../components/AddVideoBtn';
import { px } from 'csx';
import { Template } from './Template';

type Props = {
  hasLocalStorage: boolean;
  routeTo: (page: 'intro' | 'videos') => void;
};

type State = {};

export class IntroPage extends React.Component<Props, State> {
  render() {
    return (
      <Template onLogoClick={() => this.props.routeTo('intro')}>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <AddVideoBtn
              onAdd={url => {
                store.dispatch<Action>({ type: 'VIDEO_ADD', url: url });
                this.props.routeTo('videos');
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <h1>:( There are no videos in your collection, yet</h1>
          </Col>
        </Row>
        <Row>
          <Col span={7} />
          <Col span={10}>
            <div style={{ textAlign: 'center' }}>
              By clicking on one of buttons below, you can decide which source to use. To use example videos provided
              with an app, click on{' '}
              <a href="#" onClick={() => store.dispatch<Action>({ type: 'STATE_LOAD_FROM_FILE' })}>
                Load example videos
              </a>{' '}
              {this.props.hasLocalStorage ? (
                <div>
                  or you can load videos from last session&nbsp;
                  <a href="#" onClick={() => store.dispatch<Action>({ type: 'STATE_LOAD_FROM_STORAGE' })}>
                    Load from local storage
                  </a>.
                </div>
              ) : null}
            </div>
          </Col>
          <Col span={7} />
        </Row>

        <Row style={{ marginTop: px(30) }}>
          <Col span={7} />
          <Col span={10} style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="animated fadeInLeft">
              <BlockButton
                title="Load example videos collection"
                description={
                  <span>
                    Click here to load examples videos collection from <b>static file</b> saved on server
                  </span>
                }
                onClick={() => store.dispatch<Action>({ type: 'STATE_LOAD_FROM_FILE' })}
                disabled={false}
              />
              <BlockButton
                title="Load videos collection from previous session"
                description={
                  <span>
                    Click here to load videos from previously saved <b>local storage</b>
                  </span>
                }
                onClick={() => store.dispatch<Action>({ type: 'STATE_LOAD_FROM_STORAGE' })}
                disabled={!this.props.hasLocalStorage}
              />
            </div>
          </Col>
          <Col span={7} />
        </Row>
      </Template>
    );
  }
}
