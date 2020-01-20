import ReactDOM from 'react-dom';
import React from 'react';
import * as serviceWorker from './serviceWorker';
import App from './components/app/App';


ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
module.hot.accept();
