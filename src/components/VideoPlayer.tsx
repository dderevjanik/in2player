import * as React from 'react';
import { Video } from '../types/Video';
import { VideoControls } from './VideoControls';
import ReactPlayer from 'react-player';
import { Col } from 'antd';
import { VideoTimeline } from './VideoTimeline';

type Props = {
  video: Video;
};

type State = {
  playedSeconds: number;
  played: number;
  isPlaying: boolean;
  length: number;
  activeSegment: number;
  hoverSegment: number;
  shouldRepeat: boolean;
};

export class VideoPlayer extends React.Component<Props, State> {
  state = {
    playedSeconds: 0,
    played: 0,
    isPlaying: true,
    length: 0,
    activeSegment: 0,
    hoverSegment: -1,
    shouldRepeat: true
  };

  seekTo = (seconds: number) => {
    const video = this.refs.reactplayer as ReactPlayer;
    console.log(seconds);
    video.seekTo(seconds);
  };

  componentDidMount() {
    const video = this.refs.reactplayer as ReactPlayer;
    const internal = video.getInternalPlayer() as HTMLVideoElement;
    internal.addEventListener('loadedmetadata', () => {
      // First, we need to load a video to check it's duration
      const duration = internal.duration;
      const seekTo = duration * this.props.video.sequences[this.state.activeSegment][0];
      // Only then, we can jump to first segment
      this.seekTo(seekTo);
      this.setState({
        length: internal.duration
      });
    });
  }

  onProgressUpdate = (progress: { playedSeconds: number; played: number }) => {
    const currentProgress = progress.played.toFixed(2);
    const segmentEndProgress = this.props.video.sequences[this.state.activeSegment][1].toFixed(2);
    if (currentProgress === segmentEndProgress) {
      // On the end of current segment, loop current segment
      this.seekTo(this.props.video.sequences[this.state.activeSegment][0]);
      this.setState({
        playedSeconds: progress.playedSeconds,
        played: progress.played
      });
    } else {
      this.setState({
        playedSeconds: progress.playedSeconds,
        played: progress.played
      });
    }
  };

  previousSegment = () => {
    this.seekTo(this.props.video.sequences[this.state.activeSegment - 1][0]);
    this.setState({
      activeSegment: this.state.activeSegment - 1
    });
  };

  nextSegment = () => {
    this.seekTo(this.props.video.sequences[this.state.activeSegment + 1][0]);
    this.setState({
      activeSegment: this.state.activeSegment + 1
    });
  };

  onHoverSegment = (segmentIndex: number) => {
    this.setState({
      hoverSegment: segmentIndex
    });
  };

  onSegmentClick = (segmentIndex: number, played: number) => {
    this.seekTo(played);
    this.setState({
      activeSegment: segmentIndex,
      played: played
    });
  };

  onSegmentClicked = (segmentIndex: number) => {
    const played = this.props.video.sequences[segmentIndex][0];
    this.seekTo(played);
    this.setState({
      activeSegment: segmentIndex,
      played: played
    });
  };

  render() {
    const segmentName = (
      <b>
        {this.state.hoverSegment > -1
          ? this.props.video.sequences[this.state.hoverSegment][2]
          : this.props.video.sequences[this.state.activeSegment][2]}
      </b>
    );
    return (
      <>
        <Col span={10} style={{ textAlign: 'center' }}>
          <h2 style={{ textAlign: 'center' }}>{this.props.video.name}</h2>
          <div
            className="animated fadeIn"
            onClick={() => this.setState({ isPlaying: !this.state.isPlaying })}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <ReactPlayer
              ref="reactplayer"
              url={this.props.video.url}
              playing={this.state.isPlaying}
              onProgress={this.onProgressUpdate}
              progressInterval={100}
            />
          </div>
          <div style={{ marginTop: '5px' }}>
            {`${this.state.hoverSegment > -1 ? 'Jump to' : 'Currently playing'}: `}
            {segmentName}
          </div>
          <VideoControls
            width={550}
            height={20}
            segments={this.props.video.sequences}
            active={this.state.activeSegment}
            isPlaying={this.state.isPlaying}
            played={this.state.played}
            playedSeconds={this.state.playedSeconds}
            onPlayClick={() => this.setState({ isPlaying: true })}
            onPauseClick={() => this.setState({ isPlaying: false })}
            onSegmentHover={this.onHoverSegment}
            onSegmentClick={this.onSegmentClick}
            onSegmentClicked={this.onSegmentClicked}
            onNextSegment={this.nextSegment}
            onPreviousSegment={this.previousSegment}
          />
        </Col>
        <Col span={7}>
          <h2 style={{ textAlign: 'center' }}>Timeline: </h2>
          <VideoTimeline
            activeSegment={this.state.activeSegment}
            onSegmentClick={this.onSegmentClicked}
            sequences={this.props.video.sequences}
            duration={this.state.length}
          />
        </Col>
      </>
    );
  }
}
