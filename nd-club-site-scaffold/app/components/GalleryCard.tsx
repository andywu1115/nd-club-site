import ModelViewer from "./ModelViewer";

export type GalleryItem = {
  id: string;
  title: string;
  creator: string;
  caption: string;
  file: string;
  date: string;
};

export default function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
      <ModelViewer url={item.file} />
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-neutral-50">{item.title}</h3>
        <p className="text-sm text-neutral-400">by {item.creator}</p>
        <p className="text-sm leading-relaxed text-neutral-300">
          {item.caption}
        </p>
      </div>
    </article>
  );
}
