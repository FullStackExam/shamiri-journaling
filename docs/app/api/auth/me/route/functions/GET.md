[**journal-app**](../../../../../../README.md)

***

[journal-app](../../../../../../modules.md) / [app/api/auth/me/route](../README.md) / GET

# Function: GET()

> **GET**(`req`): `Promise`\<`NextResponse`\<`unknown`\>\>

Defined in: [src/app/api/auth/me/route.ts:35](https://github.com/FullStackExam/shamiri-journaling/blob/2429a79bf524ec1d1bc42e8c42aa2b20457e1d23/src/app/api/auth/me/route.ts#L35)

## Parameters

### req

`NextRequest`

## Returns

`Promise`\<`NextResponse`\<`unknown`\>\>

## Swagger

/api/auth/me:
  get:
    summary: Get authenticated user's profile
    description: Fetches the authenticated user's profile.
    tags:
      - Authentication
    responses:
      200:
        description: User profile fetched successfully
        content:
          application/json:
            schema:
              type: object
              properties:
                user:
                  type: object
                  properties:
                    id:
                      type: string
                    email:
                      type: string
                    name:
                      type: string
      401:
        description: Unauthorized (No token or invalid token)
      500:
        description: Internal server error
