import { useEffect, useRef, useState } from 'react'

const WHATSAPP_NUMBER = '8613305631958'
const WHATSAPP_GREETING = 'Hello Wuyang Ge (Jessica)'
const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_GREETING)}`
const EMAIL = 'mailto:contact@nexofetch.com'

const proofItems = [
  'China-based sourcing team',
  'Mix categories in one order',
  'Logo printing and branding',
  'Quality inspection support',
  'Worldwide shipping',
]

const audiences = [
  'Online jewelry brands',
  'Boutique retailers',
  'Lifestyle brands',
  'Gift stores',
  'Shopify businesses',
  'Independent retailers',
  'Small wholesalers',
  'Businesses expanding their product range',
]

const pains = [
  "You're spending hours talking to suppliers.",
  'Factories stop replying.',
  'MOQ keeps changing.',
  'Prices are difficult to compare.',
  "You're unsure whether the quality will match the samples.",
  'Every supplier ships separately.',
  'Managing everything becomes another full-time job.',
]

const products = [
  {
    title: 'Jewelry',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    items: [
      'Earrings and necklaces',
      'Bracelets, rings, and stacks',
      'Charms and anklets',
      'Retail-ready gift sets',
    ],
  },
  {
    title: 'Hair Accessories',
    image: '/uploads/hero/hairclips.png',
    items: [
      'Claw clips and scrunchies',
      'Headbands and hair ties',
      'Pins, barrettes, and combs',
    ],
  },
  {
    title: 'Gift Packaging',
    image: '/uploads/hero/jewelry-packaging.png',
    items: [
      'Custom boxes and pouches',
      'Tissue, ribbons, and labels',
      'Branded bags for retail',
    ],
  },
  {
    title: 'Pet Accessories',
    image:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
    items: [
      'Collars, leashes, and bowls',
      'Toys, beds, and apparel',
      'Carriers and travel gear',
    ],
  },
  {
    title: 'Baby Products',
    image: '/uploads/hero/baby-silicone.png',
    items: [
      'Silicone feeding sets and bibs',
      'Teething toys and pacifier clips',
      'Blankets and nursery accessories',
    ],
  },
  {
    title: 'Lifestyle Accessories',
    image: '/uploads/products/keychain.png',
    items: [
      'Keychains and travel pouches',
      'Mirrors, phone accessories, organizers',
      'Seasonal and gift items',
    ],
  },
  {
    title: 'Plush Toys',
    image: '/uploads/products/plush-teddy.png',
    items: [
      'Character and mini plush',
      'Soft animals and pillows',
      'Branded mascots and gift sets',
    ],
  },
]

const includes = [
  'Supplier sourcing',
  'Factory evaluation',
  'Price comparison',
  'Negotiation',
  'Sampling support',
  'Production coordination',
  'Quality inspection options',
  'Packaging coordination',
  'Shipment support',
  'Dedicated communication',
]

const steps = [
  {
    title: 'Inquiry',
    text: 'Tell us what you need—a reference photo and your target quantity is enough to start.',
  },
  {
    title: 'Supplier Selection',
    text: 'We find manufacturers that fit your product, MOQ, and quality requirements.',
  },
  {
    title: 'Quotations',
    text: 'You get prices from shortlisted factories so you can compare and decide.',
  },
  {
    title: 'Samples',
    text: 'If you want to check quality first, we arrange samples before bulk production.',
  },
  {
    title: 'Bulk Order',
    text: 'Once you approve the sample, we place and manage your order.',
  },
  {
    title: 'Quality Inspection',
    text: 'We can coordinate inspection before goods leave the factory.',
  },
  {
    title: 'Consolidation',
    text: 'Ordering from several suppliers? We combine and pack everything to your requirements.',
  },
  {
    title: 'Shipping',
    text: 'We help get your order from China to your door.',
  },
]

const projects = [
  {
    title: 'Hair Accessories Collection',
    region: 'Europe',
    tags: ['Scrunchies and claw clips', 'Custom colours', 'Private label packaging'],
  },
  {
    title: 'Fashion Jewelry Collection',
    region: 'Europe',
    tags: ['Gold-plated jewelry', 'Custom gift boxes', 'Private label'],
  },
  {
    title: 'Baby Silicone Feeding Set',
    region: 'US',
    tags: ['Custom logo', 'Packaging', 'Quality inspection'],
  },
  {
    title: 'Pet Accessories',
    region: 'Australia',
    tags: ['Custom products', 'Packaging', 'Factory coordination'],
  },
]

const faqs = [
  {
    q: 'Can I buy multiple product categories?',
    a: 'Many of our clients do. We manage multiple suppliers in one project and can consolidate shipments so you are not juggling everything yourself.',
  },
  {
    q: 'Can you work with my existing supplier?',
    a: 'If you already work with a factory, we can step in for communication, production follow-up, quality checks, packaging, and shipping.',
  },
  {
    q: 'Can you develop custom products?',
    a: 'We help with custom development—tooling, materials, branding, and packaging—depending on what your product needs.',
  },
  {
    q: 'Can you support private label?',
    a: 'Logo printing, custom packaging, and private-label coordination are part of most projects we handle for growing brands.',
  },
  {
    q: 'Can you inspect products?',
    a: 'We can arrange quality inspection before goods leave China, so problems are caught early.',
  },
  {
    q: 'Can you arrange shipping?',
    a: 'We coordinate worldwide shipping and align packing, labelling, and consolidation with how you need goods delivered.',
  },
  {
    q: 'Can I start with smaller quantities?',
    a: 'MOQ depends on the factory and product, but we often help smaller businesses find a workable starting quantity and plan from there.',
  },
  {
    q: 'How are your service fees structured?',
    a: 'Our fees are based on order value—see the fee table below for full details. We explain the structure upfront before you commit.',
  },
]

const feeTiers = [
  { amount: 'Less than $1,000', charge: '$100' },
  { amount: '$1,001–$3,000', charge: '10%' },
  { amount: '$3,001–$6,000', charge: '9%' },
  { amount: '$6,001–$10,000', charge: '8%' },
  { amount: '$10,001–$15,000', charge: '7%' },
  { amount: '$15,001–$20,000', charge: '6.5%' },
  { amount: '$20,001 upwards', charge: '6%' },
]

const testimonials = [
  {
    quote:
      'I am an Amazon seller in Australia. I placed an order for mixed categories—my order contained a set of dog toys (3 different toys combined in one order), a yoga mat for kids, and a sushi making kit. The Nexofetch team sourced all the products from different suppliers, consolidated them into one shipment, labelled my products according to Amazon regulations, compared sea and air shipping prices for me, and finally suggested sea shipping would be more economical for my order. I loved the quality of the goods and the team’s amazing work and communication.',
    name: 'Emily Walsh',
    location: 'Sydney, Australia',
  },
  {
    quote:
      'We are an online jewelry store. We sell jewelry along with other accessories like plush toys, hair combs, and more. We have placed multiple orders with Nexofetch and always received premium-quality goods. They are very transparent in communication and tell us the jewelry base material honestly—which is not a common thing when sourcing from China. We are impressed with the quality of their work.',
    name: 'Zuzana Kováčová',
    location: 'Slovakia',
  },
  {
    quote:
      'I run my own brand for premium fashion jewelry in Hungary. I customize my orders every time, which means I manufacture my own designs. Nexofetch gives me very competitive manufacturing prices, and they pay attention to all the details. They also offer customized packaging solutions for my brand. I love working with them.',
    name: 'Kata Nagy',
    location: 'Hungary',
  },
  {
    quote:
      'I run an online brand for silicone tableware and feeding sets for babies. At first I was buying from Nexofetch in small quantities, as I had just started my business, and they were able to support me with low MOQs. Then I scaled my business and their team helped me put my branding on the baby products. They pay very detailed attention to colour schemes, designs, and product quality—something very important in this industry. I am very happy with Nexofetch’s sourcing approach.',
    name: 'Sophie Mitchell',
    location: 'Australia',
  },
]

const heroImages = [
  {
    src: '/uploads/hero/plush-teddy.png',
    alt: 'Cute teddy bear plush toy',
  },
  {
    src: '/hero/stainless-steel-jewelry.png',
    alt: 'Stainless steel jewelry',
  },
  {
    src: '/uploads/hero/jewelry-packaging.png',
    alt: 'Small jewelry boxes with logo printing',
  },
  {
    src: '/uploads/hero/baby-silicone.png',
    alt: 'Baby silicone feeding sets',
  },
  {
    src: '/uploads/hero/dog-toy.png',
    alt: 'Dog toys and pet accessories',
  },
  {
    src: '/uploads/hero/hairclips.png',
    alt: 'Hair clips and hair accessories',
  },
]

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

export default function App() {
  const [form, setForm] = useState({
    name: '',
    business: '',
    message: '',
  })

  function updateField(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleConsult(event) {
    event.preventDefault()
    const lines = [WHATSAPP_GREETING, '', 'I would like a free sourcing consultation.']
    if (form.name) lines.push(`Name: ${form.name}`)
    if (form.business) lines.push(`Business: ${form.business}`)
    if (form.message) lines.push(`Project: ${form.message}`)

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  const doubledProof = [...proofItems, ...proofItems]

  return (
    <div className="site">
      <header className="header">
        <div className="wrap header-inner">
          <a className="logo" href="#top" aria-label="Nexofetch home">
            <img className="logo-img" src="/nexofetch-logo.png" alt="Nexofetch" loading="eager" />
          </a>
          <a className="header-cta" href={WHATSAPP} target="_blank" rel="noreferrer">
            Talk on WhatsApp
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-content">
              <p className="hero-brand" aria-label="Nexofetch">
                <span className="hero-brand-nexo">Nexo</span>
                <span className="hero-brand-fetch">fetch</span>
              </p>
              <h1>Your Sourcing Partner in China for Growing European Brands</h1>
              <p className="hero-lead">
                Source premium quality fashion jewelry, jewelry packaging boxes, hair accessories,
                baby products, and plush toys from trusted manufacturers—without managing multiple
                supplier headaches.
              </p>
              <ul className="hero-checks">
                <li>
                  <CheckIcon /> Product sourcing
                </li>
                <li>
                  <CheckIcon /> Quality Inspection
                </li>
                <li>
                  <CheckIcon /> Mix different products in one shipment
                </li>
                <li>
                  <CheckIcon /> Shipment consolidation
                </li>
                <li>
                  <CheckIcon /> Logistics management
                </li>
                <li>
                  <CheckIcon /> Barcode and EAN code labelling
                </li>
              </ul>
              <div className="cta-row">
                <a className="btn btn-primary" href="#consult">
                  Get Free Sourcing Consultation
                </a>
                <a className="btn btn-outline" href={WHATSAPP} target="_blank" rel="noreferrer">
                  Talk on WhatsApp
                </a>
              </div>
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

        <div className="proof" aria-label="Nexofetch capabilities">
          <div className="proof-track">
            {doubledProof.map((item, index) => (
              <span className="proof-item" key={`${item}-${index}`}>
                <span className="dot" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <section className="section help" id="who-we-help">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">Who we help</span>
              <h2>Built for Small Businesses That Need a Reliable Partner in China</h2>
              <p>
                Not every business needs a purchasing office in China—but growing brands do need
                someone they can trust on the ground.
              </p>
            </Reveal>
            <Reveal>
              <p style={{ marginBottom: '1rem', fontWeight: 600 }}>We work with:</p>
              <ul className="audience-grid">
                {audiences.map((item) => (
                  <li className="audience-item" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="help-note">
                <strong>
                  Sourcing across multiple categories? We handle the coordination so you do not have
                  to. We do not charge anything extra for the number of different product categories
                  you have.
                </strong>
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section products" id="products">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">Products</span>
              <h2>What We Help Businesses Source</h2>
              <p>
                Jewelry, hair accessories, baby products, pet goods, and more—the categories our
                clients order most often.
              </p>
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

        <section className="section pain" id="problems">
          <div className="wrap pain-layout">
            <Reveal>
              <span className="eyebrow">Sourcing from China</span>
              <h2 style={{ fontSize: 'clamp(1.85rem, 3.8vw, 2.75rem)', marginBottom: '1.5rem' }}>
                Does This Sound Familiar?
              </h2>
              <ul className="pain-list">
                {pains.map((item, index) => (
                  <li key={item}>
                    <span className="pain-index">{String(index + 1).padStart(2, '0')}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="pain-aside">
              <h3>That is why businesses work with us.</h3>
              <p>
                We act as your local purchasing team in China—managing suppliers, production, and
                logistics while you focus on your brand.
              </p>
              <a className="btn btn-primary" href="#consult">
                Get Free Sourcing Consultation
              </a>
            </Reveal>
          </div>
        </section>

        <section className="section why" id="why-nexofetch">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">Why businesses choose us</span>
              <h2>Every Project Includes</h2>
              <p>From your first inquiry through production and delivery, here is what we take care of.</p>
            </Reveal>
            <Reveal className="why-grid">
              {includes.map((item) => (
                <div className="why-item" key={item}>
                  {item}
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="section process" id="process">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">Our process</span>
              <h2>From Inquiry to Delivery</h2>
              <p>Here is how a typical project works—step by step.</p>
            </Reveal>
            <Reveal className="timeline">
              {steps.map((step, index) => (
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

        <section className="section projects" id="projects">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">Recent projects</span>
              <h2>Recent Projects We&apos;ve Supported</h2>
              <p>A few examples of sourcing work we have done for clients in different markets.</p>
            </Reveal>
            <div className="project-grid">
              {projects.map((project) => (
                <Reveal className="project" key={project.title}>
                  <p className="project-region">{project.region}</p>
                  <h3>{project.title}</h3>
                  <ul>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section trust" id="trust">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">Why work with us</span>
              <h2>A Purchasing Partner You Can Rely On</h2>
              <p>What growing brands look for when they source from China.</p>
            </Reveal>
            <div className="trust-grid">
              <Reveal className="trust-item">
                <h3>We work on the ground in China</h3>
                <p>
                  Our team follows up with factories, verifies suppliers, and keeps production on
                  track—so you are not doing it from abroad.
                </p>
              </Reveal>
              <Reveal className="trust-item">
                <h3>One order, many categories</h3>
                <p>
                  Source jewelry, accessories, baby, pet, and lifestyle products together—and we
                  consolidate mixed orders when you need it.
                </p>
              </Reveal>
              <Reveal className="trust-item">
                <h3>You will always know where things stand</h3>
                <p>
                  Straightforward updates on quotes, samples, inspection, packaging, and
                  shipping—no chasing for answers.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">FAQ</span>
              <h2>Common Questions</h2>
              <p>What buyers usually want to know before getting started.</p>
            </Reveal>
            <Reveal className="faq-list">
              {faqs.map((item) => (
                <details className="faq-item" key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="section testimonials" id="testimonials">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">Testimonials</span>
              <h2>What Our Clients Say</h2>
              <p>Real feedback from brands and sellers who source with Nexofetch.</p>
            </Reveal>
            <div className="testimonial-grid">
              {testimonials.map((item) => (
                <Reveal className="testimonial-card" key={item.name}>
                  <p className="testimonial-quote">{item.quote}</p>
                  <div className="testimonial-author">
                    <strong>{item.name}</strong>
                    <span>{item.location}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section fees" id="fees">
          <div className="wrap fees-inner">
            <Reveal className="section-head fees-head">
              <span className="eyebrow">Pricing</span>
              <h2>Our Fee Structure</h2>
              <p>
                Our sourcing service fees include product sourcing across multiple categories, price
                negotiation, branding coordination, shipment consolidation and logistics
                management—so you know exactly what you are paying for.
              </p>
            </Reveal>
            <Reveal className="fees-table-wrap">
              <table className="fees-table">
                <thead>
                  <tr>
                    <th scope="col">Order Amount</th>
                    <th scope="col">Service Charge</th>
                  </tr>
                </thead>
                <tbody>
                  {feeTiers.map((tier) => (
                    <tr key={tier.amount}>
                      <td>{tier.amount}</td>
                      <td>{tier.charge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </section>

        <section className="section final" id="consult">
          <div className="wrap final-grid">
            <Reveal>
              <h2>Let&apos;s Make Sourcing From China Simpler</h2>
              <p>
                Whether you are launching a new collection, adding product lines, or looking for a
                reliable purchasing partner—we would like to hear about your project.
              </p>
              <p>
                Tell us what you need and we will recommend suitable manufacturers, walk you through
                the process, and provide clear quotations.
              </p>
              <div className="final-links">
                <a href={WHATSAPP} target="_blank" rel="noreferrer">
                  WhatsApp: +86 133 0563 1958
                </a>
                <a href={EMAIL}>Email: contact@nexofetch.com</a>
              </div>
            </Reveal>

            <Reveal>
              <form className="final-form" onSubmit={handleConsult}>
                <label>
                  Name
                  <input
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    placeholder="Your name"
                    required
                  />
                </label>
                <label>
                  Business
                  <input
                    name="business"
                    value={form.business}
                    onChange={updateField}
                    placeholder="Brand or company"
                  />
                </label>
                <label>
                  What are you looking to source?
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={updateField}
                    placeholder="Product type, quantity, destination market..."
                    required
                  />
                </label>
                <div className="final-actions">
                  <button className="btn btn-primary" type="submit">
                    Request a Free Consultation
                  </button>
                  <a className="btn btn-ghost" href={WHATSAPP} target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                  <a className="btn btn-outline" href={EMAIL} style={{ color: '#f4f7f8', borderColor: 'rgba(244,247,248,0.35)' }}>
                    Email
                  </a>
                </div>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <p>© {new Date().getFullYear()} Nexofetch. Your purchasing office in China.</p>
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
