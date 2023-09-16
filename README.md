<a href="https://jourloy.com/">
	<h1 align="center">
		JOURLOY.com
	</h1>
</a>

<p align="center">
	<a href="" target="_blank"><img src="https://img.shields.io/github/v/tag/jourloy-com/Jourloy-Frontend?color=red&label=version&style=for-the-badge&labelColor=000000"/></a>
</p>

<p align="center">Main repository for frontend</p>

## Getting Started

### Installation

```bash
$ yarn install
```

### .env

Don't forget create `.env` from `.env.sample` and add data

#### Deployment mode

If you want start server locally, so you should set `DEPLOYMENT_MODE` to `local`, else to any other value

### Running the app

#### Docker

```bash
$ docker-compose up -d
```

#### Yarn

```bash
# Developmemt
$ yarn dev

# Production (Not recommend)
$ yarn start
```