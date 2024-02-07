import postgres from 'postgres'
import config from './config'
/* eslint-disable-next-line */
const sql = postgres(config.DATABASE_CONNECTION_STRING!)

export default sql
