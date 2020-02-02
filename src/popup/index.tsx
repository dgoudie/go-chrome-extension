import './index.scss';

import React from 'react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { render } from 'react-dom';
import App from './App';

initializeIcons();

// const element = document.getElementById('main');
// console.log(element);
render(<App />, document.getElementById('content'));
