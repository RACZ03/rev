# Revert - App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

---

## Table of Contents

- [Revert - App](#revert---app)

  - [Table of Contents](#table-of-contents)
  - [:clipboard: Getting started](#clipboard-getting-started)
    - [Requirements for development](#requirements-for-development)
    - [Project structure](#project-structure)
      - [Folder structure](#folder-structure)
      - [Core](#core)
      - [Shared](#shared)
      - [Config](#config)
      - [Modules](#modules)
      - [Theme](#theme)
      - [Assets and Environments](#assets-and-environments)
  - [:computer: Running the application](#computer-running-the-application)

  - [:microscope: Static code analysis](#microscope-static-code-analysis)
    - [Lint](#lint)
  - [:test_tube: Tests](#test_tube-tests)
  - [:new: Versioning](#new-versioning)
  - [:mage: CI/CD](#mage-cicd)
    - [Github Actions](#github-actions)
  - [:gem: Outputs](#gem-outputs)
    - [Generating a develop build](#generating-a-develop-build)
    - [Generating a staging build](#generating-a-staging-build)
    - [Generating a production build](#generating-a-production-build)
  - [:handshake: Contributing](#handshake-contributing)

## :clipboard: Getting started

Before starting, please make sure you have installed these programs.

- [Angular](https://angular.io/guide/setup-local)

### Requirements for development

- [Nodejs v18.13.x](https://nodejs.org/)
- [Prettier](https://prettier.io/)
- [Eslint](https://eslint.org/)

### Project structure

This part describes the folder structure for an Angular project using Clean Architecture and standalone components. The project is organized to separate concerns clearly and manage dependencies effectively.

#### Folder structure

```

src/
└── app/
    ├── config/
    │   ├── routes/
    │   │   ├── app.routes.ts
    │   │   └── ...
    │   └── ...
    ├── core/
    │   ├── guards/
    │   ├── interceptors/
    │   ├── services/
    │   ├── utils/
    │   └── ...
    ├── shared/
    │   ├── components/
    │   ├── directives/
    │   └── pipes/
    ├── modules/
    │   ├── landing/
    │   │   ├── data/
    │   │   │   ├── services/
    │   │   │   │   ├── demo.service.ts
    │   │   │   │   └── ...
    │   │   │   ├── mappers/
    │   │   │   │   ├── demo.mapper.ts
    │   │   │   │   └── ...
    │   │   │   ├── repositories/
    │   │   │   │   ├── demo-impl.repository.ts
    │   │   │   │   └── ...
    │   │   │   └── models/
    │   │   │       ├──  demo.model.ts
    │   │   │       └── ...
    │   │   ├── domain/
    │   │   │   ├── entities/
    │   │   │   │   ├── demo.entity.ts
    │   │   │   │   └── ...
    │   │   │   └── repositories/
    │   │   │   │   ├── demo.repository.ts
    │   │   │   │   └── ...
    │   │   ├── presentation/
    │   │   │   ├── components/
    │   │   │   └── pages/
    │   │   │       └── demo/
    │   │   │           ├── demo.component.ts
    │   │   │           ├── demo.component.css
    │   │   │           └── demo.component.html
    │   │   └── application/
    │   │   │   ├── store/
    │   │   │   │   ├── demo/
    │   │   │   │   │   ├── demo.actions.ts
    │   │   │   │   │   ├── demo.state.model.ts
    │   │   │   │   │   ├── demo.state.ts
    │   │   │   │   │   └── index.ts
    │   │   │   │   └── ...
    │   │   │   ├── landing.config.ts
    │   │   |    └── ...
    |   |   ├── landing-routing.module.ts
    |   |   └── landing.module.ts
    ├── app-routing.module.ts
    ├── app.component.css
    ├── app.component.html
    ├── app.component.ts
    └── app.module.ts
assets/
environments/

```

#### Core

The `core` folder contains essential services, interceptors, guards, and global models. It includes:

- `guards`: Guards for user authentication.
- `services`: Global services like `HttpService` and `StorageService`.
- `utils`: Global utilities like `Logger` and `DateUtils`
- `interceptors`: Interceptors for HTTP requests and responses

#### Shared

The `shared` folder includes reusable components, directives, and pipes.

#### Config

The `config` folder includes global configuration files like routes, constants, etc.

#### Modules

Each module is organized into `data`, `domain`, `presentation`, and `application` layers:

- `data`: Access to data (services, models, mappers, repositories).
- `domain`: Business logic and entities (Entities, repositories).
- `presentation`: UI components and pages.
- `application`: Specific application logic, like state management and coordination between domain and presentation layers.

#### Assets and Environments

- `assets`: Static resources like images and global styles.
- `environments`: Configuration for different environments (development, staging, production).

## :computer: Running the application

In order to run the application you must install dependencies first.
You can do this automatically by running:

```bash
npm install
```

Then you can run the application with the following commands:

```bash
ng serve ## or npm run start
```

## :microscope: Static code analysis

There is a lint check configured in `.eslintrc.json`.
The app should pass this check at all times as it is integrated in the [CI/CD pipeline](#mage-cicd).

### Lint

You can check its status running:

```bash
npm run lint
```

## :test_tube: Tests

In order to run tests, you must install dependencies first.
You can do this automatically by running:

```bash
npm install
```

To run the tests:

```bash
npm run test
```

The app should always have passing tests as it is integrated in our in the
[CI/CD pipeline](#mage-cicd).

## :new: Versioning

To version the app, just checkout from `develop` to a new branch `bump/x.y.z`
and create a new pull request from `develop` changing the `version: x.y.z`
section in [package.json](package.json) according to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Remember to include the changes from the [CHANGELOG.md](CHANGELOG.md)'s
`Unreleased` section into its corresponding version.

When the pull request is merged, the [CI/CD pipeline](#mage-cicd) will
automatically handle the deployment to test channels.
Remember to create the new version tag in Github once the pull request is merged.
Its name should be `v<x.y.z>` (example: `v0.0.1`).
The description should include the changes from the
[CHANGELOG.md](CHANGELOG.md)'s `<x.y.z>` section.

Then, you can create pull requests from the version tag to `staging` and/or
`main` to trigger the deployment to the corresponding environments.

## :mage: CI/CD

There are some Continuous Integration and Continuous Delivery pipelines
configured in the project.

## :gem: Outputs

Outputs are generated and uploaded automatically to test channels by the [CI/CD pipeline](#mage-cicd).
This section describes how to manually generate outputs for each environment if needed.

#### Generating a develop build

To generate a develop build, run:

```bash
npm run build:development
```

#### Generating a staging build

To generate a staging build, run:

```bash
npm run build:staging
```

#### Generating a production build

To generate a production build, run:

```bash
npm run build
```

## :handshake: Contributing

To contribute to this project, please read the [contributing guidelines](CONTRIBUTING.md).
