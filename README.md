# Setup project in localworksation

## Mongodb 

docker run -d --name mongo -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=123456 -p 27017:27017 mongo

## Streams

### Goto workspace
### Run commnad 

```bash
npm i

change name file: .env.example to .env

npm run start
````

Change SERVER_HOST to your IP

## Goto 

http://IP:3001

http://IP:3001/upload