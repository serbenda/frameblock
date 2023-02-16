# Install NodeJS

## Configure repos

```bash
curl -s https://deb.nodesource.com/setup_18.x | sudo bash
sudo apt-get install -y nodejs

```

## Install nodejs

```bash
sudo apt-get install -y nodejs
```

## Optional configure

```bash
sudo apt-get install gcc g++ make
```

## To install the Yarn package manager, run:

```     
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/yarnkey.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```