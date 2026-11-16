# Saifi Interior & Furniture

A Vite / React website for Saifi Interior & Furniture in Muzaffarnagar.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The enquiry form opens WhatsApp with a prepared message; it does not send the message automatically. Contact details and page content are in `src/data/site.ts`. The photography is reference imagery, not a portfolio of completed projects.

## Publish and Google Search

1. Deploy this project to Vercel (build command `npm run build`, output directory `dist`) and confirm that the production address is `https://saifiinteriorfurniturepremium.vercel.app/`. If a different domain is used, update the canonical URL, Open Graph URL, structured data in `index.html`, `public/robots.txt`, `public/sitemap.xml` and `SITE_URL` in `src/data/site.ts` to match it.
2. Verify the production website in [Google Search Console](https://search.google.com/search-console/), submit `https://saifiinteriorfurniturepremium.vercel.app/sitemap.xml`, and request indexing for the home page with URL Inspection.
3. If desired, claim or create the business's [Google Business Profile](https://www.google.com/business/) with the real business information and complete Google's verification.

Deployment, Search Console ownership verification and indexing require access to the relevant accounts. Google decides when and how a site appears in search; indexing and a particular search result name are not guaranteed.
