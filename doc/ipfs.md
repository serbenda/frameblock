# IPFS NODE

## Download client

```bash
wget https://dist.ipfs.io/go-ipfs/v0.10.0/go-ipfs_v0.10.0_linux-amd64.tar.gz
tar -xvzf go-ipfs_v0.10.0_linux-amd64.tar.gz
cd go-ipfs
```

## First config

```bash
./ipfs init
./ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://127.0.0.1:5001","http://127.0.0.1:8080","http://localhost:3000"]'
./ipfs config Addresses.API /ip4/0.0.0.0/tcp/5001
```

## Startup daemon

```bash
./ipfs daemon
```


