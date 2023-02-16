### NFT Dapp Quickstart

This dapp is tested in Ubuntu 20.04

## Environment Config

1. [Installed nodejs](doc/nodejs.md)

2. [Download ipfs-node](doc/ipfs.md)

3. Navigate into the project directory

```bash
$ cd dapp
```

4. Install the requirements

```bash
$ npm install
```

5. Make a copy of the example environment variables file

```bash
$ cp .env.example .env
```

6. Add your variables to the newly created `.env` file

```
REACT_APP_API_KEY= ""
REACT_APP_IA_ENDPOINT = ""
REACT_APP_NODE_IP = ""
REACT_APP_PRV_KEY = ""
REACT_APP_PUB_KEY = ""
REACT_APP_IPFS_NODE = ""
REACT_APP_ABI = []
REACT_APP_BYTECODE = ""
```

7. Run the dapp

```bash
cd src
npm start
```