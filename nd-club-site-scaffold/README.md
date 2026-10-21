# ND AI 3D Club

The club website. A gallery of 3D work made by members, rendered live in the
browser so you can spin each model instead of looking at a screenshot.

Built with Next.js, Tailwind, and Three.js (via React Three Fiber).

## Run it

You need either Node 22+ installed, or nothing at all if you use Codespaces.

### In your browser (nothing to install)

Click the green **Code** button at the top of this repo, open the
**Codespaces** tab, and click **Create codespace on main**. Wait about a
minute. Dependencies install themselves. Then in the terminal at the bottom:

```
npm run dev
```

A popup offers to open the site. Click it.

### On your own machine

```
git clone https://github.com/andywu1115/nd-club-site.git
cd nd-club-site
npm install
npm run dev
```

Open http://localhost:3000

## Add your model to the gallery

This is the part that needs no coding. Two steps.

**1. Put your file in `public/models/`**

Export from Tripo as **GLB**. Name it in lowercase with dashes, like
`vintage-camera.glb`. Follow the asset standards in the pipeline doc first
(ask in GroupMe for the link) so the page stays fast.

**2. Add a block to `data/gallery.json`**

Copy an existing block, change the values, and keep the commas correct:

```json
{
  "id": "vintage-camera",
  "title": "Vintage Camera",
  "creator": "Your Name",
  "caption": "One sentence about what you were going for.",
  "file": "/models/vintage-camera.glb",
  "date": "2026-10-15"
}
```

`id` must be unique. `file` always starts with `/models/`. Save, and the page
updates by itself.

## Project layout

```
app/
  page.tsx                   the gallery page
  components/
    ModelViewer.tsx          the 3D canvas, one model
    GalleryCard.tsx          viewer plus title, creator, caption
  api/tripo/
    generate/route.ts        submits a generation job, server side only
    task/[id]/route.ts       polls that job
data/
  gallery.json               THE file you edit to add work
public/models/               the .glb files themselves
```

## The API key

`TRIPO_API_KEY` lives in `.env.local`, which is gitignored and never committed.
Copy `.env.example` to `.env.local` and paste the key in. You only need this if
you are working on the generation routes; the gallery runs fine without it.

The key is read only inside `app/api/`, which runs on the server. It is never
sent to the browser. Do not move it into a component or rename it with a
`NEXT_PUBLIC_` prefix, because either one would publish it to every visitor.

## Contributing

Small changes can go straight to `main`. If you are changing how a component
works, open a branch and a pull request so someone else sees it first.
