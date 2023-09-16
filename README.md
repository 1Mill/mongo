# @1mill/mongo

Reuse MongoDB connections between AWS Lambda invocations.

```bash
npm install @1mill/mongo
```

```node
const { Mongo } = require('@1mill/mongo')

const mongo = new Mongo({
  db: 'my-database-name',
  uri: 'mongodb://my-username:my-password@my-mong-host-name:27017/my-database-name',
})

exports.handler = async (cloudevent = {}, ctx = {}) {
  ctx.callbackWaitsForEmptyEventLoop = false

  const { db } = await mongo.connect()

  const collection = db.collection('my-collection-name')
  await collection.createIndex({ something: 1 })
  await collection.insertOne({ something: 'yes' })
}
```

| Name    | Required | Default                    | Notes                                                         |
|---------|----------|----------------------------|---------------------------------------------------------------|
| db      |          | process.env.MILL_MONGO_DB  |                                                               |
| options |          | {}                         | `useNewUrlParser` and `useUnifiedTopology` enabled by default |
| uri     | yes      | process.env.MILL_MONGO_URI |                                                               |
