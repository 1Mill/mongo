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
		this.db = undefined
	}

	async connect() {
		if (typeof this.client === 'undefined') {
			this.client = await new MongoClient(this.uri, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				...this.options,
			}).connect()
		}

		if (typeof this.db === 'undefined') {
			this.db = this.client.db(this.dbName)
		}

		return { client: this.client, db: this.db }
	}
}

module.exports = { Mongo }
