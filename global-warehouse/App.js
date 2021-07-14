import React from 'react';
import App from './src/navigation';
import jsTracking from './src/utils/jsTracking';

// 埋点
jsTracking();

export default () => <App />;
