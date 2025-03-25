[**journal-app**](../../../../../../README.md)

***

[journal-app](../../../../../../modules.md) / [app/api/auth/forgot-password/route](../README.md) / POST

# Function: POST()

> **POST**(`req`): `Promise`\<`NextResponse`\<\{ `message`: `string`; \}\> \| `NextResponse`\<\{ `error`: `string`; \}\>\>

Defined in: [src/app/api/auth/forgot-password/route.ts:30](https://github.com/FullStackExam/shamiri-journaling/blob/2429a79bf524ec1d1bc42e8c42aa2b20457e1d23/src/app/api/auth/forgot-password/route.ts#L30)

## Parameters

### req

`NextRequest`

## Returns

`Promise`\<`NextResponse`\<\{ `message`: `string`; \}\> \| `NextResponse`\<\{ `error`: `string`; \}\>\>

## Swagger

/api/auth/forgot-password:
  post:
    summary: Initiate password reset process
    description: Sends a password reset link to the user's email address.
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
    responses:
      200:
        description: Password reset email sent
      400:
        description: Invalid email address
      500:
        description: Internal server error
