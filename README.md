# Yet Another NodeJS TypeScript Starter Project

An opiniated NodeJS TypeScript Starter Project with coding conventions and ESLint rules using [VS Code](https://code.visualstudio.com/) editor.

## QuickStart

```sh
npm ci
npm build
npm start
```

## Project Structure

TypeScript source code are in `./src` directory. Build output are in `./build`.

## Coding Styles and Conventions

### EditorConfig

[EditorConfig](https://editorconfig.org/) is supported by most IDEs / Editors to help maintain consistent coding styles. The configuration is defined in ```.editorconfig```.

VS Code extension: [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

### ESLint

[ESLint](https://eslint.org/) is a static code analysis tool with both style and non-style related rules. TypeScript is supported via the packages [here](https://typescript-eslint.io/).

[Airbnb style guide](https://github.com/airbnb/javascript) is adopted using [`airbnb-typescript`](eslint-config-airbnb-typescript) config.

## Configuration

The excellent [config](https://github.com/lorenwest/node-config) is used to manage application configuration specified in `./config` directory. See [here](https://github.com/lorenwest/node-config/wiki/Configuration-Files#file-load-order) for the configuration file loading order / precedence.

## VS Code Debug Configuration

Supports debugging in TypeScript and in watch mode. See `./.vscode/launch.json` for more details.

## Docker Support

`docker.env` file is provided for convenience to provide the required environment variables or to override image defaults to start the container.

```sh
# Builds docker image
npm run build:docker
docker build -t my-app .
# Runs docker image
npm run start:docker
docker run --rm -it -p 3030:3030 --env-file ./docker.env my-app
```

Development dependencies is excluded from the Docker image using multi-stage docker builds.

## Path Mapping / Module Alias

Module aliasing can simplify module imports using absolute paths using TypeScript [Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping). However, the module resolution will fail during runtime as NodeJS module resolution does not support it. The npm package [`module alias`](https://github.com/ilearnio/module-alias) is used to fix this. The `package.json` needs to be configured similarly to `tsconfig.json`. See [usage](https://www.npmjs.com/package/module-alias#usage) for more details.

```jsonc
// tsconfig.json
"outDir": "./build",
"baseUrl": "./src",
"paths": {
    "@/*": ["*"],
    "@services/*": ["services/*"]
}

// package.json
"_moduleAliases": {
  "@": "build",
  "@services": "build/services"
}
```

## TODO

* Testing

* Coverage
