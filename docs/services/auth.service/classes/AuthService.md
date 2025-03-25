[**journal-app**](../../../README.md)

***

[journal-app](../../../modules.md) / [services/auth.service](../README.md) / AuthService

# Class: AuthService

Defined in: [src/services/auth.service.ts:25](https://github.com/FullStackExam/shamiri-journaling/blob/2429a79bf524ec1d1bc42e8c42aa2b20457e1d23/src/services/auth.service.ts#L25)

## Constructors

### Constructor

> **new AuthService**(): `AuthService`

#### Returns

`AuthService`

## Methods

### generateCSRFToken()

> **generateCSRFToken**(): `string`

Defined in: [src/services/auth.service.ts:104](https://github.com/FullStackExam/shamiri-journaling/blob/2429a79bf524ec1d1bc42e8c42aa2b20457e1d23/src/services/auth.service.ts#L104)

Generate CSRF token

#### Returns

`string`

***

### generateToken()

> **generateToken**(`payload`): `string`

Defined in: [src/services/auth.service.ts:97](https://github.com/FullStackExam/shamiri-journaling/blob/2429a79bf524ec1d1bc42e8c42aa2b20457e1d23/src/services/auth.service.ts#L97)

Generate JWT token

#### Parameters

##### payload

[`TokenPayload`](../interfaces/TokenPayload.md)

#### Returns

`string`

***

### getUserById()

> **getUserById**(`id`): `Promise`\<\{ `createdAt`: `Date`; `email`: `string`; `id`: `string`; `name`: `string`; \}\>

Defined in: [src/services/auth.service.ts:143](https://github.com/FullStackExam/shamiri-journaling/blob/2429a79bf524ec1d1bc42e8c42aa2b20457e1d23/src/services/auth.service.ts#L143)

Get user by ID

#### Parameters

##### id

`string`

#### Returns

`Promise`\<\{ `createdAt`: `Date`; `email`: `string`; `id`: `string`; `name`: `string`; \}\>

***

### login()

> **login**(`input`): `Promise`\<\{ `csrfToken`: `string`; `token`: `string`; `user`: \{ `email`: `string`; `id`: `string`; `name`: `string`; \}; \}\>

Defined in: [src/services/auth.service.ts:60](https://github.com/FullStackExam/shamiri-journaling/blob/2429a79bf524ec1d1bc42e8c42aa2b20457e1d23/src/services/auth.service.ts#L60)

Login user with email and password

#### Parameters

##### input

###### email

`string` = `...`

###### password

`string` = `...`

#### Returns

`Promise`\<\{ `csrfToken`: `string`; `token`: `string`; `user`: \{ `email`: `string`; `id`: `string`; `name`: `string`; \}; \}\>

***

### register()

> **register**(`input`): `Promise`\<\{ `createdAt`: `Date`; `email`: `string`; `id`: `string`; `name`: `string`; \}\>

Defined in: [src/services/auth.service.ts:29](https://github.com/FullStackExam/shamiri-journaling/blob/2429a79bf524ec1d1bc42e8c42aa2b20457e1d23/src/services/auth.service.ts#L29)

Register a new user

#### Parameters

##### input

###### confirmPassword

`string` = `...`

###### email

`string` = `...`

###### name

`string` = `...`

###### password

`string` = `...`

#### Returns

`Promise`\<\{ `createdAt`: `Date`; `email`: `string`; `id`: `string`; `name`: `string`; \}\>

***

### setAuthCookies()

> **setAuthCookies**(`res`, `token`, `csrfToken`): `void`

Defined in: [src/services/auth.service.ts:111](https://github.com/FullStackExam/shamiri-journaling/blob/2429a79bf524ec1d1bc42e8c42aa2b20457e1d23/src/services/auth.service.ts#L111)

Set JWT and CSRF token as cookies (HTTP-only)

#### Parameters

##### res

`any`

##### token

`string`

##### csrfToken

`string`

#### Returns

`void`

***

### verifyToken()

> **verifyToken**(`token`): [`TokenPayload`](../interfaces/TokenPayload.md)

Defined in: [src/services/auth.service.ts:132](https://github.com/FullStackExam/shamiri-journaling/blob/2429a79bf524ec1d1bc42e8c42aa2b20457e1d23/src/services/auth.service.ts#L132)

Verify JWT token

#### Parameters

##### token

`string`

#### Returns

[`TokenPayload`](../interfaces/TokenPayload.md)
