<p align="center">
  <img src="https://mebohq.github.io/docs/data/logo.png"/>
</p>

## Basic upload examples using express

Running example:
```
git clone https://github.com/meboHQ/example-uploads.git
cd example-uploads
npm install
NODE_ENV=development node .
```

## Requirements
- Node 8 or greater
- Express 4 or greater

## Actions

### Single Upload
`POST: http://localhost:8080/api/upload`

![postman](./data/postmanUpload.png)

*Command-line version:*

```bash
node . --help
node . upload --help
node . upload --image=/tmp/foo.png --description="foo description"
```
---

###  Vector Upload
`POST: http://localhost:8080/api/vectorUpload`

![postman](./data/postmanVectorUpload.png)

*Command-line version:*

```bash
node . --help
node . vectorUpload --help
node . vectorUpload --images=/tmp/foo1.png --images=/tmp/foo2.png --description="foo description"
```
---

###  Vector Upload With Clean-up
`POST: http://localhost:8080/api/cleanupVectorUpload`

![postman](./data/postmanCleanupVectorUpload.png)

*Command-line version:*

```bash
node . --help
node . cleanupVectorUpload --help
node . cleanupVectorUpload --images=/tmp/foo1.png --images=/tmp/foo2.png --description="foo description"
```

## Licensing
Mebo is free software; you can redistribute it and/or modify it under the terms of the MIT License
