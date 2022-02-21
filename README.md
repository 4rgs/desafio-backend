
# Desafio BackEnd



Servicio API REST para el Desafio [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=SpidohCL_desafio-backend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=SpidohCL_desafio-backend)

## API Reference

#### Get all products

```http
  GET /productos
```

#### Get all products with discount if has it

```http
  GET /productos/busqueda
```

#### Find Product

```http
  POST /productos/busqueda
```

| Parameter     | Type     | Description                       |
| :--------     | :------- | :-------------------------------- |
| `id`          | `Number` | Id of item to fetch               |
| `brand`       | `String` | brand of item to fetch               |
| `description` | `String` | description of item to fetch               |


## Deployment

To deploy this proyecto first we need to deploy this repo and have Docker installed:
```bash
git clone https://github.com/walmartdigital/products-db
```
```bash
cd products-db
```
```bash
sudo make database-docker-up
```
```bash
sudo make database-provision

```
```bash
cd ..
```
Then we can deploy our service that will run on previous DATABASE

```bash
git clone https://github.com/SpidohCL/desafio-backend
```
```bash
cd desafio-backend
```
```bash
npm install
```
```bash
npm run start
```


## Authors

- [@AlvaroGonzalez](https://github.com/SpidohCL)


## Demo en Heroku (Failing)

https://desafio-backend-ags.herokuapp.com/
