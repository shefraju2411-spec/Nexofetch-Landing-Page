import { useEffect, useRef, useState } from 'react'

const WHATSAPP_NUMBER = '8613305631958'
const WHATSAPP_GREETING = 'Hello Wuyang Ge (Jessica)'
const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_GREETING)}`
const EMAIL = 'mailto:contact@nexofetch.com'
const PRIMARY_CTA = 'Get a Free Sourcing Consultation'

const audiences = [
  'Online & e-commerce brands',
  'Independent retailers',
  'Jewelry & accessories brands',
  'Lifestyle & gift stores',
  'Boutique retailers',
  'Amazon & marketplace sellers',
  'Small wholesalers',
  'Businesses expanding their product range',
]

const pains = [
  "You're spending hours contacting and following up with suppliers.",
  'Different factories have different MOQs, prices and payment terms.',
  'You cannot easily tell which supplier is actually reliable.',
  "Samples look good — but you're worried bulk production may be different.",
  'Every supplier has separate packaging, timelines and shipping arrangements.',
  'You want to add new products, but that means starting the supplier search again.',
  'You spend more time managing China sourcing than growing your business.',
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
  'Supplier & factory evaluation',
  'Quotation comparison',
  'Price & MOQ negotiation',
  'Sample coordination',
  'Branding & packaging coordination',
  'Production follow-up',
  'Quality inspection coordination',
  'Shipment consolidation',
  'Shipping & logistics support',
]

const steps = [
  {
    title: 'Send Your Requirements',
    text: 'Send us a product link, reference image or specification. Include your estimated quantity and destination market.',
  },
  {
    title: 'Supplier Sourcing',
    text: 'We identify suitable manufacturers based on product requirements, MOQ, quality expectations and target pricing.',
  },
  {
    title: 'Quotation & Comparison',
    text: 'We compare prices from different suppliers and quote the option that best fits your quality and needs.',
  },
  {
    title: 'Samples',
    text: 'When required, we arrange samples so you can evaluate the product, materials, finish, packaging and overall quality before bulk production.',
  },
  {
    title: 'Bulk Production',
    text: 'After approval, we coordinate the order with the selected supplier and follow production progress.',
  },
  {
    title: 'Quality Control',
    text: 'Inspection can be arranged before shipment to check the finished goods against agreed requirements.',
  },
  {
    title: 'Consolidation',
    text: 'Buying from multiple suppliers? Products can be collected and consolidated according to your shipping requirements.',
  },
  {
    title: 'Shipping',
    text: 'We coordinate suitable shipping options and help move the finished order from China to your destination.',
  },
]

const sourcingGallery = [
  {
    title: 'Custom Jewelry & Packaging',
    caption: 'Private-label jewelry and branded retail packaging',
  },
  {
    title: 'Baby Silicone Products',
    caption: 'Custom colours, branding and packaging',
  },
  {
    title: 'Hair & Lifestyle Accessories',
    caption: 'Products sourced for European online retailers',
  },
  {
    title: 'Pet Products',
    caption: 'Multi-product sourcing and supplier coordination',
  },
  {
    title: 'Custom Retail Packaging',
    caption: 'Branded boxes, pouches and retail packaging',
  },
  {
    title: 'Quality Inspection',
    caption: 'Finished goods checked before shipment',
  },
  {
    title: 'Shipment Consolidation',
    caption: 'Products from multiple suppliers prepared together',
  },
  {
    title: 'Export Cartons',
    caption: 'Finished orders packed and ready for shipment',
  },
  {
    title: 'Product Labelling',
    caption: 'Barcode, EAN and shipment labelling support',
  },
  {
    title: 'Mixed Product Sourcing',
    caption: 'Different product categories managed through one purchasing team',
  },
]

const faqs = [
  {
    q: 'Can I source multiple product categories in one project?',
    a: 'Yes. This is one of the main reasons businesses work with Nexofetch. We can coordinate different suppliers for different products and consolidate finished goods when required.',
  },
  {
    q: 'Can you work with suppliers I already use?',
    a: 'Yes. If you already have trusted suppliers, we can coordinate with them while sourcing additional products or suppliers for the rest of your order.',
  },
  {
    q: 'Can you develop custom products?',
    a: 'Yes. Depending on the product, we can coordinate custom colours, materials, dimensions, logos, packaging, mould development and OEM/ODM manufacturing.',
  },
  {
    q: 'Can you support private-label products?',
    a: 'Yes. We regularly coordinate logo printing, engraving, labels, retail packaging, custom boxes and other private-label requirements.',
  },
  {
    q: 'How do you check product quality?',
    a: 'Samples can be arranged before bulk production, and quality inspection can be coordinated before shipment. Inspection requirements depend on the product and order.',
  },
  {
    q: 'Can you consolidate products from different suppliers?',
    a: 'Yes. Goods from different suppliers can be collected and consolidated before international shipment, helping simplify multi-product orders.',
  },
  {
    q: 'Can you arrange international shipping?',
    a: 'Yes. We can coordinate shipping options based on your destination, shipment size, timeline and requirements.',
  },
  {
    q: 'Can I start with smaller quantities?',
    a: 'In many categories, yes. MOQ depends on the product, supplier and level of customisation. Tell us your target quantity and we will look for suitable options.',
  },
  {
    q: "How are Nexofetch's service fees charged?",
    a: 'Our sourcing fee is charged separately from the product cost and is based on the total purchase amount. The fee structure is shown below, so you know our service charge before placing an order.',
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
      'I ordered mixed categories—dog toys, a kids yoga mat and a sushi kit. Nexofetch sourced from different suppliers, consolidated into one shipment, handled Amazon labelling and compared sea vs air freight for me.',
    name: 'Emily Walsh',
    location: 'Sydney, Australia',
    type: 'Amazon seller',
  },
  {
    quote:
      'We have placed multiple orders and always received premium-quality goods. They are transparent about jewelry base materials—which is not common when sourcing from China.',
    name: 'Zuzana Kováčová',
    location: 'Slovakia',
    type: 'Online jewelry store',
  },
  {
    quote:
      'I manufacture my own jewelry designs. Nexofetch gives competitive manufacturing prices, pays attention to detail, and offers customized packaging for my brand.',
    name: 'Kata Nagy',
    location: 'Hungary',
    type: 'Fashion jewelry brand',
  },
  {
    quote:
      'They supported me with low MOQs when I started, then helped with branding on baby silicone products. Detailed attention to colours, design and quality.',
    name: 'Sophie Mitchell',
    location: 'Australia',
    type: 'Baby products brand',
  },
]

const heroChecks = [
  'Source multiple product categories',
  'Supplier sourcing & factory evaluation',
  'Custom branding & packaging',
  'Quality inspection before shipment',
  'Consolidate products from multiple suppliers',
  'Shipping & logistics coordination',
]

const valueProps = [
  {
    title: 'Multiple Categories',
    text: 'Source different products through one purchasing team.',
  },
  {
    title: 'One Consolidated Shipment',
    text: 'Combine goods from multiple suppliers before shipping.',
  },
  {
    title: 'One Point of Contact',
    text: 'One Nexofetch team coordinates suppliers, samples, production and logistics.',
  },
]

const trustBlocks = [
  {
    title: 'On-the-ground support in China',
    text: 'We communicate directly with suppliers, follow production and coordinate issues locally — giving overseas buyers a team closer to the factories.',
  },
  {
    title: 'Multiple categories, one partner',
    text: 'You do not need a different sourcing company for every product. We help clients source across jewelry, accessories, packaging, baby, pet and lifestyle categories.',
  },
  {
    title: 'Independent quality checks',
    text: 'We do not simply rely on the supplier saying the goods are ready. Quality inspection can be arranged before shipment so problems can be identified before products leave China.',
  },
  {
    title: 'Clear communication',
    text: 'You receive straightforward updates throughout quotations, sampling, production, inspection, consolidation and shipping.',
  },
]

const compareSelf = [
  'Finding suppliers individually',
  'Communicating with every factory',
  'Comparing quotations yourself',
  'Following different production schedules',
  'Coordinating packaging separately',
  'Checking quality remotely',
  'Arranging multiple shipments',
  'Resolving supplier issues from overseas',
]

const compareNexo = [
  'One sourcing contact in China',
  'Suppliers sourced and evaluated',
  'We compare prices and you receive the most competitive price',
  'Production followed locally',
  'Branding and packaging coordinated',
  'Quality inspection options',
  'Multiple orders consolidated',
  'Shipping and logistics coordinated',
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

export default function App() {
  const [form, setForm] = useState({
    name: '',
    business: '',
    email: '',
    whatsapp: '',
    country: '',
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
    if (form.business) lines.push(`Business / Brand: ${form.business}`)
    if (form.email) lines.push(`Email: ${form.email}`)
    if (form.whatsapp) lines.push(`WhatsApp: ${form.whatsapp}`)
    if (form.country) lines.push(`Destination Country: ${form.country}`)
    if (form.message) lines.push(`What I want to source: ${form.message}`)

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <div className="site">
      <header className="header">
        <div className="wrap header-inner">
          <a className="logo" href="#top" aria-label="Nexofetch home">
            <img className="logo-img" src="/nexofetch-logo.png" alt="Nexofetch" loading="eager" />
          </a>
          <div className="header-actions">
            <a className="header-cta" href={WHATSAPP} target="_blank" rel="noreferrer">
              Talk on WhatsApp
            </a>
            <a className="btn btn-primary header-btn" href="#consult">
              Get a Free Consultation
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-content">
              <p className="hero-eyebrow">
                Sourcing • Quality Control • Consolidation • Shipping
              </p>
              <h1>Your Purchasing Team in China</h1>
              <p className="hero-subhead">Source Multiple Products. Manage One Partner.</p>
              <p className="hero-lead">
                From jewelry and hair accessories to packaging, baby products, pet accessories and
                lifestyle goods — Nexofetch helps growing European brands source from China without
                managing multiple factories and suppliers themselves.
              </p>
              <ul className="hero-checks">
                {heroChecks.map((item) => (
                  <li key={item}>
                    <CheckIcon /> {item}
                  </li>
                ))}
              </ul>
              <div className="cta-row">
                <a className="btn btn-primary" href="#consult">
                  {PRIMARY_CTA}
                </a>
                <a className="btn btn-outline" href={WHATSAPP} target="_blank" rel="noreferrer">
                  Talk to Us on WhatsApp
                </a>
              </div>
              <p className="hero-qualify">
                For brands, retailers, e-commerce businesses and wholesalers sourcing commercially
                from China.
              </p>
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

        <section className="value-strip" aria-label="Key advantages">
          <div className="wrap value-grid">
            {valueProps.map((item, index) => (
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
              <span className="eyebrow">Who we work with</span>
              <h2>Built for Growing Brands That Source From China</h2>
              <p>
                You may not need your own purchasing office in China. But once you start working with
                multiple suppliers, product categories and repeat orders, managing everything from
                overseas becomes difficult.
              </p>
              <p style={{ marginTop: '0.75rem' }}>
                Nexofetch gives you one team on the ground to coordinate it.
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
              <div className="help-note">
                <strong>
                  Already sourcing one product from China but want to expand into more categories?
                </strong>
                <p>
                  You do not need to find and manage a new supplier every time. Tell us what you want
                  to add and our team can handle the sourcing and coordination.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section products" id="products">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">Products</span>
              <h2>Source Multiple Product Categories Through One Team</h2>
              <p>
                Build or expand your product range without managing a separate sourcing process for
                every category. We source across multiple consumer-product categories and can
                consolidate goods from different suppliers into one shipment.
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
              <span className="eyebrow">The challenge of sourcing from China</span>
              <h2 style={{ fontSize: 'clamp(1.85rem, 3.8vw, 2.75rem)', marginBottom: '1.5rem' }}>
                Does Managing Suppliers Feel Like Another Full-Time Job?
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
              <h3>This is where Nexofetch comes in.</h3>
              <p>
                We act as your purchasing team on the ground in China — coordinating suppliers,
                quotations, samples, production, quality control and logistics while you focus on
                selling and growing your brand.
              </p>
              <a className="btn btn-primary" href="#consult">
                Tell Us What You Need to Source
              </a>
            </Reveal>
          </div>
        </section>

        <section className="section why" id="why-nexofetch">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">What you receive</span>
              <h2>One Team Managing Your Sourcing From Start to Shipment</h2>
              <p>
                Instead of coordinating factories, packaging suppliers, inspectors and freight
                separately, Nexofetch manages the sourcing process through one point of contact.
              </p>
            </Reveal>
            <Reveal className="why-grid">
              {includes.map((item) => (
                <div className="why-item" key={item}>
                  {item}
                </div>
              ))}
            </Reveal>
            <Reveal className="why-note">
              <strong>Need several different products?</strong>
              <p>
                That is exactly where our model becomes most useful. We can source products from
                different suppliers, coordinate them separately and consolidate the finished goods
                before shipment.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section process" id="process">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">Our process</span>
              <h2>From Product Idea to Delivered Order</h2>
              <p>A clear path from your first brief through production and delivery.</p>
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
              <span className="eyebrow">Real sourcing work</span>
              <h2>Our Sourcing Gallery</h2>
              <p>
                A look at products, packaging and shipments we&apos;ve handled for clients sourcing
                from China.
              </p>
            </Reveal>
            <div className="gallery-grid">
              {sourcingGallery.map((item) => (
                <Reveal className="gallery-item" key={item.title}>
                  <div className="gallery-placeholder" role="img" aria-label={item.title}>
                    <span>{item.title}</span>
                  </div>
                  <p className="gallery-caption">{item.caption}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="projects-cta">
              <p>Real products. Real packaging. Real shipments handled by our team in China.</p>
              <p>Have Something Similar to Source?</p>
              <a className="btn btn-primary" href="#consult">
                Get a Free Sourcing Consultation
              </a>
            </Reveal>
          </div>
        </section>

        <section className="section trust" id="trust">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">Why work with us</span>
              <h2>Why Growing Brands Use Nexofetch as Their China Purchasing Team</h2>
            </Reveal>
            <div className="trust-grid trust-grid-4">
              {trustBlocks.map((item) => (
                <Reveal className="trust-item" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section compare" id="compare">
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">Why use a purchasing partner?</span>
              <h2>One Team Instead of Managing Every Supplier Yourself</h2>
            </Reveal>
            <Reveal className="compare-grid">
              <div className="compare-col compare-self">
                <h3>Sourcing Yourself</h3>
                <ul>
                  {compareSelf.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="compare-col compare-nexo">
                <h3>Working With Nexofetch</h3>
                <ul>
                  {compareNexo.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal className="compare-note">
              <p>You stay in control of purchasing decisions. We handle the coordination.</p>
            </Reveal>
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
              <p>Feedback from brands and sellers who source with Nexofetch.</p>
            </Reveal>
            <div className="testimonial-grid">
              {testimonials.map((item) => (
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

        <section className="section fees" id="fees">
          <div className="wrap fees-inner">
            <Reveal className="section-head fees-head">
              <span className="eyebrow">Pricing</span>
              <h2>Transparent Sourcing Fees</h2>
              <p>
                Our service fee is separate from the product price, so you can clearly see what you
                are paying for sourcing and project management.
              </p>
              <p style={{ marginTop: '0.75rem' }}>
                Your fee covers support such as supplier sourcing, quotation comparison,
                negotiation, branding coordination, production follow-up, consolidation and logistics
                coordination.
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
            <Reveal className="fees-notes">
              <p>
                <strong>
                  No additional sourcing fee for adding more product categories to the same project.
                </strong>
              </p>
              <p>
                You only pay our sourcing service fee when you proceed with a sample or bulk purchase.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section final" id="consult">
          <div className="wrap final-grid">
            <Reveal>
              <h2>Tell Us What You Want to Source</h2>
              <p>
                Whether you are adding a new product, sourcing an entire collection or buying from
                several suppliers, send us your requirements.
              </p>
              <p>
                A reference photo or product link, estimated quantity and destination country are
                enough to get started.
              </p>
              <ol className="final-steps">
                <li>Send your requirement</li>
                <li>We review the project</li>
                <li>We come back with the next sourcing steps</li>
              </ol>
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
                  Business / Brand
                  <input
                    name="business"
                    value={form.business}
                    onChange={updateField}
                    placeholder="Brand or company"
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    placeholder="you@company.com"
                    required
                  />
                </label>
                <label>
                  WhatsApp (optional)
                  <input
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={updateField}
                    placeholder="+ country code and number"
                  />
                </label>
                <label>
                  Destination Country
                  <input
                    name="country"
                    value={form.country}
                    onChange={updateField}
                    placeholder="e.g. Germany, Australia, UK"
                    required
                  />
                </label>
                <label>
                  What would you like to source?
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={updateField}
                    placeholder="Tell us the product, estimated quantity, customisation requirements and any target pricing you have."
                    required
                  />
                </label>
                <div className="final-actions">
                  <button className="btn btn-primary" type="submit">
                    Get My Sourcing Consultation
                  </button>
                  <a className="btn btn-ghost" href={WHATSAPP} target="_blank" rel="noreferrer">
                    Talk to Us on WhatsApp
                  </a>
                </div>
                <p className="final-disclaimer">
                  No obligation to place an order. We will first review your requirement and explain
                  how we can help.
                </p>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <div className="mobile-sticky" aria-label="Quick contact">
        <a className="btn btn-primary" href="#consult">
          Get a Free Consultation
        </a>
        <a className="btn btn-outline sticky-wa" href={WHATSAPP} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      </div>

      <footer className="footer">
        <div className="wrap footer-inner">
          <p>© {new Date().getFullYear()} Nexofetch. Your purchasing team in China.</p>
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
