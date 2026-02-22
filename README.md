This is a [Next.js](https://nextjs.org) project in Typescript bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

Other libraries include **React Spring**, **React Query**, **CSS Tachyons**, **Cloudinary**, and **Commitizen** and there is a data layer stack built using **Express** and **axios** to perform REST calls to the Cloudinary admin API for individual photo EXIF data.

## Getting Started

Although it's very straightforward, you do need to start the BFF/data layer server to get any data for individual photos.

First, run the BFF server:

```
cd server
npx tsx ./index.ts
```

Next, run the Next JS dev server:

```bash

npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Background

Many of the choices made in this project were dictated by the shape of the data served by the Cloudinary API. For example, a Node server proved necessary since the admin API would not accept auth headers, even from a NExt JS API Route.

Although the project remains very much a work in progress, I feel it is already a good representation of the vision I had for it as a minimalist light-box sort of experience with a bit of nerdy photog data. It's as close to a bare-bones gallery as I can imagine getting in a browser.

Do not hesitate to submit a pull request if you feel it could do with some added features -- or check the TODOs below for info on what's coming next.

## TODO

- TESTS

- TYPES

- Keyboard nav

- ZOD query validation
