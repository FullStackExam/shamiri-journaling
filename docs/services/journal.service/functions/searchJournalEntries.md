[**journal-app**](../../../README.md)

***

[journal-app](../../../modules.md) / [services/journal.service](../README.md) / searchJournalEntries

# Function: searchJournalEntries()

> **searchJournalEntries**(`query`?, `categories`?, `startDate`?, `endDate`?, `page`?, `limit`?): `Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`JournalEntry`](../interfaces/JournalEntry.md)\>\>

Defined in: src/services/journal.service.ts:120

## Parameters

### query?

`string`

### categories?

`string`[]

### startDate?

`Date`

### endDate?

`Date`

### page?

`number` = `1`

### limit?

`number` = `10`

## Returns

`Promise`\<[`PaginatedResponse`](../interfaces/PaginatedResponse.md)\<[`JournalEntry`](../interfaces/JournalEntry.md)\>\>
