const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      baseUrl: "http://localhost:5500/",
      apiLoginUrl: "https://nf-api.onrender.com/api/v1/social/auth/login",
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD,
    },
  },
});
