# Tyrulner

## A url shortener made with typescripts, mongodb and expressjs!

[![Static Badge](https://img.shields.io/badge/License-MIT-green)](https://github.com/CarlosDanielMaturano/Tyrulner-Typescript_url_shortener/blob/main/LICENSE.txt)
[![Static Badge](https://img.shields.io/badge/yarn-1.22.19-blue)]()

This project is a simple url shortener, where it can take a big url, and convert into a shorten one.

## Getting started

1.  Clone the repo

```bash
   https://github.com/CarlosDanielMaturano/Tyrulner-Typescript_url_shortener
```

2. Install the required dependencies

```bash
   yarn install
   npm install
```

3. Create a <strong>.env</strong> file and your mongoDB connection string

```
    DB_URI=mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@mongodb0.example.com/?authSource=admin&replicaSet=myRepl
```

4. Run the project

```bash
    yarn dev
    npm run dev
```

5. Build the project

```bash
    yarn build
    npm build

    node ./build/server.js
```

6.Testing

Curl the application

```bash
    curl http://localhost:5000/api/hello
```

Response

```bash
    {
        "statusCode":200,
        "message": "Hello world"
    }

```

### Using and consuming the api

<p>The project has it own api that you can use, you just need to make make a post request.</p>
<p>Once the app is running.</p>

        App running on http://localhost:5000

<p> Make a post request to <strong>/api/new</strong> with the body containing one single parameter, the url</p>

        curl -X POST http://localhost:5000/api/new -H "Content-Type: application/json"  -d '{"url": "https://facebook.com"}'

<p>And you should get an response with the result

        {
            "original":"https://facebook.com",
            "shorten":"http://localhost:5000/api/-LYkSufRj",
            "message":"Sucessfuly create a new url",
            "statusCode":201
        }

<p>Or an error</p>

        {
            "statusCode":400,
            "message":"url not given"

        }

<p>You can verify the information of a existing url, by going into <strong>api/inspect/:urlid</strong></p>

    curl http://localhost:5000/api/inspect/EHzfnRecY

    {
        "url":
            {
                "originalUrl":"https://github.com/CarlosDanielMaturano/Tyrulner-Typescript_url_shortener",
                "short":"EHzfnRecY",
                "date":"2023-11-16T22:54:10.371Z"
            },
        "statusCode":200
    }

<p>By providing the <strong>qrCode</strong>option in the request body, you'll get a DataUrl string, containing the related qrCode data</p>

    {
        "original": "https://www.google.com",
        "shorten": "http://localhost:5000/api/uCk4HFbgM",
        "message": "Sucessfuly create a new url",
        "statusCode": 201,
        "qrCodeBufData": "data:image/png;base64,\
        iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATESURBVO3BQY4cSRIEQbVA/f/..."
    }

<p>For now, that string can only be aplied on a \<img\> tag, and it will display the qrcode</p>

<p>To see all existing urls, go to <strong>/api/all</strong></p>

## Todo

    [] Add a feature to view the existing shorten urls
    [] Improve the docs
    [] Cache the last urls created by the user, and make it accesible via front end
    [] Improve the static page UI
