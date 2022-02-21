const request = require('supertest')
const { app } = require('../server')
const Product = require('./producto')
const { connect, getUri, closeDb } = require('../../db/db')

beforeAll(async () => {
  const uri = await getUri()
  await connect({ uri })
  let seed1 = new Product({
    id: 1,
    brand: 'asd',
    description: 'asdasd',
    image: 'asdasdas',
    price: 12312,
  })
  let seed2 = new Product({
    id: 181,
    brand: 'rvblsml',
    description: 'goeyxg nbowu',
    image: 'www.lider.cl/catalogo/images/toysIcon.svg',
    price: 775722,
  })
  let seed3 = new Product({
    id: 16,
    brand: 'fqqejoy',
    description: 'thyh mpzxgwnw',
    image: 'www.lider.cl/catalogo/images/gamesIcon.svg',
    price: 525834,
  })
  await seed1.save()
  await seed2.save()
  await seed3.save()
})

afterAll(async () => {
  await closeDb()
})

describe('Productos', () => {
  it('GET /productos retorna todos los productos sin descuento', async () => {
    await request(app)
      .get('/productos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  })
  it('GET /productos/busqueda retorna todos los productos con descuento', async () => {
    const response = await request(app)
      .get('/productos/busqueda')
      .set('Content-Type', 'application/json')
    expect(response.statusCode).toEqual(200)
  })
  it('POST /productos/busqueda retorna un solo producto por ID', async () => {
    const response = await request(app)
      .post('/productos/busqueda')
      .send({
        query: '181',
      })
      .set('Accept', 'application/json')
    expect(response.body.length).toEqual(1)
    expect(response.body[0]._id).toEqual(expect.any(String))
    expect(response.body[0].id).toEqual(expect.any(Number))
    expect(response.body[0].brand).toEqual(expect.any(String))
    expect(response.body[0].description).toEqual(expect.any(String))
    expect(response.body[0].image).toEqual(expect.any(String))
    expect(response.body[0].price).toEqual(expect.any(Number))
  })
  it('POST /productos/busqueda retorna un producto con descuento tras cumplirse el palindromo', async () => {
    const response = await request(app)
      .post('/productos/busqueda')
      .send({
        query: '181',
      })
      .set('Accept', 'application/json')
    expect(response.body[0]._id).toEqual(expect.any(String))
    expect(response.body[0].id).toEqual(expect.any(Number))
    expect(response.body[0].brand).toEqual(expect.any(String))
    expect(response.body[0].description).toEqual(expect.any(String))
    expect(response.body[0].image).toEqual(expect.any(String))
    expect(response.body[0].price).toEqual(387861)
  })

  it('POST /productos/busqueda retorna un producto sin descuento tras no ser palimdromo', async () => {
    const response = await request(app)
      .post('/productos/busqueda')
      .send({
        query: 'thyh mpzxgwnw',
      })
      .set('Accept', 'application/json')
    expect(response.statusCode).toEqual(200)
    expect(response.body[0]._id).toEqual(expect.any(String))
    expect(response.body[0].id).toEqual(expect.any(Number))
    expect(response.body[0].brand).toEqual(expect.any(String))
    expect(response.body[0].description).toEqual(expect.any(String))
    expect(response.body[0].image).toEqual(expect.any(String))
    expect(response.body[0].price).toEqual(525834)
  })
  it('POST /productos/busqueda criterio de busqueda con 2 o menos caracteres retorna error 400', async () => {
    const response = await request(app)
      .post('/productos/busqueda')
      .send({
        query: 'ad',
      })
      .set('Accept', 'application/json')
    expect(response.statusCode).toEqual(400)
  })
})
