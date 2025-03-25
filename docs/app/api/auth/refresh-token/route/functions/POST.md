[**journal-app**](../../../../../../README.md)

***

[journal-app](../../../../../../modules.md) / [app/api/auth/refresh-token/route](../README.md) / POST

# Function: POST()

> **POST**(`req`): `Promise`\<`NextResponse`\<\{ `token`: `string`; \}\> \| `NextResponse`\<\{ `error`: `string`; \}\>\>

Defined in: [src/app/api/auth/refresh-token/route.ts:27](https://github.com/FullStackExam/shamiri-journaling/blob/2429a79bf524ec1d1bc42e8c42aa2b20457e1d23/src/app/api/auth/refresh-token/route.ts#L27)

## Parameters

### req

`NextRequest`

## Returns

`Promise`\<`NextResponse`\<\{ `token`: `string`; \}\> \| `NextResponse`\<\{ `error`: `string`; \}\>\>

## Swagger

/api/auth/refresh-token:
  post:
    summary: Refresh authentication token
    description: Refreshes the user's authentication token.
    tags:
      - Authentication
    responses:
      200:
        description: Successfully refreshed token
        content:
          application/json:
            schema:
              type: object
              properties:
                token:
                  type: string
      401:
        description: Invalid or expired refresh token
      500:
        description: Internal server error
