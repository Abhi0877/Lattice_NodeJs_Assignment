
# Lattice NodeJs Assignment


## Models

- Hospital Model
```
Hospital_name: {String, required,unique,trim}

```

- Patient Model

```
name:    {String,required,trim},
address: {String,required,min: 10},
email: {String, required,unique},
phone: {Number,required,unique},
password: {String,required,min: 8,max: 15},
photo: {String,trim}, // s3 link
psychiatristId:{ObjectId,ref: "psychiatrist"}

```

- Psychiatrist Model

```

psychiatrist_name: {String,required,trim},
email: {String,required,unique},
phone: {Number,required,unique},
patientsId : {[ObjectId]},
hospitalId:{ObjectId,ref: "Hospital"}

```
## API Reference

### Get particular Hospital Details

```http
  GET /hospitals
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `hospitalId` | `string` | **Required**.Id of hospital to fetch |


### Register Patient

```http
  POST /paitents
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|`email`|`string`|**Required**.|
|`password`| `string`|**Required**|
|`psychiatristId`|`string`|**Required**. Id of psychiatrist registering the user|
| `name`      | `string` | **Required**.  |
|`address`|`string`| **Required**.|
|`phone`|`string`|Optional|
|`photo`|`string`|**Required**|

### Register Hospital
```http
  POST /hospitals
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Hospital_name` | `string` | **Required**.Name of hospital to rigster |


### Register Psychiatrist

```http
  POST /psychiatrists
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `psychiatrist_name`      | `string` | **Required**.  |
|`phone`|`string`|**Required**.|
|`email`|`string`|**Required**.|
|`hospital_id`|`string`|**Required**. Id of hospital in which psychiatrist working|



## Additional Info

- MongoDb Cluster is provided in index.js file to test the project.
- Postman collection available on https://www.getpostman.com/collections/fce5c1a5090d3f45f739


## Dependencies Used

`express`
`mongoose`
`aws-sdk`
`body-parser`
`validator`
`nodemon`
`multer`