const { createProxyMiddleware } = require('http-proxy-middleware');

const backendHost = process.env.REACT_APP_BACKEND_HOST;
const backendRealHost = process.env.REACT_APP_BACKEND_REAL_HOST;

module.exports = (app) => {
  app.use(
    createProxyMiddleware(backendHost, {
      target: backendRealHost,
      pathRewrite: {
        [backendHost]: '',
      },
      changeOrigin: true,
    })
  );
};
