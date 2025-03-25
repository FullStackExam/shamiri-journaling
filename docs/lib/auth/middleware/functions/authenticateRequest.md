[**journal-app**](../../../../README.md)

***

[journal-app](../../../../modules.md) / [lib/auth/middleware](../README.md) / authenticateRequest

# Function: authenticateRequest()

> **authenticateRequest**(`req`): `Promise`\<[`AuthenticatedRequest`](../interfaces/AuthenticatedRequest.md) \| `NextResponse`\<`unknown`\>\>

Defined in: [src/lib/auth/middleware.ts:15](https://github.com/FullStackExam/shamiri-journaling/blob/2429a79bf524ec1d1bc42e8c42aa2b20457e1d23/src/lib/auth/middleware.ts#L15)

Middleware to authenticate requests using JWT

## Parameters

### req

`NextRequest`

## Returns

`Promise`\<[`AuthenticatedRequest`](../interfaces/AuthenticatedRequest.md) \| `NextResponse`\<`unknown`\>\>
