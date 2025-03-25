[**journal-app**](../../../../../../README.md)

***

[journal-app](../../../../../../modules.md) / [app/api/auth/reset-password/route](../README.md) / POST

# Function: POST()

> **POST**(`req`): `Promise`\<`NextResponse`\<\{ `message`: `string`; \}\> \| `NextResponse`\<\{ `error`: `string`; \}\>\>

Defined in: [src/app/api/auth/reset-password/route.ts:31](https://github.com/FullStackExam/shamiri-journaling/blob/2429a79bf524ec1d1bc42e8c42aa2b20457e1d23/src/app/api/auth/reset-password/route.ts#L31)

## Parameters

### req

`NextRequest`

## Returns

`Promise`\<`NextResponse`\<\{ `message`: `string`; \}\> \| `NextResponse`\<\{ `error`: `string`; \}\>\>

## Swagger

/api/auth/reset-password:
  post:
    summary: Reset password
    description: Resets the user's password using a valid reset token and new password.
    tags:
      - Authentication
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              token:
                type: string
              password:
                type: string
    responses:
      200:
        description: Password successfully reset
      400:
        description: Invalid token or password
      500:
        description: Internal server error
