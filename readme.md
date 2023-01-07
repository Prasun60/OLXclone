
# OLX CLONE

### Local Set Up
Make a folder.
In the terminal , run the following command.
```
git clone https://github.com/ImAnshuJoshi/olx-clone.git
```
Now go to the root directory or the backend folder or run the following command.
```
cd ./olx-clone/backend
```
Install the dependencies
```
npm install
```
Make a .env file in the root of backend folder.
```
MONGO=
PORT=
JWT=
CLOUD_NAME=
API_KEY=
API_SECRET=

```
Now, Run the server
```
npm start
```
The server is now up and running......

Now open new terminal window in the root directory.
And jump to the frontend folder.
```
cd ./olx-clone/frontend
```
Install the dependencies
```
npm i
```
Now change the .env.local file to the port that is specified in the PORT in .env of backend.

At last , start the environment.
```
npm run start:local
```

Now the website is ready to use!!!