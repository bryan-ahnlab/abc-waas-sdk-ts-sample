// src/setupProxy.js

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // 1. NAVER API Token 요청 프록시
  app.use(
    "/proxy/naver/token",
    createProxyMiddleware({
      target: "https://nid.naver.com",
      changeOrigin: true,
      pathRewrite: {
        "^/proxy/naver/token": "/oauth2.0/token",
      },
    })
  );

  // 2. NAVER Token Info (유저 정보 조회) 요청 프록시
  app.use(
    "/proxy/naver/tokeninfo",
    createProxyMiddleware({
      target: "https://openapi.naver.com",
      changeOrigin: true,
      pathRewrite: {
        "^/proxy/naver/tokeninfo": "/v1/nid/me",
      },
    })
  );

  // 3. APPLE 토큰 요청 프록시
  app.use(
    "/proxy/apple/token",
    createProxyMiddleware({
      target: "https://appleid.apple.com",
      changeOrigin: true,
      pathRewrite: {
        "^/proxy/apple/token": "/auth/token",
      },
    })
  );
};
