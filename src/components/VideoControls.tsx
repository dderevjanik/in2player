import * as React from 'react';
import { Button, Popover } from 'antd';
import { getNearest } from '../utils/Utils';

type Props = {
  width: number;
  height: number;
  segments: [number, number, string][];
  isPlaying: boolean;
  onSegmentHover: (segmentIndex: number) => void;
  onSegmentClick: (segmentIndex: number, played: number) => void;
  onSegmentClicked: (segmentIndex: number) => void;
  played: number;
  playedSeconds: number;
  onPlayClick: () => void;
  onPauseClick: () => void;
  onNextSegment: () => void;
  onPreviousSegment: () => void;
  active: number;
};

export class VideoControls extends React.Component<Props, {}> {
  hoverSegment: number = -1;
  hoverPredictedSegment: number = -1;
  hoverXY: [number, number] | null = null;

  updateCanvas(_: { mouseOver?: { x: number; y: number } }) {
    const canvas = this.refs.controls as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'lightgrey';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'grey';

      /**
       * Render segments
       */
      let index = 0;
      for (const segment of this.props.segments) {
        if (index === this.props.active) {
          ctx.fillStyle = 'darkgreen';
        } else {
          ctx.fillStyle = 'grey';
        }

        ctx.fillRect(
          canvas.width * segment[0],
          2,
          canvas.width * segment[1] - canvas.width * segment[0],
          canvas.height - 4
        );
        index++;
      }

      /**
       * Render thumb
       */
      ctx.fillStyle = 'white';
      ctx.fillRect(canvas.width * this.props.played, 0, 2, canvas.height);

      /**
       * Render Hover thumb
       */
      if (this.hoverXY) {
        ctx.fillStyle = 'rgba(225,225,225,0.2)';
        ctx.strokeStyle = 'black';
        ctx.rect(this.hoverXY[0] - 5, 0, 10, canvas.height);
        ctx.strokeRect(this.hoverXY[0] - 5, 0, 10, canvas.height);
      }
    }
  }

  getSegmentIndexByCoord(x: number, _: number): number {
    const canvas = this.refs.controls as HTMLCanvasElement;
    let i = 0;
    for (const segment of this.props.segments) {
      const x1 = segment[0] * canvas.width;
      const x2 = segment[1] * canvas.width;
      if (x >= x1 && x <= x2) {
        return i;
      }
      i++;
    }
    return -1;
  }

  componentDidMount() {
    const canvas = this.refs.controls as HTMLCanvasElement;
    canvas.addEventListener('mousemove', e => {
      const segmentIndex = this.getSegmentIndexByCoord(e.offsetX, e.offsetY);

      if (segmentIndex >= 0) {
        this.hoverXY = [e.offsetX, e.offsetY];
      } else {
        const rX = e.offsetX * (100 / canvas.width) / 100;
        const nearestIndex = getNearest(rX, this.props.segments);
        console.log('result: ', nearestIndex);
        this.hoverXY = [this.props.segments[nearestIndex][0] * canvas.width, e.offsetY];
        this.hoverPredictedSegment = nearestIndex;
      }

      if (segmentIndex >= 0 && segmentIndex !== this.hoverSegment) {
        // mouse is over segment that is different from one before or is new
        this.hoverSegment = segmentIndex;
        this.props.onSegmentHover(segmentIndex);
      } else if (segmentIndex === -1 && this.hoverSegment !== -1) {
        // mouse is outside of any segment
        this.hoverSegment = segmentIndex;
        this.props.onSegmentHover(-1);
      }
      this.updateCanvas({});
    });
    canvas.addEventListener('mouseleave', _ => {
      // when mouse leave canvas, reset hovered segment
      this.hoverXY = null;
      this.props.onSegmentHover(-1);
    });
    canvas.addEventListener('click', e => {
      const segmentIndex = this.getSegmentIndexByCoord(e.offsetX, e.offsetY);
      if (segmentIndex !== -1) {
        // jump to segment, only
        this.props.onSegmentClick(segmentIndex, e.offsetX * (100 / canvas.width) / 100);
      } else {
        this.props.onSegmentClicked(this.hoverPredictedSegment);
      }
    });
  }

  componentDidUpdate() {
    this.updateCanvas({});
  }

  render() {
    return (
      <div>
        <canvas
          ref="controls"
          width={this.props.width}
          height={this.props.height}
          style={{ borderRadius: '5px', border: '1px solid darkgrey' }}
        />
        <div>
          <Popover trigger="hover" placement="bottom" content="Jump to previous segment">
            <Button onClick={() => this.props.onPreviousSegment()} disabled={this.props.active === 0}>
              <i className="fa fa-step-backward" />
            </Button>
          </Popover>
          {/* UGLY */}
          {this.props.isPlaying ? (
            <Popover trigger="hover" placement="bottom" content="Pause">
              <Button onClick={() => this.props.onPauseClick()}>
                <i className="fa fa-pause" />
              </Button>
            </Popover>
          ) : (
            <Popover trigger="hover" placement="bottom" content="Play">
              <Button onClick={() => this.props.onPlayClick()}>
                <i className="fa fa-play" />
              </Button>
            </Popover>
          )}
          <Popover trigger="hover" placement="bottom" content="Jump to next segment">
            <Button
              onClick={() => this.props.onNextSegment()}
              disabled={this.props.active === this.props.segments.length - 1}
            >
              <i className="fa fa-step-forward" />
            </Button>
          </Popover>
        </div>
      </div>
    );
  }
}
