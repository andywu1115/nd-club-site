import GalleryCard, { GalleryItem } from "./components/GalleryCard";
import gallery from "../data/gallery.json";

export default function Home() {
  const items = gallery.models as GalleryItem[];

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-neutral-50">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 flex flex-col gap-3">
          <p className="text-sm font-medium uppercase tracking-widest text-emerald-400">
            Notre Dame
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">AI 3D Club</h1>
          <p className="max-w-2xl text-lg text-neutral-400">
            A student group building 3D work with AI. Everything below was made
            by a member, most of them starting from zero.
          </p>
        </header>

        {items.length === 0 ? (
          <p className="text-neutral-500">No models yet.</p>
        ) : (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </section>
        )}

        <footer className="mt-16 border-t border-neutral-800 pt-6 text-sm text-neutral-500">
          Built with Tripo AI. Want to join? Find us on Instagram.
        </footer>
      </div>
    </main>
  );
}
