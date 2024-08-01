import React from 'react';
import ReactDOM from 'react-dom';
import './index.less'

import Apple from './Apple'
const App = () => {
  return (
    <>
      <div>这里是组件页面</div>
      <div>======== 下面是组件 ========</div>

      <Apple />
    </>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
