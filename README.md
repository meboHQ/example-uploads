<p align="center">
  <img src="https://mebohq.github.io/docs/data/logo.png"/>
</p>

## Super basic upload examples using express

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

##### *running on [postman](https://www.getpostman.com)*

---

###  Vector Upload
`POST: http://localhost:8080/api/vectorUpload`

![postman](./data/postmanVectorUpload.png)

##### *running on [postman](https://www.getpostman.com)*

---

###  Vector Upload With Clean-up
`POST: http://localhost:8080/api/cleanupVectorUpload`

![postman](./data/postmanCleanupVectorUpload.png)

##### *running on [postman](https://www.getpostman.com)*

## Licensing
Mebo is free software; you can redistribute it and/or modify it under the terms of the MIT License
