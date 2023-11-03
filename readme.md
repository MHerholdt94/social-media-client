# Workflow CA
By MHerholdt94

---

## ESLint & Prettier
ESLint and Prettier are installed as dev dependencies to maintain code style consistency and prevent bugs and typos in commits.

### ESLint
Run ESLint to easier prevent bugs and typos from making it into commits.
```sh
npm run lint
```

### Prettier
Prettier helps in maintaining code style consistency.
```sh
npm run format
```

### Commit Hooks
Husky and lint-staged are installed to set up pre-commit hooks that runs ESLint and Prettier on staged files before committing them.

Install:
```
npx mrm@2 lint-staged
```

Add lint-staged scripts:
```sh
  "lint-staged": {
    "*.js": [
      "prettier --write",
      "eslint --fix"
    ],
    "*.html": [
      "prettier --write"
    ],
    "*.scss": [
      "prettier --write"
    ]
  }
```

---

## GitHub Actions
GitHub Actions is used to automate the development workflow.

**Automated Unit Testing**: This action automatically runs a unit-test workflow every time a PR is made.

**Automated E2E Testing**: This action automatically runs a E2E-test workflow every time a PR is made.

---

## Test Status Badges

### Unit Tests
[![Automated Unit Testing](https://github.com/MHerholdt94/social-media-client/actions/workflows/unit-test.yml/badge.svg?branch=workflow)](https://github.com/MHerholdt94/social-media-client/actions/workflows/unit-test.yml)

### E2E Tests
[![Automated E2E Testing](https://github.com/MHerholdt94/social-media-client/actions/workflows/e2e-test.yml/badge.svg?branch=workflow)](https://github.com/MHerholdt94/social-media-client/actions/workflows/e2e-test.yml)