import { kv } from '@vercel/kv'
import { Store } from 'express-session'

export class VercelKvStore extends Store {
  destroy(sid, callback) {
    return kv.del(sid)
      .then(() => {
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  }

  get(sid, callback) {
    return kv.get(sid)
      .then((session) => {
        if (!session) return cb()
        callback(null, session);
      }).catch((err) => {
        callback(err)
      })
  }

  set(sid, session, callback) {
    return kv.set(sid, session)
      .then(() => {
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  }
}
