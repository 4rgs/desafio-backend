
const { app } = require("./server")
const { connect, getUri, closeDb } = require("./db/db")

beforeAll(async () => {
    const uri = await getUri()
    await connect({ uri })
})
  
afterAll(async () => {
    await closeDb()
})
describe('server',() => {
    it('Mongo connect', async () => {
        try {
            const uri =  await getUri() 
            await connect({ uri })
            await closeDb()
        } catch (error) {
            return error.message;
        }
    })
    it('Express server Listening', async () => {
        app.on('listened', function() {
            return true;
        });
    })
})
