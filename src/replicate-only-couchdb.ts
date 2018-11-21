import * as yargs from "yargs";
import { CouchdbReplicationService } from "./couchdb-replication.service";

// based on https://github.com/yargs/yargs/blob/HEAD/docs/api.md
yargs
  .command("<target url>", "Replicate only the existing CouchDB to the target", () => {
    return yargs.positional("target url", {
      describe: "target url for the couch DB",
      type: "string"
    });
  })
  .example("$0 http://user:password@localhost:5984/mydatabase", "")
  .demandCommand(1, "You need to pass the target url")
  .help()
  .wrap(yargs.terminalWidth())
  .argv;

const targetUrl = yargs.argv._[0];

console.log("targetUrl: " + targetUrl);

const repCouchDb = new CouchdbReplicationService("tempdb");
repCouchDb.toCouch = targetUrl;

repCouchDb.replicateOnly();

