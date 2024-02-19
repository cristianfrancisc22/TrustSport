const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = createProxyMiddleware('/api', {
  target: 'https://transfermarkt-api.vercel.app',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/', // Remove /api prefix when forwarding request
  },
});

module.exports = function(app) {
  app.use(proxy);
};
