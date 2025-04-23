Augmont Gold Backend - Parth Bharsadia

-----------------------------
STEPS TO SETUP
-----------------------------
1. Install Dependency
```
npm install
```

2. To run this project, you need to create an .env file

```
PORT=8082
POSTGRESS_URL="postgresql://postgres:1234@localhost:5432/augmont"
```


2. To start, run below command to generate database setup

```
npx prisma generate
npx prisma db push
```

3. Start Project
```
npm run prod
```

-----------------------------
FEATURES
-----------------------------


User
--------------------------------

CREATE - Create user.

UPDATE - Update user.

READ - Read user.

DELETE - Delete user.

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /user | Create a new user |
| GET | /user/:id| Get a specific user |
| GET | /user?limit=10&offset=0 |  Get list of users (limit & offset are optional; Default limit = 10 and offset = 0) |
| PUT	 | /user/:id	| Update an existing user |
| DELETE | /user/:id	| Delete an user |


User Model

| Method | Type | Nullable | Description |
|--------|----------|----------| ----------- |
| id | Int | false | Unique Identifier of user |
| email | String | false | Email Id of user |
| password | String | false | Secret Character combination for verifying user identity |

Category
--------------------------------

CREATE - Create category.

UPDATE - Update category.

READ - Read category.

DELETE - Delete category.

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /category | Create a new category |
| GET | /category/:id| Get a specific category |
| GET | /category?limit=10&offset=0 |  Get list of categories (limit & offset are optional; Default limit = 10 and offset = 0) |
| PUT	 | /category/:id	| Update an existing category |
| DELETE | /category/:id	| Delete a category |


Category Model

| Method | Type | Nullable | Description |
|--------|----------|----------| ----------- |
| id | Int | false | Unique Identifier of category |
| name | String | false | Name of category |


Product
--------------------------------

CREATE - Create product.

UPDATE - Update product.

READ - Read product.

DELETE - Delete product.

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /product | Create a new product |
| GET | /product/:id| Get a specific product |
| GET | /product?limit=10&offset=0 |  Get list of categories (limit & offset are optional; Default limit = 10 and offset = 0) |
| PUT	 | /product/:id	| Update an existing product |
| DELETE | /product/:id	| Delete a product |
| Post | /product/bulk-upload | Bulk upload Products |

### Bulk Upload Instructions

To use the `/product/bulk-upload` endpoint:

- **Method**: `POST`
- **Endpoint**: `/product/bulk-upload`
- **Content-Type**: `multipart/form-data`
- **Form Field Name**: `file` (must be exactly `'file'`)
- **Accepted File Type**: `.csv`

#### CSV Format

The CSV file must contain the following headers (case-sensitive):


Product Model

| Method | Type | Nullable | Description |
|--------|----------|----------| ----------- |
| id | Int | false | Unique Identifier of product |
| name | String | false | Name of product |
| image | String | false | image url of product |
| price | Float | false | Price of product |
| category_id | Int | false | Id of Category to which Produtc belongs|
