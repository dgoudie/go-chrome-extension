import './index.scss';

import Popup from './popup/Popup';
import React from 'react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { render } from 'react-dom';

initializeIcons();

// const element = document.getElementById('main');
// console.log(element);
render(<Popup />, document.getElementById('content'));
