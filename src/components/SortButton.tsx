import * as React from 'react';

type Props = {
  name: string;
  onClick: () => void;
  sort?: 'asc' | 'dsc';
};

export const SortButton = (props: Props) => (
  <div>
    {props.name} <i className={`fa fa-sor${props.sort ? '-' + props.sort : ''}`} />
  </div>
);
