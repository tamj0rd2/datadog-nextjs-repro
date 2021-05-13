# Getting started

- Install dependencies - `npm i`
- Run the development server - `npm run dev`
  - When you throw an error, source maps work in the browser console and in datadog
- Run in production mode - `npm run build && npm run uploadSourceMaps && npm start`
  - When you throw an error, source maps work in the browser console but NOT in datadog
