import wrapPageElement from './src/wrapPageElement';

const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9027498975434534"
      crossOrigin="anonymous"
    ></script>,
  ]);
};

export { wrapPageElement, onRenderBody };
