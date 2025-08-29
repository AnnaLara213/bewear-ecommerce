# Be-Wear E-commerce

A modern e-commerce platform built with Next.js 15, TypeScript, and cutting-edge web technologies.

## 🚀 Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod
- **Authentication**: BetterAuth
- **Database**: PostgreSQL
- **ORM**: Drizzle
- **State Management**: React Query
- **Payment**: Stripe

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account (for payments)

> **⚠️ Important for Windows/OneDrive Users**: If you're working on Windows with OneDrive synchronization, you may encounter file system errors. The project includes a `.onedriveignore` file to prevent these issues. If you still experience problems, consider moving the project outside of your OneDrive folder.

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd be-wear
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`

5. Set up the database:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

6. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
src/
├── actions/          # Server Actions
├── app/             # Next.js App Router pages
├── components/      # Reusable UI components
├── db/             # Database schema and configuration
├── hooks/          # Custom React Query hooks
├── lib/            # Utility libraries
└── providers/      # React providers
```

## 🔧 Key Features

- **Modern Authentication**: Secure user authentication with BetterAuth
- **Shopping Cart**: Persistent cart with React Query
- **Product Management**: Dynamic product variants and categories
- **Checkout Process**: Complete Stripe integration
- **Order Management**: User order history and tracking
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 📚 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

## 🚀 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
