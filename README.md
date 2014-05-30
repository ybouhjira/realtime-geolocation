# gps-tracking

## running the server

```
node app.js [port]
```
port is by default 8000


## client url
```
http://localhost:8000/client
```

## watch & rebuild js files
see `gulpfile.js`
```
gulp
```

## testing

Running virtual clients

```
casperjs test/test.js [--clients 20 --url localhost:8000/client]
```
