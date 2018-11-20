import * as yargs from "yargs";
import { CouchdbReplicationService } from "./couchdb-replication.service";

// based on https://github.com/yargs/yargs/blob/HEAD/docs/api.md
yargs
  .command("<source url> <target url>", "Replicate the source CouchDB to the target", () => {
    return yargs.positional("source url", {
      describe: "source url for the couch DB",
      type: "string"
    }).positional("target url", {
      describe: "target url for the couch DB",
      type: "string"
    });
  })
  .example("$0 http://192.168.172.100:5984/mydatabase   http://user:password@localhost:5984/mydatabase", "")
  .demandCommand(2, "You need to pass the source and target urls")
  .help()
  .wrap(yargs.terminalWidth())
  .argv;

const sourceUrl = yargs.argv._[0];
const targetUrl = yargs.argv._[1];

console.log("sourceUrl: " + sourceUrl);
console.log("targetUrl: " + targetUrl);

const repCouchDb = new CouchdbReplicationService("tempdb");
repCouchDb.fromCouch = sourceUrl;
repCouchDb.toCouch = targetUrl;

repCouchDb.sync();

