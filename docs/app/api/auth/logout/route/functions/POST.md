[**journal-app**](../../../../../../README.md)

***

[journal-app](../../../../../../modules.md) / [app/api/auth/logout/route](../README.md) / POST

# Function: POST()

> **POST**(`req`): `Promise`\<`NextResponse`\<\{ `message`: `string`; \}\> \| `NextResponse`\<\{ `error`: `string`; \}\>\>

Defined in: [src/app/api/auth/logout/route.ts:17](https://github.com/FullStackExam/shamiri-journaling/blob/2429a79bf524ec1d1bc42e8c42aa2b20457e1d23/src/app/api/auth/logout/route.ts#L17)

## Parameters

### req

`NextRequest`

## Returns

`Promise`\<`NextResponse`\<\{ `message`: `string`; \}\> \| `NextResponse`\<\{ `error`: `string`; \}\>\>

## Swagger

/api/auth/logout:
  post:
    summary: Log out a user
    description: Logs the user out by invalidating their authentication token.
    tags:
      - Authentication
    responses:
      200:
        description: Successfully logged out
      500:
        description: Internal server error
