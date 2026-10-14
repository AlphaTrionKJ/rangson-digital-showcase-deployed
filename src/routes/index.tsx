import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpRight, Globe, Mail, Menu, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CatalogImage, type AssetKey } from '@/components/catalog-image';
import assets from '@/data/assets.json';
import catalog from '@/data/catalog.json';

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'RANGSON INDUSTRIES — Food Processing Machinery' },
    { name: 'description', content: 'RANGSON INDUSTRIES has over 50 years of generational expertise in machine manufacturing.' },
    { property: 'og:title', content: 'RANGSON INDUSTRIES — Food Processing Machinery' },
    { property: 'og:description', content: 'Explore the original RANGSON INDUSTRIES food processing machinery catalog.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

const website = 'www.rangsonindustries.com';
const email = 'rangsonindustries@gmail.com';
const navigation = [{ label: 'About Us', href: '#about' }, { label: 'Products', href: '#products' }, { label: 'Contact Us', href: '#contact' }];
type Product = typeof catalog.products[number];

function PageFoot({ page }: { page: number }) {
  return <div className="page-foot"><span>{page === 3 || page === 5 ? 'RANGSON INDUSTIRES' : 'RANGSON INDUSTRIES'}</span><a href={`https://${website}`} target="_blank" rel="noreferrer">{website}<ArrowUpRight size={13} /></a></div>;
}

function ProductCopy({ product }: { product: Product }) {
  return <div className="product-copy">{product.label && <h3>{product.label}</h3>}<p>{product.description}</p></div>;
}

function ProductSection({ product, index }: { product: Product; index: number }) {
  const group = product.images as AssetKey[];
  return <section className={`product-section layout-${product.kind} reveal`} id={product.id} aria-labelledby={`${product.id}-title`}>
    <div className="section-heading"><span className="section-number">{String(index + 1).padStart(2, '0')}</span><h2 id={`${product.id}-title`}>{product.title}</h2><ArrowDown className="section-arrow" size={23} /></div>
    <div className="product-content">
      <ProductCopy product={product} />
      <div className="product-gallery">
        {group.map((image, i) => <figure key={image} className={`gallery-item item-${i}`}>
          {product.kind === 'packing' && <figcaption>{i === 0 ? 'SEMI- AUTOMACTIC' : 'AUTOMACTIC'}</figcaption>}
          <CatalogImage image={image} title={product.title} group={group} />
        </figure>)}
      </div>
    </div>
    {product.id !== 'individual-quick-freezer' && <PageFoot page={product.page} />}
  </section>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('about');
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty('--scroll-progress', `${total > 0 ? window.scrollY / total * 100 : 0}%`);
      const contact = document.getElementById('contact');
      const products = document.getElementById('products');
      setActive(contact && contact.getBoundingClientRect().top < 250 ? 'contact' : products && products.getBoundingClientRect().top < 250 ? 'products' : 'about');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    }), { threshold: 0.06 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);
  const [firstAbout, secondAbout] = catalog.about.split('At the core');
  return (
    <div id="top">
      <a className="skip-link" href="#about">About Us</a>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner">
          <a href="#top" aria-label="RANGSON INDUSTRIES home" className="brand"><img src={assets.logo} alt="RANGSON INDUSTRIES" /></a>
          <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(link => <a className={active === link.href.slice(1) ? 'active' : ''} key={link.href} href={link.href}>{link.label}</a>)}</nav>
          <a className="header-contact" href="tel:+918652177888"><Phone size={14} /><span>+91 8652177888</span><ArrowUpRight size={15} /></a>
          <Button variant="ghost" size="icon" className="mobile-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{navigation.map(link => <a href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>{link.label}<ArrowUpRight size={20} /></a>)}</nav>}
      </header>
      <main>
        <section id="about" className="about-section container-wide">
          <div className="opening-title"><h1>RANGSON <span>INDUSTRIES</span></h1><a href="#products" aria-label="View products" className="round-arrow"><ArrowDown size={25} /></a></div>
          <div className="about-grid">
            <figure className="ceo-figure"><CatalogImage image="ceo" title="KARTIK  JOSHI (CEO)" eager /><figcaption><span>KARTIK&nbsp; JOSHI (CEO)</span><span className="caption-line" /></figcaption></figure>
            <div className="about-copy"><div className="eyebrow"><span className="small-square" />ABOUT US</div><p>{firstAbout}</p><p>At the core{secondAbout}</p><a className="text-link" href="#products">Products<ArrowDown size={17} /></a></div>
          </div>
          <div className="about-contact"><a href={`mailto:${email}`}><Mail size={15} />{email}</a><a href="tel:8652177888"><Phone size={15} />contact- 8652177888</a><a href={`https://${website}`} target="_blank" rel="noreferrer"><Globe size={15} />{website}<ArrowUpRight size={14} /></a></div>
        </section>
        <section id="products" className="products-intro container-wide reveal"><div className="eyebrow"><span className="small-square" />RANGSON INDUSTRIES</div><div className="products-title"><h2>Products</h2><ArrowDown size={34} /></div><nav className="product-index" aria-label="Product catalog">{catalog.products.map((product, index) => <a href={`#${product.id}`} key={product.id}><span>{String(index + 1).padStart(2, '0')}</span>{product.title}<ArrowUpRight size={14} /></a>)}</nav></section>
        <div className="container-wide"><div className="first-products">{catalog.products.slice(0, 3).map((product, index) => <article className="first-product reveal" id={product.id} key={product.id}><div className="mini-heading"><span className="section-number">{String(index + 1).padStart(2, '0')}</span><ArrowUpRight size={18} /></div><h2>{product.title}</h2><CatalogImage image={product.images[0] as AssetKey} title={product.title} /><ProductCopy product={product} /></article>)}</div><PageFoot page={2} />{catalog.products.slice(3).map((product, index) => <ProductSection product={product} index={index + 3} key={product.id} />)}</div>
        <section id="contact" className="contact-section"><div className="container-wide"><div className="contact-heading reveal"><h2>Contact Us</h2><ArrowUpRight size={64} /></div><div className="contact-grid reveal"><p>{catalog.contact}</p><dl><div><dt>E-mail</dt><dd><a href={`mailto:${email}`}>{email}<ArrowUpRight size={17} /></a></dd></div><div><dt>Website</dt><dd><a href={`https://${website}`} target="_blank" rel="noreferrer">{website}<ArrowUpRight size={17} /></a></dd></div><div><dt>Phone</dt><dd><a href="tel:+918652177888">+91 8652177888<ArrowUpRight size={17} /></a></dd></div><div><dt>Address</dt><dd>216, Ghanshyam Tower, Borivali (east),<br />Mumbai-400066</dd></div></dl></div><footer><img src={assets.logo} alt="RANGSON INDUSTRIES" /><span>RANGSON INDUSTRIES</span><Button variant="ghost" size="icon" asChild><a href="#top" aria-label="Back to top"><ArrowUp /></a></Button></footer></div></section>
      </main>
    </div>
  );
}
