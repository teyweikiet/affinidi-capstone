<br />
<div align="center">
  <a href="https://github.com/teyweikiet/affinidi-capstone">
    <img src="public/favicon.ico" alt="Logo" width="50" height="50">
  </a>

  <h1 align="center" style="border-bottom: 0;">Affinidi Capstone - e Commerce Site</h1>

  <p align="center">
    An ecommerce site powered by Affinidi Login!
    <br />
    <a href="https://ecommerce-stackup-affinidi-capstone.vercel.app/"><strong>View Demo</strong></a>
    <br />
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#upgrades-implemented">Upgrades Implemented</a></li>
      </ul>
    </li>
    <li>
      <a href="#built-with">Built With</a>
      <ul>
        <li><a href="#backend">Backend</a></li>
        <li><a href="#frontend">Frontend</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#running-frontend-locally">Running frontend locally</a></li>
        <li><a href="#running-backend-locally">Running backend locally</a></li>
      </ul>
    </li>
  </ol>
</details>

## About the project

This is a submission for [StackUp's Bounty - Build Upon the Affinidi Capstone](https://platform.campus.dev/learners/campaigns/build-decentralised-identities-with-affinidi/quests/bounty-build-upon-the-affinidi-capstone-313e).

### Upgrades Implemented

- Localization based on user country (refer code [here](/src/components/Header.js#23-31))
  - update page UI based on user country
  - display currency based on user country (refer code [here](/src/constants/ProductDisplay.js))

- Request more data point e.g. user profile picture to show user avatar on header if user is logged in (refer code [here](/src/components/Header.js#58-61))

- Use Vercel KV as session store for expressSession for affinidiProvider - this allows express backend to be run on serverless functions and prevent memory leaks (as by default express session uses `MemoryStore`, which is purposely not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.)
  - check [here](/api/kv-store.mjs) for implementation of Vercel KV Store
  - check [here](/api/index.mjs#19-24) for how it is used in affinidiProvider

## Built With

### Backend

- [@affinidi/passport-affinidi](https://github.com/affinidi/passport-affinidi/blob/main/README.md)

- Express

- Vercel KV

### Frontend

- [@affinidi/affinidi-react-auth](https://github.com/affinidi/affinidi-react-auth/blob/main/README.md)

- React

- Vercel for hosting [frontend site](https://ecommerce-stackup-affinidi-capstone.vercel.app/)

## Getting Started

### Installation

1. Clone the repo
```sh
git clone https://github.com/teyweikiet/affinidi-capstone
```

2. Install dependencies
```sh
npm install
```

3. Go to api folder & install dependencies
```sh
cd api && npm install
```

### Running frontend locally

1. Start frontend locally
```sh
npm run start
```

### Running backend locally

1. Go to api folder
```sh
cd api
```

2. Copy and modify .env accordingly. (refer comments for appropriate values to be used)
```sh
cp .env.example .env
```

3. Start backend locally
```sh
npm run start
```



