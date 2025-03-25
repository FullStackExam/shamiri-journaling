[**journal-app**](../../../../README.md)

***

[journal-app](../../../../modules.md) / [lib/auth/middleware](../README.md) / getAuthUser

# Function: getAuthUser()

> **getAuthUser**(`reqOrRes`): `object`

Defined in: [src/lib/auth/middleware.ts:53](https://github.com/FullStackExam/shamiri-journaling/blob/2429a79bf524ec1d1bc42e8c42aa2b20457e1d23/src/lib/auth/middleware.ts#L53)

Helper function to get authenticated user from request
For use in route handlers after calling authenticateRequest

## Parameters

### reqOrRes

[`AuthenticatedRequest`](../interfaces/AuthenticatedRequest.md) | `NextResponse`\<`unknown`\>

## Returns

`object`

### email

> **email**: `string`

### id

> **id**: `string`

### name

> **name**: `string`
