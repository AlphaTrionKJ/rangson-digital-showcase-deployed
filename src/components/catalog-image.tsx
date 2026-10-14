import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import assets from '@/data/assets.json';

export type AssetKey = keyof typeof assets;

export function CatalogImage({ image, title, group, className = '', eager = false }: { image: AssetKey; title: string; group?: AssetKey[]; className?: string; eager?: boolean }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(image);
  const gallery = group ?? [image];
  const step = (direction: number) => {
    const next = gallery[(gallery.indexOf(current) + direction + gallery.length) % gallery.length];
    if (next) setCurrent(next);
  };
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" className={`catalog-image ${className}`} aria-label={`View ${title}`} onClick={() => setCurrent(image)}>
          <img src={assets[image]} alt={title} loading={eager ? 'eager' : 'lazy'} />
          <span className="expand-icon"><Expand size={17} /></span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="lightbox-overlay" />
        <Dialog.Content className="lightbox" aria-describedby={undefined} onKeyDown={(event) => { if (event.key === 'ArrowLeft') step(-1); if (event.key === 'ArrowRight') step(1); }}>
          <div className="lightbox-bar"><Dialog.Title>{title}</Dialog.Title><Dialog.Close asChild><Button variant="ghost" size="icon" aria-label="Close image"><X /></Button></Dialog.Close></div>
          <img src={assets[current]} alt={title} className="lightbox-image" />
          {gallery.length > 1 && <div className="lightbox-controls"><Button variant="outline" size="icon" aria-label="Previous image" onClick={() => step(-1)}><ArrowLeft /></Button><span>{gallery.indexOf(current) + 1} / {gallery.length}</span><Button variant="outline" size="icon" aria-label="Next image" onClick={() => step(1)}><ArrowRight /></Button></div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}