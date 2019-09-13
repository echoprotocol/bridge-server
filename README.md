# Echo Bridge Backend

![Travis (.com) branch](https://img.shields.io/travis/com/echoprotocol/bridge-server/master?label=build%20master)
![Travis (.com) branch](https://img.shields.io/travis/com/echoprotocol/bridge-server/develop?label=build%20develop)

Echo Bridge QR-code generator.

## Start Development

### NPM

```bash
npm i
npm run dev:api
```

The application will run on port 3000. If you want to configure port you
can provide `PORT` variable before start. 

```bash
export PORT=3001
npm run dev:api
```

### Docker Compose

You can also start the project with docker or docker-compose.

```bash
export PORT=3001
export CI_FULL_REGISTRY=bridge-backend:develop
docker build --cache-from $CI_FULL_REGISTRY -t $CI_FULL_REGISTRY .
docker-compose up
```

### PM2

For start with `pm2` use next command:

```bash
pm2 start pm2.json --name=bridge-backend
```

## License

The MIT License (MIT)

Copyright (c) 2019-present Echo Technological Solutions LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
