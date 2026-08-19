import { useEffect, useRef, useState } from 'react'
import LanguageSwitcher from './components/LanguageSwitcher.jsx'
import { galleryFolders, heroImages, productImages } from './content.js'
import { useLanguage } from './i18n/LanguageContext.jsx'

const WHATSAPP_NUMBER = '8613305631958'
const WHATSAPP_GREETING = 'Hello Wuyang Ge (Jessica)'
const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_GREETING)}`
const EMAIL = 'mailto:contact@nexofetch.com'
const CONTACT_EMAIL = 'contact@nexofetch.com'

function galleryImageCandidates(folder) {
  return [1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
    const slot = String(n).padStart(2, '0')
    return ['jpg', 'jpeg', 'png', 'webp'].map(
      (ext) => `/uploads/gallery/${folder}/${slot}.${ext}`,
    )
  })
}

function CheckIcon() {
  return (
    <span className="check" aria-hidden="true">
      <svg viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 6.2 4.8 8.5 9.5 3.5"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

function ValueIcon({ index }) {
  const paths = [
    <path key="a" d="M8 14h16v4H8zm0 8h10v4H8zm0 8h14v4H8z" />,
    <path key="b" d="M10 12h20v20H10zm4 4h12v4H14zm0 8h8v4h-8z" />,
    <circle key="c1" cx="20" cy="16" r="5" />,
    <path key="c2" d="M10 30c2-6 6-9 10-9s8 3 10 9" />,
  ]
  return (
    <svg className="value-icon" viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      {index === 0 && paths[0]}
      {index === 1 && paths[1]}
      {index === 2 && (
        <>
          {paths[2]}
          {paths[3]}
        </>
      )}
    </svg>
  )
}

function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return ref
}

function Reveal({ as: Tag = 'div', className = '', children }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  )
}

function MidCta({ label, text, variant = 'soft', href = '#consult', external = false }) {
  const { t } = useLanguage()
  return (
    <section className={`mid-cta mid-cta-${variant}`} aria-label={t.aria.cta}>
      <div className="wrap mid-cta-inner">
        <p>{text}</p>
        <a
          className="btn btn-primary"
          href={href}
          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        >
          {label}
        </a>
      </div>
    </section>
  )
}

function GallerySlideshow({ title, folder, stagger = 0 }) {
  const [loaded, setLoaded] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let cancelled = false
    const slots = galleryImageCandidates(folder)

    Promise.all(
      slots.map(
        (candidates) =>
          new Promise((resolve) => {
            let i = 0
            const tryNext = () => {
              if (i >= candidates.length) {
                resolve(null)
                return
              }
              const src = candidates[i]
              i += 1
              const img = new Image()
              img.onload = () => resolve(src)
              img.onerror = tryNext
              img.src = src
            }
            tryNext()
          }),
      ),
    ).then((results) => {
      if (!cancelled) setLoaded(results.filter(Boolean))
    })

    return () => {
      cancelled = true
    }
  }, [folder])

  useEffect(() => {
    if (loaded.length < 2) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const startDelay = stagger * 400
    let intervalId
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setIndex((prev) => (prev + 1) % loaded.length)
      }, 3500)
    }, startDelay)

    return () => {
      window.clearTimeout(timeoutId)
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [loaded.length, stagger])

  if (loaded.length === 0) {
    return (
      <div className="gallery-placeholder" role="img" aria-label={title}>
        <span>{title}</span>
      </div>
    )
  }

  return (
    <div className="gallery-slideshow" role="img" aria-label={title}>
      {loaded.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={i === index % loaded.length ? 'is-active' : ''}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}
      {loaded.length > 1 && (
        <div className="gallery-dots" aria-hidden="true">
          {loaded.map((src, i) => (
            <span key={src} className={i === index % loaded.length ? 'is-active' : ''} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function App() {
  const { t } = useLanguage()
  const [form, setForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    country: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState('idle')
  const [showThankYou, setShowThankYou] = useState(false)

  function updateField(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleConsult(event) {
    event.preventDefault()
    setFormStatus('sending')

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: 'New sourcing enquiry — Nexofetch landing page',
          _template: 'table',
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp,
          country: form.country,
          message: form.message,
        }),
      })

      if (!response.ok) throw new Error('Failed to send enquiry')

      setFormStatus('idle')
      setForm({
        name: '',
        email: '',
        whatsapp: '',
        country: '',
        message: '',
      })
      setShowThankYou(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setFormStatus('error')
    }
  }

  if (showThankYou) {
    return (
      <div className="site thank-you-page">
        <header className="header thank-you-header">
          <div className="wrap header-inner">
            <a
              className="logo"
              href="#top"
              onClick={() => setShowThankYou(false)}
              aria-label={t.aria.home}
            >
              <img className="logo-img" src="/nexofetch-logo.png" alt="Nexofetch" loading="eager" />
            </a>
            <LanguageSwitcher />
          </div>
        </header>
        <main className="thank-you">
          <div className="wrap thank-you-inner">
            <p className="eyebrow">{t.thankYou.eyebrow}</p>
            <h1>{t.thankYou.title}</h1>
            <p>{t.thankYou.text}</p>
            <div className="cta-row thank-you-actions">
              <a className="btn btn-primary" href={WHATSAPP} target="_blank" rel="noreferrer">
                {t.thankYou.whatsapp}
              </a>
              <button className="btn btn-outline" type="button" onClick={() => setShowThankYou(false)}>
                {t.thankYou.back}
              </button>
            </div>
          </div>
        </main>
        <footer className="footer">
          <div className="wrap footer-inner">
            <p>
              © {new Date().getFullYear()} Nexofetch. {t.footer.tagline}
            </p>
            <p>
              <a href="https://nexofetch.com/" target="_blank" rel="noreferrer">
                nexofetch.com
              </a>
            </p>
          </div>
        </footer>
      </div>
    )
  }

  const products = t.products.items.map((product, index) => ({
    ...product,
    image: productImages[index],
  }))

  const sourcingGallery = t.gallery.items.map((item, index) => ({
    ...item,
    folder: galleryFolders[index],
  }))

  return (
    <div className="site">
      <header className="header">
        <div className="wrap header-inner">
          <a className="logo" href="#top" aria-label={t.aria.home}>
            <img className="logo-img" src="/nexofetch-logo.png" alt="Nexofetch" loading="eager" />
          </a>
          <div className="header-actions">
            <LanguageSwitcher />
            <a className="header-link" href={WHATSAPP} target="_blank" rel="noreferrer">
              {t.header.whatsapp}
            </a>
            <span className="header-email">{t.header.email}</span>
            <a className="btn btn-primary header-btn" href="#consult">
              {t.header.cta}
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-content">
              <p className="hero-eyebrow">{t.hero.eyebrow}</p>
              <h1>{t.hero.title}</h1>
              <p className="hero-subhead">{t.hero.subhead}</p>
              <p className="hero-lead">{t.hero.lead}</p>
              <ul className="hero-checks">
                {t.hero.checks.map((item) => (
                  <li key={item}>
                    <CheckIcon /> {item}
                  </li>
                ))}
              </ul>
              <div className="cta-row">
                <a className="btn btn-primary" href="#consult">
                  {t.hero.ctaPrimary}
                </a>
                <a className="btn btn-outline" href={WHATSAPP} target="_blank" rel="noreferrer">
                  {t.hero.ctaWhatsapp}
                </a>
              </div>
              <p className="hero-qualify">{t.hero.qualify}</p>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="hero-mosaic">
                {heroImages.map((image) => (
                  <div className="hero-mosaic-item" key={image.alt}>
                    <img src={image.src} alt="" loading="eager" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="value-strip" aria-label={t.aria.keyAdvantages}>
          <div className="wrap value-grid">
            {t.valueStrip.map((item, index) => (
              <div className="value-item" key={item.title}>
                <ValueIcon index={index} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section help" id="who-we-help">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">{t.whoWeHelp.eyebrow}</span>
              <h2>{t.whoWeHelp.title}</h2>
              <p>{t.whoWeHelp.p1}</p>
              <p style={{ marginTop: '0.75rem' }}>{t.whoWeHelp.p2}</p>
            </Reveal>
            <Reveal>
              <p style={{ marginBottom: '1rem', fontWeight: 600 }}>{t.whoWeHelp.weWorkWith}</p>
              <ul className="audience-grid">
                {t.whoWeHelp.audiences.map((item) => (
                  <li className="audience-item" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="help-note">
                <strong>{t.whoWeHelp.noteTitle}</strong>
                <p>{t.whoWeHelp.noteText}</p>
              </div>
            </Reveal>
          </div>
        </section>

        <MidCta
          variant="soft"
          label={t.midCta.consult1.label}
          text={t.midCta.consult1.text}
        />

        <section className="section products" id="products">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">{t.products.eyebrow}</span>
              <h2>{t.products.title}</h2>
              <p>{t.products.desc}</p>
            </Reveal>
            <div className="product-grid">
              {products.map((product) => (
                <Reveal className="product-card" key={product.title}>
                  <div className="product-card-image">
                    <img src={product.image} alt={product.title} loading="lazy" />
                  </div>
                  <div className="product-card-body">
                    <h3>{product.title}</h3>
                    <ul>
                      {product.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <MidCta
          variant="dark"
          label={t.midCta.expert1.label}
          text={t.midCta.expert1.text}
          href={WHATSAPP}
          external
        />

        <section className="section pain" id="problems">
          <div className="wrap pain-layout">
            <Reveal>
              <span className="eyebrow">{t.pain.eyebrow}</span>
              <h2 style={{ fontSize: 'clamp(1.85rem, 3.8vw, 2.75rem)', marginBottom: '1.5rem' }}>
                {t.pain.title}
              </h2>
              <ul className="pain-list">
                {t.pain.pains.map((item, index) => (
                  <li key={item}>
                    <span className="pain-index">{String(index + 1).padStart(2, '0')}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="pain-aside">
              <h3>{t.pain.asideTitle}</h3>
              <p>{t.pain.asideText}</p>
              <a className="btn btn-primary" href="#consult">
                {t.pain.cta}
              </a>
            </Reveal>
          </div>
        </section>

        <section className="section why" id="why-nexofetch">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">{t.why.eyebrow}</span>
              <h2>{t.why.title}</h2>
              <p>{t.why.desc}</p>
            </Reveal>
            <Reveal className="why-grid">
              {t.why.includes.map((item) => (
                <div className="why-item" key={item}>
                  {item}
                </div>
              ))}
            </Reveal>
            <Reveal className="why-note">
              <strong>{t.why.noteTitle}</strong>
              <p>{t.why.noteText}</p>
            </Reveal>
          </div>
        </section>

        <MidCta
          variant="soft"
          label={t.midCta.verify.label}
          text={t.midCta.verify.text}
        />

        <section className="section process" id="process">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">{t.process.eyebrow}</span>
              <h2>{t.process.title}</h2>
              <p>{t.process.desc}</p>
            </Reveal>
            <Reveal className="timeline">
              {t.process.steps.map((step, index) => (
                <div className="step" key={step.title}>
                  <div className="step-marker">{index + 1}</div>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <MidCta
          variant="dark"
          label={t.midCta.start1.label}
          text={t.midCta.start1.text}
        />

        <section className="section projects" id="projects">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">{t.gallery.eyebrow}</span>
              <h2>{t.gallery.title}</h2>
              <p>{t.gallery.desc}</p>
            </Reveal>
            <div className="gallery-grid">
              {sourcingGallery.map((item, galleryIndex) => (
                <Reveal className="gallery-item" key={item.title}>
                  <GallerySlideshow
                    title={item.title}
                    folder={item.folder}
                    stagger={galleryIndex}
                  />
                  <p className="gallery-caption">{item.caption}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="projects-cta">
              <p>{t.gallery.trustLine}</p>
              <p>{t.gallery.ctaLine}</p>
              <a className="btn btn-primary" href="#consult">
                {t.gallery.ctaButton}
              </a>
            </Reveal>
          </div>
        </section>

        <section className="section trust" id="trust">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">{t.trust.eyebrow}</span>
              <h2>{t.trust.title}</h2>
            </Reveal>
            <div className="trust-grid">
              {t.trust.blocks.map((item) => (
                <Reveal className="trust-item" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section europe" id="european-importers">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">{t.europe.eyebrow}</span>
              <h2>{t.europe.title}</h2>
            </Reveal>
            <div className="europe-grid">
              {t.europe.cards.map((item) => (
                <Reveal className="europe-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="europe-note">
              <p>{t.europe.note}</p>
            </Reveal>
          </div>
        </section>

        <MidCta
          variant="dark"
          label={t.midCta.pricing.label}
          text={t.midCta.pricing.text}
        />

        <section className="section compliance" id="compliance">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">{t.compliance.eyebrow}</span>
              <h2>{t.compliance.title}</h2>
            </Reveal>
            <Reveal className="compliance-grid">
              {t.compliance.items.map((item) => (
                <div className="compliance-item" key={item}>
                  {item}
                </div>
              ))}
            </Reveal>
            <Reveal className="compliance-disclaimer">
              <p>{t.compliance.disclaimer}</p>
            </Reveal>
          </div>
        </section>

        <section className="section compare" id="compare">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">{t.compare.eyebrow}</span>
              <h2>{t.compare.title}</h2>
            </Reveal>
            <Reveal className="compare-grid">
              <div className="compare-col compare-self">
                <h3>{t.compare.selfTitle}</h3>
                <ul>
                  {t.compare.self.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="compare-col compare-nexo">
                <h3>{t.compare.nexoTitle}</h3>
                <ul>
                  {t.compare.nexo.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal className="compare-note">
              <p>{t.compare.note}</p>
            </Reveal>
          </div>
        </section>

        <MidCta
          variant="soft"
          label={t.midCta.start2.label}
          text={t.midCta.start2.text}
        />

        <section className="section faq" id="faq">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">{t.faq.eyebrow}</span>
              <h2>{t.faq.title}</h2>
              <p>{t.faq.desc}</p>
            </Reveal>
            <Reveal className="faq-list">
              {t.faq.items.map((item) => (
                <details className="faq-item" key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        <MidCta
          variant="dark"
          label={t.midCta.consult2.label}
          text={t.midCta.consult2.text}
        />

        <section className="section testimonials" id="testimonials">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">{t.testimonials.eyebrow}</span>
              <h2>{t.testimonials.title}</h2>
              <p>{t.testimonials.desc}</p>
            </Reveal>
            <div className="testimonial-grid">
              {t.testimonials.items.map((item) => (
                <Reveal className="testimonial-card" key={item.name}>
                  <p className="testimonial-quote">{item.quote}</p>
                  <div className="testimonial-author">
                    <strong>{item.name}</strong>
                    <span>{item.location}</span>
                    <span className="testimonial-type">{item.type}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <MidCta
          variant="light"
          label={t.midCta.expert2.label}
          text={t.midCta.expert2.text}
          href={WHATSAPP}
          external
        />

        <section className="section fees" id="fees">
          <div className="wrap fees-inner">
            <Reveal className="section-head fees-head">
              <span className="eyebrow">{t.fees.eyebrow}</span>
              <h2>{t.fees.title}</h2>
              <p>{t.fees.p1}</p>
              <p style={{ marginTop: '0.75rem' }}>{t.fees.p2}</p>
            </Reveal>
            <Reveal className="fees-table-wrap">
              <table className="fees-table">
                <thead>
                  <tr>
                    <th scope="col">{t.fees.orderAmount}</th>
                    <th scope="col">{t.fees.serviceCharge}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.fees.tiers.map((tier) => (
                    <tr key={tier.amount}>
                      <td>{tier.amount}</td>
                      <td>{tier.charge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
            <Reveal className="fees-notes">
              <p>
                <strong>{t.fees.note1}</strong>
              </p>
              <p>{t.fees.note2}</p>
            </Reveal>
          </div>
        </section>

        <section className="section final" id="consult">
          <div className="wrap final-grid">
            <Reveal>
              <h2>{t.form.title}</h2>
              <p>{t.form.p1}</p>
              <p>{t.form.p2}</p>
              <ol className="final-steps">
                {t.form.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <div className="final-links">
                <a href={WHATSAPP} target="_blank" rel="noreferrer">
                  {t.form.whatsappLink}
                </a>
                <a href={EMAIL}>{t.form.emailLink}</a>
              </div>
            </Reveal>

            <Reveal>
              <form className="final-form" onSubmit={handleConsult}>
                <label>
                  {t.form.name}
                  <input
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    placeholder={t.form.namePh}
                    required
                  />
                </label>
                <label>
                  {t.form.email}
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    placeholder={t.form.emailPh}
                    required
                  />
                </label>
                <label>
                  {t.form.whatsapp}
                  <input
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={updateField}
                    placeholder={t.form.whatsappPh}
                    required
                  />
                </label>
                <label>
                  {t.form.country}
                  <input
                    name="country"
                    value={form.country}
                    onChange={updateField}
                    placeholder={t.form.countryPh}
                    required
                  />
                </label>
                <label>
                  {t.form.message}
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={updateField}
                    placeholder={t.form.messagePh}
                    required
                  />
                </label>
                <div className="final-actions">
                  <button className="btn btn-primary" type="submit" disabled={formStatus === 'sending'}>
                    {formStatus === 'sending' ? t.form.sending : t.form.submit}
                  </button>
                  <a className="btn btn-ghost" href={WHATSAPP} target="_blank" rel="noreferrer">
                    {t.hero.ctaWhatsapp}
                  </a>
                </div>
                {formStatus === 'error' && (
                  <p className="final-form-status is-error">
                    {t.form.error}{' '}
                    <a href={EMAIL}>{CONTACT_EMAIL}</a>
                  </p>
                )}
                <p className="final-disclaimer">{t.form.disclaimer}</p>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <div className="mobile-sticky" aria-label={t.aria.quickContact}>
        <a className="btn btn-primary" href="#consult">
          {t.mobileSticky.consult}
        </a>
        <a className="btn btn-outline sticky-wa" href={WHATSAPP} target="_blank" rel="noreferrer">
          {t.mobileSticky.whatsapp}
        </a>
      </div>

      <footer className="footer">
        <div className="wrap footer-inner">
          <p>
            © {new Date().getFullYear()} Nexofetch. {t.footer.tagline}
          </p>
          <p>
            <a href="https://nexofetch.com/" target="_blank" rel="noreferrer">
              nexofetch.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
