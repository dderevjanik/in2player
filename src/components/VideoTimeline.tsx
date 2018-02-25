import * as React from 'react';
import { Timeline } from 'antd';

type Props = {
  sequences: [number, number, string][];
  activeSegment: number;
  onSegmentClick: (segmentIndex: number) => void;
  duration: number;
};

export const VideoTimeline = (props: Props) => (
  <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }} className="animated fadeInRight">
    <Timeline>
      {props.sequences.map((seq, index) => (
        <Timeline.Item>
          <small>
            <i>&nbsp;s{(props.duration * seq[0]).toFixed(1)}s&nbsp;</i>
          </small>
          <a href="#" onClick={() => props.onSegmentClick(index)}>
            &nbsp;{index === props.activeSegment ? <i className="animated fadeInLeft fa fa-play" /> : null} {seq[2]}
          </a>
        </Timeline.Item>
      ))}
    </Timeline>
  </div>
);
