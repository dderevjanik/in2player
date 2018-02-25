import * as React from 'react';
import { AddVideoModal } from './modals/AddVideoModal';
import { Button } from 'antd';

type Props = {
  onAdd: (videoUrl: string) => void;
};

type State = {
  isAddModalVisible: boolean;
};

export class AddVideoBtn extends React.Component<Props, State> {
  state = {
    isAddModalVisible: false
  };

  onAddVideoModalToggle = (toggle?: boolean) => {
    this.setState({
      isAddModalVisible: toggle ? toggle : !this.onAddVideoModalToggle
    });
  };

  onAdd = (videoUrl: string) => {
    console.log(videoUrl);
    this.props.onAdd(videoUrl);
    this.setState({
      isAddModalVisible: false
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={() => this.onAddVideoModalToggle(true)}>
          <i className="fa fa-plus-circle" /> Add video to collection
        </Button>
        <AddVideoModal
          isVisible={this.state.isAddModalVisible}
          onClose={() => this.onAddVideoModalToggle(false)}
          onAdd={this.onAdd}
        />
      </div>
    );
  }
}
