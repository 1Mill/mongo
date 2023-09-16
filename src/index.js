import { MongoClient } from 'mongodb'

const fetchNodeEnv = name => process && process.env && process.env[name]

export class Mongo {
	constructor({
		db = fetchNodeEnv('MILL_MONGO_DB'),
		options = {},
		uri = fetchNodeEnv('MILL_MONGO_URI'),
	}) {
		// * Inputs
		this.db = db
		if (!this.db) throw new Error('Mongo "db" is required')

		this.options = options

		this.uri = uri
		if (!this.uri) throw new Error('Mongo "uri" is required')

		// * State management
		this.clientPromise = undefined
	}

	// * https://docs.atlas.mongodb.com/best-practices-connecting-from-aws-lambda/
	async connect() {
		if (typeof this.clientPromise === 'undefined') {
			this.clientPromise = new MongoClient(this.uri, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				...this.options,
			}).connect()
		}

		const client = await this.clientPromise
		const db = client.db(this.db)

		return { client, db }
	}
}
