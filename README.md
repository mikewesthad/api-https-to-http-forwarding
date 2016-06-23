Node Proxy Server
=================

A node app that proxies GET requests, with CORS support. I was dealing with some APIs that don't serve over HTTPS and I needed a proxy in order to access them over HTTPS.

The app expects a query parameter, `url`, which contains the [URI encoded](http://www.w3schools.com/tags/ref_urlencode.asp) URL that is being proxied. Assuming that the app is hosted at https://www.demo-url.com, you can use it like this to request the page for www.google.com:

```
https://www.demo-url.com?url=http%3A%2F%2Fwww.google.com
```

Or if you are talking to the Google location API and asking for a JSON file via https://maps.googleapis.com/maps/api/geocode/json?address=Chicago:

```
https://www.demo-url.com?url=https%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fgeocode%2Fjson%3Faddress%3DChicago
```

The CORS options are set [here](https://github.com/mikewesthad/api-https-to-http-forwarding/blob/master/app.js#L7). See the cors node package [documentation](https://github.com/expressjs/cors#configuration-options) for how to change the whitelisted domains.
