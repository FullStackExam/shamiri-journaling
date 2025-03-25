[**journal-app**](../../../../README.md)

***

[journal-app](../../../../modules.md) / [lib/auth/middleware](../README.md) / AuthenticatedRequest

# Interface: AuthenticatedRequest

Defined in: [src/lib/auth/middleware.ts:4](https://github.com/FullStackExam/shamiri-journaling/blob/2429a79bf524ec1d1bc42e8c42aa2b20457e1d23/src/lib/auth/middleware.ts#L4)

## Extends

- `NextRequest`

## Properties

### \[INTERNALS\]

> **\[INTERNALS\]**: `object`

Defined in: node\_modules/.pnpm/next@15.2.4\_@babel+core@7.26.10\_react-dom@19.0.0\_react@19.0.0\_\_react@19.0.0/node\_modules/next/dist/server/web/spec-extension/request.d.ts:11

#### cookies

> **cookies**: `RequestCookies`

#### nextUrl

> **nextUrl**: `NextURL`

#### url

> **url**: `string`

#### Inherited from

`NextRequest.[INTERNALS]`

***

### body

> `readonly` **body**: `null` \| `ReadableStream`\<`Uint8Array`\<`ArrayBufferLike`\>\>

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:3534

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/body)

#### Inherited from

`NextRequest.body`

***

### bodyUsed

> `readonly` **bodyUsed**: `boolean`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:3536

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/bodyUsed)

#### Inherited from

`NextRequest.bodyUsed`

***

### cache

> `readonly` **cache**: `RequestCache`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:19745

Returns the cache mode associated with request, which is a string indicating how the request will interact with the browser's cache when fetching.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/cache)

#### Inherited from

`NextRequest.cache`

***

### credentials

> `readonly` **credentials**: `RequestCredentials`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:19751

Returns the credentials mode associated with request, which is a string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/credentials)

#### Inherited from

`NextRequest.credentials`

***

### destination

> `readonly` **destination**: `RequestDestination`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:19757

Returns the kind of resource requested by request, e.g., "document" or "script".

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/destination)

#### Inherited from

`NextRequest.destination`

***

### headers

> `readonly` **headers**: `Headers`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:19763

Returns a Headers object consisting of the headers associated with request. Note that headers added in the network layer by the user agent will not be accounted for in this object, e.g., the "Host" header.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/headers)

#### Inherited from

`NextRequest.headers`

***

### integrity

> `readonly` **integrity**: `string`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:19769

Returns request's subresource integrity metadata, which is a cryptographic hash of the resource being fetched. Its value consists of multiple hashes separated by whitespace. [SRI]

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/integrity)

#### Inherited from

`NextRequest.integrity`

***

### keepalive

> `readonly` **keepalive**: `boolean`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:19775

Returns a boolean indicating whether or not request can outlive the global in which it was created.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/keepalive)

#### Inherited from

`NextRequest.keepalive`

***

### method

> `readonly` **method**: `string`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:19781

Returns request's HTTP method, which is "GET" by default.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/method)

#### Inherited from

`NextRequest.method`

***

### mode

> `readonly` **mode**: `RequestMode`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:19787

Returns the mode associated with request, which is a string indicating whether the request will use CORS, or will be restricted to same-origin URLs.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/mode)

#### Inherited from

`NextRequest.mode`

***

### redirect

> `readonly` **redirect**: `RequestRedirect`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:19793

Returns the redirect mode associated with request, which is a string indicating how redirects for the request will be handled during fetching. A request will follow redirects by default.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/redirect)

#### Inherited from

`NextRequest.redirect`

***

### referrer

> `readonly` **referrer**: `string`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:19799

Returns the referrer of request. Its value can be a same-origin URL if explicitly set in init, the empty string to indicate no referrer, and "about:client" when defaulting to the global's default. This is used during fetching to determine the value of the `Referer` header of the request being made.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/referrer)

#### Inherited from

`NextRequest.referrer`

***

### referrerPolicy

> `readonly` **referrerPolicy**: `ReferrerPolicy`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:19805

Returns the referrer policy associated with request. This is used during fetching to compute the value of the request's referrer.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/referrerPolicy)

#### Inherited from

`NextRequest.referrerPolicy`

***

### signal

> `readonly` **signal**: `AbortSignal`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:19811

Returns the signal associated with request, which is an AbortSignal object indicating whether or not request has been aborted, and its abort event handler.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/signal)

#### Inherited from

`NextRequest.signal`

***

### user?

> `optional` **user**: `object`

Defined in: [src/lib/auth/middleware.ts:5](https://github.com/FullStackExam/shamiri-journaling/blob/2429a79bf524ec1d1bc42e8c42aa2b20457e1d23/src/lib/auth/middleware.ts#L5)

#### email

> **email**: `string`

#### id

> **id**: `string`

#### name

> **name**: `string`

## Accessors

### cookies

#### Get Signature

> **get** **cookies**(): `RequestCookies`

Defined in: node\_modules/.pnpm/next@15.2.4\_@babel+core@7.26.10\_react-dom@19.0.0\_react@19.0.0\_\_react@19.0.0/node\_modules/next/dist/server/web/spec-extension/request.d.ts:17

##### Returns

`RequestCookies`

#### Inherited from

`NextRequest.cookies`

***

### nextUrl

#### Get Signature

> **get** **nextUrl**(): `NextURL`

Defined in: node\_modules/.pnpm/next@15.2.4\_@babel+core@7.26.10\_react-dom@19.0.0\_react@19.0.0\_\_react@19.0.0/node\_modules/next/dist/server/web/spec-extension/request.d.ts:18

##### Returns

`NextURL`

#### Inherited from

`NextRequest.nextUrl`

***

### page

#### Get Signature

> **get** **page**(): `void`

Defined in: node\_modules/.pnpm/next@15.2.4\_@babel+core@7.26.10\_react-dom@19.0.0\_react@19.0.0\_\_react@19.0.0/node\_modules/next/dist/server/web/spec-extension/request.d.ts:24

##### Deprecated

`page` has been deprecated in favour of `URLPattern`.
Read more: https://nextjs.org/docs/messages/middleware-request-page

##### Returns

`void`

#### Inherited from

`NextRequest.page`

***

### ua

#### Get Signature

> **get** **ua**(): `void`

Defined in: node\_modules/.pnpm/next@15.2.4\_@babel+core@7.26.10\_react-dom@19.0.0\_react@19.0.0\_\_react@19.0.0/node\_modules/next/dist/server/web/spec-extension/request.d.ts:30

##### Deprecated

`ua` has been removed in favour of `userAgent` function.
Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent

##### Returns

`void`

#### Inherited from

`NextRequest.ua`

***

### url

#### Get Signature

> **get** **url**(): `string`

Defined in: node\_modules/.pnpm/next@15.2.4\_@babel+core@7.26.10\_react-dom@19.0.0\_react@19.0.0\_\_react@19.0.0/node\_modules/next/dist/server/web/spec-extension/request.d.ts:31

Returns the URL of request as a string.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/url)

##### Returns

`string`

#### Inherited from

`NextRequest.url`

## Methods

### arrayBuffer()

> **arrayBuffer**(): `Promise`\<`ArrayBuffer`\>

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:3538

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/arrayBuffer)

#### Returns

`Promise`\<`ArrayBuffer`\>

#### Inherited from

`NextRequest.arrayBuffer`

***

### blob()

> **blob**(): `Promise`\<`Blob`\>

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:3540

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/blob)

#### Returns

`Promise`\<`Blob`\>

#### Inherited from

`NextRequest.blob`

***

### bytes()

> **bytes**(): `Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:3542

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/bytes)

#### Returns

`Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

#### Inherited from

`NextRequest.bytes`

***

### clone()

> **clone**(): `Request`

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:19819

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/clone)

#### Returns

`Request`

#### Inherited from

`NextRequest.clone`

***

### formData()

> **formData**(): `Promise`\<`FormData`\>

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:3544

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/formData)

#### Returns

`Promise`\<`FormData`\>

#### Inherited from

`NextRequest.formData`

***

### json()

> **json**(): `Promise`\<`any`\>

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:3546

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/json)

#### Returns

`Promise`\<`any`\>

#### Inherited from

`NextRequest.json`

***

### text()

> **text**(): `Promise`\<`string`\>

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:3548

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/text)

#### Returns

`Promise`\<`string`\>

#### Inherited from

`NextRequest.text`
