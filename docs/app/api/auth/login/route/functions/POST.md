[**journal-app**](../../../../../../README.md)

***

[journal-app](../../../../../../modules.md) / [app/api/auth/login/route](../README.md) / POST

# Function: POST()

> **POST**(`req`): `Promise`\<`NextResponse`\<\{ `user`: \{ `email`: `string`; `id`: `string`; `name`: `string`; \}; \}\> \| `NextResponse`\<\{ `error`: `string`; \}\>\>

Defined in: [src/app/api/auth/login/route.ts:52](https://github.com/FullStackExam/shamiri-journaling/blob/2429a79bf524ec1d1bc42e8c42aa2b20457e1d23/src/app/api/auth/login/route.ts#L52)

## Parameters

### req

`NextRequest`

## Returns

`Promise`\<`NextResponse`\<\{ `user`: \{ `email`: `string`; `id`: `string`; `name`: `string`; \}; \}\> \| `NextResponse`\<\{ `error`: `string`; \}\>\>

## Swagger

/api/login:
  post:
    summary: Log in a user
    description: Authenticates a user with email and password, returning a JWT token and user information if successful.
    tags:
      - Authentication
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              email:
                type: string
                format: email
              password:
                type: string
    responses:
      200:
        description: Successfully logged in
        content:
          application/json:
            schema:
              type: object
              properties:
                user:
                  type: object
                token:
                  type: string
      400:
        description: Validation error
      401:
        description: Invalid credentials
      500:
        description: Internal server error
