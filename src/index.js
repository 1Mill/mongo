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
		this.client = undefined
		this.clientPromise = undefined
	}

	async connect() {
		if (typeof this.clientPromise === 'undefined') {
			// * https://docs.atlas.mongodb.com/best-practices-connecting-from-aws-lambda/
			this.client = new MongoClient(this.uri, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				...this.options,
			})
			this.clientPromise = this.client.connect()
		}

		this.client = await this.clientPromise

		const db = this.client.db(this.dbName)
		return { client: this.client, db }
	}
}

module.exports = { Mongo }
