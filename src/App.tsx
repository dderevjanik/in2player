import * as React from 'react';
import { IntroPage } from './pages/IntroPage';
import { VideosPage } from './pages/VideosPage';
import { State as StoreState, InternalState, dispatch } from './store/Store';
import { connect } from 'react-redux';
import { Video } from './types/Video';
import { VideoPage } from './pages/VideoPage';

type Props = {
  selectedId: number;
  videos: Video[];
  route: 'videos' | 'intro' | 'video';
  hasLocalStorage: boolean;
};

class AppComp extends React.Component<Props, {}> {
  routeTo = (page: 'videos' | 'intro' | 'video') => {
    dispatch({ type: 'ROUTE_TO', route: page });
  };

  getPage = (): JSX.Element => {
    switch (this.props.route) {
      case 'intro': {
        return <IntroPage routeTo={this.routeTo} hasLocalStorage={this.props.hasLocalStorage} />;
      }
      case 'videos': {
        return (
          <VideosPage
            routeTo={this.routeTo}
            videos={this.props.videos}
            onVideoSelect={(id: number) => dispatch({ type: 'VIDEO_SELECT', id: id })}
          />
        );
      }
      case 'video': {
        const video = this.props.videos.find(video => video.id === this.props.selectedId);
        if (video) {
          return <VideoPage video={video} routeTo={this.routeTo} />;
        } else {
          throw new Error('no video selected');
        }
      }
    }
  };

  render() {
    return <div id="in2player">{this.getPage()}</div>;
  }
}

export const App = connect((state: StoreState & InternalState) => {
  return {
    videos: state.videos,
    route: state.route,
    hasLocalStorage: state.hasLocalStorage,
    selectedId: state.selectedId
  };
})(AppComp);
