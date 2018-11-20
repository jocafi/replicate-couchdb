import PouchDB = require("pouchdb");
import ReplicationResultComplete = PouchDB.Replication.ReplicationResultComplete;

export class CouchdbReplicationService {

  private db: PouchDB.Database;
  private _fromCouch: string;
  private _toCouch: string;
  private reading = true;

  constructor(tempDatabase: string) {
    this.db = new PouchDB(tempDatabase);
  }

  public replicate() {
    this.reading = true;
    console.log("Start reading from source %s ...", this._fromCouch);
    const opts = {live: false};
    this.db.replicate.from(this._fromCouch, opts, this.syncResult);
  }

  syncResult = (error: PouchDB.Core.Error | null, result: ReplicationResultComplete<{}> | null): void => {
    if (error) {
      console.error("\n\nAn error occurred:\n");
      console.error(error);
      return;
    }

    if (result && !result.ok) {
      console.error("\n\nSomething went wrong during the processing:\n");
      console.error(error);
      return;
    }
    
    if (result && result.ok && result.status === "complete") {
      console.log("\n\n%s is completed. Results:\n", (this.reading ? "Reading" : "Writing"));
      console.log(result);

      if (this.reading) {
        console.log("\n\nStart writing to target %s ...", this._toCouch);
        this.reading = false;
        const opts = {live: false};
        this.db.replicate.to(this._toCouch, opts, this.syncResult);
      } else {
        console.log("\nReplication done successfully! Check the target CouchDB to verify the database.\n");
      }
    }
  }

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