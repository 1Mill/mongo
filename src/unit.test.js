import { Mongo } from './index.js'

const main = async () => {
	console.log('starting ...')
	const mongo = new Mongo({
		db: 'test-npm-mongo-db',
		uri: 'mongodb://root:password@mongo:27017/',
	})

	const promises = [...Array(1_000)].map(async (_, i) => {
		try {
			const { db } = await mongo.connect()
			const collection = db.collection('npm-mongo-test')

			await collection.insertOne({
				id: i,
				source: 'test',
				time: new Date().toISOString(),
				type: 'example',
			})
			console.log(`Finished: ${i}`)
		} catch (err) {
			console.error(err)
		}
	})
	await Promise.allSettled(promises)

	const { client } = await mongo.connect()
	await client.close()

	console.log('finished')
}
main()
