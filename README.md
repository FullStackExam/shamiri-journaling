# Personal Journaling App

A secure and insightful digital journaling platform that helps users record, organize, and gain meaningful insights from their personal journals.

## Technical Architecture

The Personal Journaling App is built using:

- **Frontend**: Next.js 14 (App Router) with TypeScript and Tailwind CSS
- **Backend**: Next.js API routes for a unified full-stack experience
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with JWT strategy
- **Validation**: Zod for input validation
- **Testing**: Jest

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- pnpm
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone git@github.com:FullStackExam/shamiri-journaling.git
cd shamiri-journaling
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
Create a `.env` file in the root directory from `cp .env.example .env`. Edit the values.

4. Set up the database
```bash
npx prisma migrate dev
```

5. Start the development server
```bash
pnpm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Documentation

### API Documentation

The API documentation is automatically generated using TypeDoc and swagger-jsdoc. To view the documentation:


Access the API documentation at [http://localhost:3000/docs/docs](http://localhost:3000/docs) when the server is running

### Technical Documentation

TypeScript documentation (TSDoc) is available at [/docs](/docs) when the server is running. This documentation provides details about the codebase, interfaces, and implementation details. It can be generated using:

```bash
pnpm typedoc --entryPointStrategy expand --out docs/typedoc src
# or for markdown
pnpm typedoc --plugin typedoc-plugin-markdown --entryPointStrategy expand --out docs src
```

### Design Files

Design mockups and diagrams are available in the [/design](/design) directory:

These files provide visual references and technical specifications for the application design.

## Testing

Run the test suite with:

```bash
npx jest
```