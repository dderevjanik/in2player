import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import { App } from './App';

// First, check if there's something saved in local storage
// to inform user about previous edited state
const hasLocalStorage = localStorage.getItem('STATE') ? true : false;
if (hasLocalStorage) {
  store.dispatch({ type: 'HAS_LOCAL_STORAGE' });
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app') as HTMLDivElement
);
