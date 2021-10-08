const { MongoClient } = require('mongodb')
const { fetchNodeEnv } = require('./fetchNodeEnv')

class Mongo {
	constructor({
		db = fetchNodeEnv('MILL_MONGO_DB'),
		options = {},
		uri = fetchNodeEnv('MILL_MONGO_URI'),
	}) {
		// * Inputs
		this.dbName = db
		this.options = options
		this.uri = uri

		// * State management
		this.clientPromise = undefined
	}

	async connect() {
		if (typeof this.clientPromise === 'undefined') {
			this.clientPromise = new MongoClient(this.uri, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				...this.options,
			}).connect()
		}

		const client = await this.clientPromise
		const db = client.db(this.dbName)

		return { client, db }
	}
}

module.exports = { Mongo }
