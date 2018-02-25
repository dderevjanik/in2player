import * as React from 'react';
import { Input, Spin, Button, Modal, Icon } from 'antd';

type Props = {
  onClose: () => void;
  onAdd: (videoUrl: string) => void;
  isVisible: boolean;
};

type State = {
  url: string;
  isLoading: boolean;
  isValidVideo: boolean;
};

export class AddVideoModal extends React.Component<Props, State> {
  state = {
    url: '',
    isLoading: false,
    isValidVideo: false
  };

  onCancel = () => {
    this.setState({
      url: ''
    });
    this.props.onClose();
  };

  onSrcChange = (value: string) => {
    if (value !== '') {
      // Test only if value is non-empty
      const video = this.refs.video as HTMLVideoElement;
      video.oncanplaythrough = () => {
        // Video format is supported
        this.setState({
          isLoading: false,
          isValidVideo: true
        });
      };
      video.onerror = () => {
        // Video format is NOT supported
        this.setState({
          isLoading: false,
          isValidVideo: false
        });
      };
      video.src = value;

      // Because loading video is asynchronous action, show loading icon in meantime
      this.setState({
        url: value,
        isLoading: true
      });
    } else {
      this.setState({
        url: '',
        isValidVideo: false,
        isLoading: false
      });
    }
  };

  render() {
    let icon: JSX.Element | null;
    if (this.state.isValidVideo && this.state.url.length > 0) {
      // Url is Ok and video has valid format
      icon = <i className="fa fa-check" style={{ color: 'darkgreen' }} />;
    } else if (!this.state.isLoading && !this.state.isValidVideo && this.state.url.length > 0) {
      icon = <i className="fa fa-ban" style={{ color: 'darkred' }} />;
    } else if (this.state.isLoading) {
      // Video is loading, show indicator
      icon = <Spin indicator={<Icon type="loading" spin={true} />} />;
    } else {
      icon = null;
    }
    return (
      <Modal
        visible={this.props.isVisible}
        title="Add video from url"
        footer={[
          <Button key={0} onClick={this.props.onClose}>
            Cancel
          </Button>,
          <Button
            key={1}
            type="primary"
            onClick={() => this.props.onAdd(this.state.url)}
            disabled={!this.state.isValidVideo}
          >
            Add Video
          </Button>
        ]}
        onCancel={this.props.onClose}
      >
        <Input
          addonBefore="video url"
          suffix={icon}
          placeholder="http://"
          onChange={e => this.onSrcChange(e.target.value)}
          value={this.state.url}
          autoFocus={true}
        />
        <small>
          <b>Supported formats: </b>.mp4, .webm
        </small>
        <video
          className="animated fadeIn"
          ref="video"
          controls={false}
          autoPlay={false}
          style={{ display: this.state.isValidVideo ? 'block' : 'none', width: '100%' }}
        >
          <source src={this.state.url} />
        </video>
      </Modal>
    );
  }
}
