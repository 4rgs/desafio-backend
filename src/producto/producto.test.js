const request = require("supertest")
const { app } = require("../../server")
const Product = require('./producto')
const { connect, getUri, closeDb } = require("../../db/db")

beforeAll(async () => {
    const uri = await getUri()
        await connect({ uri })
        let seed1= new Product({id:1,brand:'asd',description:'asdasd',image:'asdasdas',price:12312})
        let seed2= new Product({
            id: 181,
            brand: "rvblsml",
            description: "goeyxg nbowu",
            image: "www.lider.cl/catalogo/images/toysIcon.svg",
            price: 775722
        })
        let seed3= new Product({
            id: 16,
            brand: "fqqejoy",
            description: "thyh mpzxgwnw",
            image: "www.lider.cl/catalogo/images/gamesIcon.svg",
            price: 525834
        })
        
        await seed1.save()
        await seed2.save()
        await seed3.save()
})
  
afterAll(async () => {
    await closeDb()
})
describe('productos',() => {
    it('GET /productos retorna todos los productos', async () => {
        await request(app)
            .get('/productos')
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200);
    })
    it('GET /productos/busqueda trae el primer producto', async () => {
        const response = await request(app)
            .get('/productos/busqueda')
            .send({
                id: 1
            })
            .set("Accept", "application/json");
        expect(response.body[0]._id).toEqual(expect.any(String))
        expect(response.body[0].id).toEqual(expect.any(Number))
        expect(response.body[0].brand).toEqual(expect.any(String))
        expect(response.body[0].description).toEqual(expect.any(String))
        expect(response.body[0].image).toEqual(expect.any(String))
        expect(response.body[0].price).toEqual(expect.any(Number))
    })
    it('GET /productos/busqueda busco un palindrome me retorna el producto con descuento', async () => {

        const response = await request(app)
            .get('/productos/busqueda')
            .send({
                id: 181
            })
            .set("Accept", "application/json");
        expect(response.body[0]._id).toEqual(expect.any(String))
        expect(response.body[0].id).toEqual(expect.any(Number))
        expect(response.body[0].brand).toEqual(expect.any(String))
        expect(response.body[0].description).toEqual(expect.any(String))
        expect(response.body[0].image).toEqual(expect.any(String))
        expect(response.body[0].price).toEqual(387861)
    })
    it('GET /productos/busqueda busco un no palindrome me retorna el producto sin descuento', async () => {
        const response = await request(app)
            .get('/productos/busqueda')
            .send({
                brand : 'fqqejoy'
            })
            .set("Accept", "application/json");
        expect(response.statusCode).toEqual(200)
        expect(response.body[0]._id).toEqual(expect.any(String))
        expect(response.body[0].id).toEqual(expect.any(Number))
        expect(response.body[0].brand).toEqual(expect.any(String))
        expect(response.body[0].description).toEqual(expect.any(String))
        expect(response.body[0].image).toEqual(expect.any(String))
        expect(response.body[0].price).toEqual(525834)
    })
    
})
