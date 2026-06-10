import Header from "@/components/Header";
import BookingForm from "@/components/BookingForm";
import Faq from "@/components/Faq";
import { getDict, Lang, LANGS } from "@/lib/i18n/dictionaries";

export default function Page({ params }: { params: { lang: string } }) {
  const lang = (LANGS.includes(params.lang as Lang) ? params.lang : "fr") as Lang;
  const dict = getDict(lang);

  return (
    <>
      <Header dict={dict} lang={lang} />

      <main>
        {/* ============ HERO + BOOKING ============ */}
        <section id="booking" className="bg-noir pt-28 pb-16 sm:pt-32 sm:pb-24">
          <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-up">
              <p className="eyebrow mb-4">{dict.hero.eyebrow}</p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.1] text-ivory">
                {dict.hero.title}
              </h1>
              <span className="gold-rule my-6" />
              <p className="text-ivory/70 text-lg leading-relaxed max-w-md">{dict.hero.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#booking-form" className="btn-gold">
                  {dict.hero.cta}
                </a>
                <a href="tel:+32484164905" className="btn-outline">
                  +32 484 16 49 05
                </a>
              </div>
            </div>
            <div id="booking-form" className="fade-up-delay scroll-mt-24">
              <BookingForm dict={dict} lang={lang} />
            </div>
          </div>
        </section>

        {/* ============ SERVICES ============ */}
        <section id="services" className="py-16 sm:py-24 scroll-mt-16">
          <div className="mx-auto max-w-6xl px-4">
            <p className="eyebrow mb-3">{dict.services.eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl text-noir max-w-2xl">{dict.services.title}</h2>
            <span className="gold-rule my-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-noir/10 border border-noir/10 mt-8">
              {dict.services.items.map((s) => (
                <article key={s.name} className="bg-ivory p-6 sm:p-8 hover:bg-sand transition-colors">
                  <h3 className="font-display text-xl text-noir">{s.name}</h3>
                  <p className="mt-2 text-smoke text-sm leading-relaxed">{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ WHY US ============ */}
        <section id="why" className="bg-carbon py-16 sm:py-24 scroll-mt-16">
          <div className="mx-auto max-w-6xl px-4">
            <p className="eyebrow mb-3">{dict.why.eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl text-ivory max-w-2xl">{dict.why.title}</h2>
            <span className="gold-rule my-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-8">
              {dict.why.items.map((item) => (
                <div key={item.title} className="border-l border-gold/40 pl-6">
                  <h3 className="font-display text-xl text-gold">{item.title}</h3>
                  <p className="mt-2 text-ivory/70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ GALLERY ============ */}
        <section id="gallery" className="py-16 sm:py-24 scroll-mt-16">
          <div className="mx-auto max-w-6xl px-4">
            <p className="eyebrow mb-3">{dict.gallery.eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl text-noir">{dict.gallery.title}</h2>
            <span className="gold-rule my-6" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
              {/*
                Placeholder tiles — replace with real photos:
                drop images into /public/gallery/1.jpg … 6.jpg and swap each
                <div> below for <img src="/gallery/1.jpg" alt="..." loading="lazy" />
              */}
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  role="img"
                  aria-label={`Photo ${n}`}
                  className="aspect-square bg-gradient-to-br from-sand to-noir/20 border border-noir/10 flex items-center justify-center"
                >
                  <span className="font-display text-3xl text-noir/20">GL</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" className="py-16 sm:py-24 bg-sand scroll-mt-16">
          <div className="mx-auto max-w-3xl px-4">
            <p className="eyebrow mb-3">{dict.faq.eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl text-noir">{dict.faq.title}</h2>
            <span className="gold-rule my-6" />
            <Faq dict={dict} />
          </div>
        </section>

        {/* ============ FINAL CTA + FOOTER ============ */}
        <footer id="contact" className="bg-noir pt-16 sm:pt-24 pb-10">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl text-ivory">{dict.footer.ctaTitle}</h2>
              <p className="mt-4 text-ivory/70">{dict.footer.ctaText}</p>
              <a href="#booking-form" className="btn-gold mt-8">
                {dict.footer.cta}
              </a>
            </div>

            <div className="mt-16 pt-10 border-t border-gold/20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
              <div>
                <p className="font-display text-lg text-ivory mb-3">
                  GiGi <span className="text-gold">L</span> Coiffure
                </p>
                <address className="not-italic text-ivory/60 leading-relaxed">
                  {dict.footer.address}
                  <br />
                  <a href="tel:+32484164905" className="hover:text-gold transition-colors">
                    +32 484 16 49 05
                  </a>
                </address>
              </div>
              <div>
                <p className="text-gold uppercase tracking-eyebrow text-xs mb-3">{dict.footer.hours}</p>
                {dict.footer.hoursDetail.map((h) => (
                  <p key={h} className="text-ivory/60">
                    {h}
                  </p>
                ))}
              </div>
              <div>
                <p className="text-gold uppercase tracking-eyebrow text-xs mb-3">{dict.nav.contact}</p>
                <a
                  href="https://www.google.com/maps/place/Koninksemsteenweg+144,+3700+Tongeren"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/60 hover:text-gold transition-colors block"
                >
                  Google Maps →
                </a>
                <a
                  href="https://www.facebook.com/100093316226955"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/60 hover:text-gold transition-colors block mt-1"
                >
                  Facebook →
                </a>
              </div>
            </div>

            <p className="mt-10 text-center text-ivory/40 text-xs">
              © {new Date().getFullYear()} GiGi L Coiffure. {dict.footer.rights}
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
