# Typescript MERN starter

## Contents

1. [Overview](#Overview)
2. [Installation](#Installation)
   - [Docker](#Docker)
   - [Localhost](#Localhost)
3. [Packages](#Packages)
   - [Backend](#Backend)
   - [Database](#Database) `todo`
   - [Frontend](#Frontend)
4. [Releases](#Releases) `todo`
5. [Deployment](#Deployment) `todo`
6. [Versioning](#Versioning) `todo`

## Overview

This repo contains all of the core software and deployment pipelines. This document aims to give a high level overview of our software architecture as well as the authors notes on the design and structure of this repository. Instead of having several smaller repositories for the requisite components, we're utilizing a mono-repo structure using Lerna project.

## Installation

### Docker

`todo: maybe setup a makefile to execute docker commands`

<br />

### Localhost (W/O Docker)

```bash

# start off by cd'ing into the backend
cd packages/backend

## Backend (in fresh term)
npm i

# watch typescript
npm run watch

# spin up the backend
npm run dev

## Frontend (in fresh term)

npm i

# spin up the frontend
cd packages/frontend

npm run start
```

<br />

### Commit and Versioning

```bash

# commit
npm run commit

# version
npm run version

```

<br />

## Packages

### Backend

Mongo, Express and Typescript

<br />

### Database

`todo` : separate?

<br />

### Frontend

CRA --typescript

<br />
