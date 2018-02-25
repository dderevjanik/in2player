import * as React from 'react';
import { Input, Row, Col } from 'antd';
import { AddVideoBtn } from '../components/AddVideoBtn';
import { Video } from '../types/Video';
import { store } from '../store/Store';
import { Action } from '../store/Actions';
import { Template } from './Template';
import { VideoPreview } from '../components/VideoPreview';

type Props = {
  videos: Video[];
  routeTo: (page: 'intro' | 'videos') => void;
  onVideoSelect: (id: number) => void;
};

type State = {
  filteredVideos: Video[];
  searchValue: string;
};

export class VideosPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filteredVideos: props.videos,
      searchValue: ''
    };
  }

  componentWillReceiveProps(props: Props) {
    this.setState({
      filteredVideos: props.videos
    });
  }

  onSearchChange = (value: string) => {
    if (value === '') {
      // search is empty
      this.setState({
        filteredVideos: this.props.videos,
        searchValue: value
      });
      return;
    }
    const searchValue = value.toLowerCase();
    const filteredVideos = this.props.videos.filter(video => video.name.toLowerCase().includes(searchValue));
    this.setState({
      filteredVideos: filteredVideos,
      searchValue: value
    });
  };

  render() {
    const matches =
      this.state.searchValue.length > 0 && this.state.filteredVideos.length > 0
        ? `Found ${this.state.filteredVideos.length}/${this.props.videos.length} videos`
        : this.state.searchValue.length === 0 ? 'Select a video' : null;
    return (
      <Template onLogoClick={() => this.props.routeTo('intro')}>
        {/* HEADER */}
        <Row>
          <Col span={10} offset={7}>
            <Input.Search
              placeholder="search for a video"
              onChange={e => this.onSearchChange(e.target.value)}
              value={this.state.searchValue}
            />
          </Col>
          <Col span={7} style={{ textAlign: 'right' }}>
            <AddVideoBtn
              onAdd={videoUrl => {
                store.dispatch<Action>({ type: 'VIDEO_ADD', url: videoUrl });
              }}
            />
          </Col>
        </Row>

        {/* VIDEOS */}
        {this.state.filteredVideos.length > 0 ? (
          <Row style={{ marginTop: '10px' }}>
            <Col span={24}>
              <h2 style={{ textAlign: 'center' }}>{matches} </h2>
            </Col>
          </Row>
        ) : null}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '10px'
          }}
        >
          {this.state.filteredVideos.length > 0 ? (
            this.state.filteredVideos.map(video => (
              <VideoPreview key={video.id} video={video} onSelect={this.props.onVideoSelect} />
            ))
          ) : (
            <Row>
              <Col span={10} style={{ textAlign: 'center' }} offset={7}>
                <h2>No video found !</h2>
                There's no video in your collection for keyword "{this.state.searchValue}" &nbsp; Try to search for
                other name, or{' '}
                <a href="#" onClick={() => this.onSearchChange('')}>
                  reset search
                </a>
              </Col>
            </Row>
          )}
        </div>
      </Template>
    );
  }
}
