import * as React from 'react';
import { style } from 'typestyle';
import { px } from 'csx';

const base = (disabled: boolean) =>
  style({
    margin: px(2),
    padding: px(10),
    cursor: disabled ? 'inherit' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    backgroundColor: '#d3d3d3',
    border: '1px solid #a0a0a0',
    $nest: {
      '&:hover': {
        backgroundColor: disabled ? 'd3d3d3' : '#d9d9d9',
        border: disabled ? '1px solid #a0a0a0' : '1px solid #a6a6a6'
      }
    }
  });

type Props = {
  disabled: boolean;
  title: string | JSX.Element;
  description: string | JSX.Element;
  onClick: () => void;
};

export const BlockButton = (props: Props) => (
  <div
    className={base(props.disabled)}
    style={{ display: 'flex', flexDirection: 'column', borderRight: '3px solid #1890ff' }}
    onClick={() => (props.disabled ? null : props.onClick())}
  >
    <div>
      <h4>
        <a href="#">{props.title}</a>
      </h4>
      <small>{props.description}</small>
    </div>
  </div>
);
