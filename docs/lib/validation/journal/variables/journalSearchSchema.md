[**journal-app**](../../../../README.md)

***

[journal-app](../../../../modules.md) / [lib/validation/journal](../README.md) / journalSearchSchema

# Variable: journalSearchSchema

> `const` **journalSearchSchema**: `ZodObject`\<\{ `categories`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `endDate`: `ZodOptional`\<`ZodDate`\>; `limit`: `ZodDefault`\<`ZodNumber`\>; `page`: `ZodDefault`\<`ZodNumber`\>; `q`: `ZodOptional`\<`ZodString`\>; `startDate`: `ZodOptional`\<`ZodDate`\>; \}, `"strip"`, `ZodTypeAny`, \{ `categories`: `string`[]; `endDate`: `Date`; `limit`: `number`; `page`: `number`; `q`: `string`; `startDate`: `Date`; \}, \{ `categories`: `string`[]; `endDate`: `Date`; `limit`: `number`; `page`: `number`; `q`: `string`; `startDate`: `Date`; \}\>

Defined in: src/lib/validation/journal.ts:20
