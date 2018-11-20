import PouchDB = require("pouchdb");
import ReplicationResultComplete = PouchDB.Replication.ReplicationResultComplete;

export class CouchdbReplicationService {

  private db: PouchDB.Database;
  private _fromCouch: string;
  private _toCouch: string;

  constructor(tempDatabase: string) {
    this.db = new PouchDB(tempDatabase);
  }

  public sync() {
    console.log("Start syncing ...");
    const opts = {live: false};
    this.db.replicate.from(this._fromCouch, opts, this.syncResult);
    this.db.replicate.to(this._toCouch, opts, this.syncResult);
    console.log("Syncing ...");
  }

  syncResult = (error: PouchDB.Core.Error | null, result: ReplicationResultComplete<{}> | null): void => {
    if (error) {
      console.error("An error occurred...");
      console.error(error);
    }

    if (result) {
      console.log("Results...");
      console.log(result);
    }
  };

  get toCouch(): string {
    return this._toCouch;
  }

  set toCouch(value: string) {
    this._toCouch = value;
  }

  get fromCouch(): string {
    return this._fromCouch;
  }

  set fromCouch(value: string) {
    this._fromCouch = value;
  }
}