import { Video } from '../types/Video';

type VIDEO_SELECT = {
  type: 'VIDEO_SELECT';
  id: number;
};

type VIDEO_ADD = {
  type: 'VIDEO_ADD';
  url: string;
};

type VIDEO_EDIT = {
  type: 'VIDEO_EDIT';
  video: Partial<Video>;
};

type VIDEO_DELETE = {
  type: 'VIDEO_DELETE';
  videoId: number;
};

type STATE_LOAD_FROM_FILE = {
  type: 'STATE_LOAD_FROM_FILE';
};

type STATE_LOAD_FROM_STORAGE = {
  type: 'STATE_LOAD_FROM_STORAGE';
};

type ROUTE_TO = {
  type: 'ROUTE_TO';
  route: 'videos' | 'intro' | 'video';
};

type HAS_LOCAL_STORAGE = {
  type: 'HAS_LOCAL_STORAGE';
};

export type Action =
  | VIDEO_ADD
  | VIDEO_DELETE
  | STATE_LOAD_FROM_FILE
  | STATE_LOAD_FROM_STORAGE
  | ROUTE_TO
  | HAS_LOCAL_STORAGE
  | VIDEO_SELECT
  | VIDEO_EDIT;
