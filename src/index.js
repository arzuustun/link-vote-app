import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './redux/store';

ReactDOM.render(
   <Provider store={store}> 
      <App />
       </Provider>,
     document.getElementById('root')
);


