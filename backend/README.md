# Tekashi Roll API
**Api from Tekashi Roll App**

_I still working on the api_

## Routes

### Auth
_This routes and methods receive the information by a json body_
* **GET**
    * "/auth"
* **POST**
    * "/auth/login"
    * "/auth/signup
### Products
* **GET**
    * "/products"
    * "/products/:id"

_This routes and methods should receive an auth token in the headers_

* **POST** \
_Products POST request receive the information by a form-data (It's necessary a image)_

    * "/products"
* **PATCH** \
_Products PATCH request receive the information by a form-data_

    * "/products/:id" _This route should have a valid ObjectID_

* **DELETE**
    * "/products" _This route receive the product id in a json body_

### Categories
* **GET**
    * "/subcategories"
    * "/subcategories/:id" _This route should have a valid ObjectId_

_This routes and methods should receive an auth token in the headers and receive the information by a json body_

* **POST**

    * "/subcategories"

* **PATCH**\
_Need the subcategory id_
    * "/subcategories"

* **DELETE**\
_Need the subcategory id_
    * "/subcategories"


### Subcategories
* **GET**
    * "/subcategories"
    * "/subcategories/:id" _This route should have a valid ObjectId_

_This routes and methods should receive an auth token in the headers and receive the information by a json body_

* **POST**

    * "/subcategories"

* **PATCH**\
_Need the subcategory id_
    * "/subcategories"

* **DELETE**\
_Need the subcategory id_
    * "/subcategories"

## Developer 
You need to have `Node.js` installed and have terminal access to follow next steps:

* **Install dependecies**
```
    npm install
```
* **Run locally (PORT 3000)**
```
    npm run dev
```
### Linter
The project uses `standard-with-typescript` linter in order to get the code cleaner, you can use it with keyboard shortcuts or runing the "lint" script:
```
    npm run lint
```
### Testing
You can run all unit test using "test" command:

* **Run all tests**
```
    npm run test

```
Or also use test:{name of test} to run just one test:
* **Run just one test**
```
    npm run test AuthControllers.test.ts (nombre el archivo del test)
```
_You can find more test scripts in the package.json file_

### Production
You can build the app using build script:
```
    npm run build
```
_This script compile code from Typescript to Javascript_

Also you can use start script in order to build and run the code: 
```
    npm run start
``` 
_This script compiles the code (using the same command as 'build') and runs the compiled code_

**For production you need to use _npm run start_**
## Libraries
* typescript
* express
* bcrypt
* supertest
* ts-node-dev
* eslint-config-standard-with-typescript

## To do
- Add password validation
- Fix Multer folders logic
- Add order features (sockets) _El carrito va a generar las ordenes por lo cual solo se tiene que implementar las caracteristicas de gestion de ordenes_
