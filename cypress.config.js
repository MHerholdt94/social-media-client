const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      baseUrl: "https://mherholdt94.github.io/social-media-client/",
      apiLoginUrl: "https://nf-api.onrender.com/api/v1/social/auth/login",
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD,
    },
  },
});
