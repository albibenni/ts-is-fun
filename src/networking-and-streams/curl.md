# Curl

## Commands

`curl -s https://frontendmasters.com/courses/networking-streams/curl/`## Curl example
Will print out the get from the website requested -- in this case the html

- `-s` means silent

#### Get the header

`curl -I -s https://frontendmasters.com/courses/networking-streams/curl/`## Curl example
or
`curl -sI https://frontendmasters.com/courses/networking-streams/curl/`## Curl example
returns:

```bash
$ curl -I -s https://frontendmasters.com/courses/networking-streams/curl/
HTTP/2 200
date: Sun, 10 Aug 2025 09:56:51 GMT
content-type: text/html
content-length: 26833
server: nginx/1.16.1
vary: Accept-Encoding
accept-ranges: bytes
cache-control: no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0
last-modified: Sunday, 10-Aug-2025 09:56:51 GMT
vary: Accept-Encoding
```

## HTTP Verb

`-X` specify the verb

### example

`curl -X POST http://localhost:8080 -d title=whatever \
-d date=1754814567561 -d body='beep boop!'`

## Headers

`-H` set the headers

### examples
`curl -X POST http://localhost:8080 -d title=whatever \
-d date=1754814567561 -d body='beep boop!' -H cool:bbeeey`
