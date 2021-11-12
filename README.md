# Tusk

![tusk demo shorter](https://user-images.githubusercontent.com/65421744/141385728-2dbe4f45-36e5-423a-a670-581e73c89eae.gif)

---

Tusk is a lightweight task application, with a strong focus on user experience. Written in Typescript. Built with Next.js. Persisted in PostgresQL via Prisma. Styled with Radix UI and Stitches.js. Tested with Jest, Testing Library and Cypress.

## Features

* Sign up/ Sign in through Github or Twitter
* Create collections to categorize tasks
* See how long a collection has been open for
* See how many tasks in a collection have been completed
* Update the name of your collections
* Delete your collections when no longer needed
* Create, edit and delete task items

## Upcoming features and enhancements

* Magic-link email login
* UI improvements
* Boosted performance
* Custom theming

## Tooling

- Language: [Typescript](https://www.typescriptlang.org/)

- Framework: [Next.js](https://nextjs.org/)

- Styling: [Stitches.js](https://stitches.dev/) + [Radix UI](https://www.radix-ui.com/)

- Database: [PostgresQL](https://www.postgresql.org/)

- ORM: [Prisma](https://www.prisma.io/)

- Authentication: [NextAuth](https://next-auth.js.org/)

- Additional Tooling: [SWR](https://swr.vercel.app/), [Prettier](https://prettier.io/), [ESLint](https://eslint.org/)

- Testing: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

- CI/CD: [Github Actions](https://github.com/features/actions)

## Running the project locally

- Clone the project locally

From the repo:

### `git clone`

- Installs dependencies required for the app to run in development mode.

On the command line or in the terminal of your preferred editor, you can run:

```
npm install
# or
yarn 
```

- Create a `.env` file similar to `.env.example`, and ensure it is in `.gitignore`. 

- Add your secrets and tokens for auth and database if necessary. 

- Fire up the development server by running:

```
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000/) to view it in the browser.

## Want to get involved?

Have an idea for a feature or enhancement? Submit a pr and I'll get back to you soon as I can. 

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
