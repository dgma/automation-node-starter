[![Quality gate](https://github.com/dgma/automation-node-starter/actions/workflows/quality-gate.yml/badge.svg)](https://github.com/dgma/automation-node-starter/actions/workflows/quality-gate.yml)

# automation-node-starter

Development starter kit for web3 node.js apps

## Features

- [Typescript](https://www.typescriptlang.org/) & with [tsx](https://tsx.is/)
- [Jest](https://jestjs.io/) for unit testing
- linters, code formatter, pre-commit and pre-push hooks
- [Docker](https://www.docker.com/) & [Docker-compose](https://docs.docker.com/compose/) for dev & prod.
- Custom github action and quality gate workflow for fast CI strategy implementation
- Flexible env configuration with encryption, thanks to [dotenvx](https://dotenvx.com/)

## Requirements

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you've done it right if you can run `git --version`
- [Node.js](https://nodejs.org/en) v20+
- [Make](https://www.gnu.org/software/make/manual/make.html)
- Optional. [Docker](https://www.docker.com/)
  - You'll need to run docker if you want to use run production container builds locally

## Installation

```sh
make
```

## Configuration

### Local development

Create and modify .env and .local.secrets.env files:

```sh
cp conf/.example.env conf/.env \
&& cp conf/.example.secrets.env conf/.local.secrets.env
```

### Production

1. Create and modify .env and .production.secrets.env files:

    ```sh
    rm conf/.production.secrets.env \
    && cp conf/.example.env conf/.env \
    && cp conf/.example.secrets.env conf/.production.secrets.env
    ```

2. Encrypt prod secrets:

    ```sh
    make encryptprod

    ```

3. Keep generated .env.keys safe and do not commit it into repo

## Contributing

Contributions are always welcome! Open a PR or an issue!

## Notes

And you probably already have `make` installed... but if not [try looking here.](https://askubuntu.com/questions/161104/how-do-i-install-make)
