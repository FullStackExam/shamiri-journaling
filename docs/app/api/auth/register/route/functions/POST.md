[**journal-app**](../../../../../../README.md)

***

[journal-app](../../../../../../modules.md) / [app/api/auth/register/route](../README.md) / POST

# Function: POST()

> **POST**(`req`): `Promise`\<`NextResponse`\<\{ `user`: \{ `createdAt`: `Date`; `email`: `string`; `id`: `string`; `name`: `string`; \}; \}\> \| `NextResponse`\<\{ `error`: `string`; \}\>\>

Defined in: [src/app/api/auth/register/route.ts:50](https://github.com/FullStackExam/shamiri-journaling/blob/2429a79bf524ec1d1bc42e8c42aa2b20457e1d23/src/app/api/auth/register/route.ts#L50)

## Parameters

### req

`NextRequest`

## Returns

`Promise`\<`NextResponse`\<\{ `user`: \{ `createdAt`: `Date`; `email`: `string`; `id`: `string`; `name`: `string`; \}; \}\> \| `NextResponse`\<\{ `error`: `string`; \}\>\>

## Swagger

/api/register:
  post:
    summary: Register a new user
    description: Creates a new user with email and password and returns the created user details.
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
      201:
        description: Successfully registered user
        content:
          application/json:
            schema:
              type: object
              properties:
                user:
                  type: object
      400:
        description: Validation error
      409:
        description: User with this email already exists
      500:
        description: Internal server error
