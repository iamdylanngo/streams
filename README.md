# Setup project in localworksation

# Config env

## Windows 
 
 ```bash
  ipconfig
  ```

## Macs OSX and Linux

```bash
  ifconfig
```

## Change file name: .env.example to .env

```bash
cp .env.example .env
```

 change IP in .env file

# Start Music Service

```bash

docker volume create --name=nodemodules

docker-compose up -d

```

# Create folder storage music, images

```bash
mkdir -p upload/music
mkdir -p upload/image/music
```

Key bản 8 : .key=eNFaXCjyURVoCCGiHp7HTQ3hDhE/AfL0g8VE1fRbL84=
Key bản 7 : jwplayer.key="YgtWotBOi+JsQi+stgRlQ3SK21W2vbKi/K2V86kVbwU=";