const { MongoClient } = require('mongodb')
const { fetchNodeEnv } = require('./fetchNodeEnv')

class Mongo {
	constructor({
		db = fetchNodeEnv('MILL_MONGO_DB'),
		options = {},
		uri = fetchNodeEnv('MILL_MONGO_URI'),
	}) {
		// * Inputs
		this._dbName = db
		this._options = options
		this._uri = uri

		// * State management
		this._client = undefined
		this._db = undefined
	}

	async connect() {
		if (typeof this._client === 'undefined') {
			this._client = await new MongoClient(this._uri, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				...this._options,
			}).connect()
		}

		if (typeof this._db === 'undefined') {
			this._db = this._client.db(this._dbName)
		}

		return { client: this._client, db: this._db }
	}
}

module.exports = { Mongo }
