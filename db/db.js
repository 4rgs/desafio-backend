const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

mongoose.Promise = Promise

const mongoServer = new MongoMemoryServer()

module.exports.getUri = async () => {
  if (process.env.NODE_ENV === 'test') {
    return await mongoServer.getUri()
  }else return `mongodb://productListUser:productListPassword@127.0.0.1:27017/promotions?authSource=admin` //PRODUCTIVO
}

module.exports.connect = async function ({ uri }) {
  const mongooseOpts = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }

  await mongoose.connect(uri, mongooseOpts)

  mongoose.connection.once('open', (err, resp) => {
    console.log(`MongoDB successfully connected to ${uri} with response ${resp}`)
  })
}
module.exports.closeDb = async () => {
  await mongoose.disconnect()

  if (process.env.NODE_ENV === 'test') {
    await mongoServer.stop()
  }
}
