# replicate-couchddb
Replicate CouchdDB using the PouchDB library.

## Getting Started

After cloning the project, execute the command below to download all needed libraries:
```bash
 $ npm install
```
Now you can start replicating a CouchDB (source) to another instance of CouchdDB (target).

```bash
 $ npm start <source url> <target url>
```

or you can also execute the following commands:
```bash
 $ npm run build
 $ node dist/replicate-couchdb.js <source url> <target url>
```
In each case, if the arguments are wrong, a screen will show how to execute the replication correctly:
<pre>
replicate-couchdb.js <command>

Commands:
  replicate-couchdb.js <source url> <target url>  Replicate the source CouchDB to the target

Options:
  --version  Show version number                                                                                                   [boolean]
  --help     Show help                                                                                                             [boolean]

Examples:
  replicate-couchdb.js http://192.168.172.100:5984/mydatabase   http://user:password@localhost:5984/mydatabase
</pre>

## Cleaning before new replication

The `replicate-couchddb` creates temporarily a local database in the folder *./tempdb*. Before starting a new replication, certify to clean everything running the command below:

```bash
 $ npm run clean-all
```
This command removes the folder *./tempdb*. Otherwise, the existing content will be also replicated to the target CouchDB.


## Replication Only

After replicating once, you can replicate the temporarily local database to another CouchDB instances. For this, you have to run teh command below:

```bash
 $ npm run build
 $ node dist/replicate-only-couchdb.js <target url>
```