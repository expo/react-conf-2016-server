/**
 * @providesModule DB
 *
 * The rethinkdb database
 *
 * We use rethinkdbdash since the interface ends up being a bit
 * nicer and it handles connection pooling, etc.
 */

import thinky from 'thinky';
import url from 'url';

export function parseRethinkUrl(input) {
  const parts = url.parse(input);

  if (parts.protocol !== 'rethinkdb:') {
    throw new Error('unsupported protocol: ' + parts.protocol);
  }

  let options = {};
  if (parts.hostname) {
    options.host = parts.hostname;
  }

  if (parts.port) {
    options.port = parseInt(parts.port, 10);
  }

  if (parts.pathname && parts.pathname !== '/') {
    options.db = parts.pathname.substr(1);
  }

  if (parts.auth) {
    let i = parts.auth.indexOf(':');
    if (i === -1) {
      throw new Error('both a (dummy) username and a password must be provided');
    }
    options.authKey = parts.auth.substr(i + 1);
  }

  return options;
}

const dbName = process.env.TEST ? 'react_conf_test' : 'react_conf';

const config = {
  ...parseRethinkUrl(process.env.RETHINKDB_URL || `rethinkdb://react-conf.docker.dev:28015/${dbName}`),
  // ...(process.env.RETHINKDB_CACERT ? { ssl: { ca: process.env.RETHINKDB_CACERT } } : {} )
};

const db = thinky(config);

export default db;
export const fType = db.type;
export const r = db.r;
