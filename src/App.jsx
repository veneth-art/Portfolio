import { useState, useEffect, useRef } from 'react'
import { FiMail, FiExternalLink, FiLinkedin, FiInstagram, FiDribbble, FiSun, FiMoon, FiMapPin } from 'react-icons/fi'
import { useTheme } from './context/ThemeContext'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagicBento from './components/MagicBento'
import ScrollStack from './components/ScrollStack'
import profileImg from './assets/veneth.jpg'
import aboutImg from './assets/veneth-about.jpg'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const { theme, toggleTheme } = useTheme()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')
  
  const tiltElementsRef = useRef([])
  const parallaxElementsRef = useRef([])
  const rafIdRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }
    rafIdRef.current = requestAnimationFrame(raf)

    const reveals = document.querySelectorAll('.reveal')
    tiltElementsRef.current = document.querySelectorAll('[data-3d-tilt]')
    parallaxElementsRef.current = document.querySelectorAll('.parallax-element')

    const handleScroll = () => {
      reveals.forEach(el => {
        const windowHeight = window.innerHeight
        const elementTop = el.getBoundingClientRect().top
        if (elementTop < windowHeight - 100) {
          el.classList.add('active')
        }
      })

      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setScrollProgress(scrollPercent)

      parallaxElementsRef.current.forEach(el => {
        const speed = parseFloat(el.dataset.parallaxSpeed) || 0.5
        const rect = el.getBoundingClientRect()
        const scrolled = window.innerHeight - rect.top
        const yPos = scrolled * speed * 0.1
        el.style.transform = `translateY(${yPos}px)`
      })
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    let tiltFrameId = null
    const handleTiltUpdate = (e) => {
      if (tiltFrameId) return
      tiltFrameId = requestAnimationFrame(() => {
        tiltFrameId = null
        tiltElementsRef.current.forEach(el => {
          const rect = el.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const rotateX = ((e.clientY - centerY) / 25).toFixed(2)
          const rotateY = ((centerX - e.clientX) / 25).toFixed(2)
          el.style.setProperty('--rotateX', `${rotateX}deg`)
          el.style.setProperty('--rotateY', `${rotateY}deg`)
        })
      })
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const isHoverable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[data-3d-tilt]') ||
        target.classList.contains('social-link') ||
        target.classList.contains('nav-contact') ||
        target.classList.contains('cursor-hover')
      
      setCursorVariant(isHoverable ? 'hover' : 'default')
    }

    const handleMouseDown = () => setCursorVariant('click')
    const handleMouseUp = () => setCursorVariant('default')

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousemove', handleTiltUpdate, { passive: true })
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    handleScroll()
    
    return () => {
      lenis.destroy()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousemove', handleTiltUpdate)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      if (tiltFrameId) cancelAnimationFrame(tiltFrameId)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services-title', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services',
          start: 'top 80%',
        }
      })

      gsap.from('.section-label', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.services',
          start: 'top 80%',
        }
      })

      gsap.from('.magic-bento-card', {
        y: 80,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 80%',
        }
      })

      gsap.from('.projects-header', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 80%',
        }
      })

      gsap.from('.about-content-wrapper', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 80%',
        }
      })

      gsap.from('.contact-content', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 80%',
        }
      })
    })

    return () => ctx.revert()
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('idle')

  const projects = [
    {
      id: 1,
      number: '01',
      category: 'Web Design',
      title: 'E-Commerce Redesign',
      description: 'Modern shopping experience with focus on conversion. Built with attention to user journey optimization and seamless checkout flow.',
      tags: ['Figma', 'Webflow', 'UX Research'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      color: '#FF6B6B'
    },
    {
      id: 2,
      number: '02',
      category: 'Mobile App',
      title: 'Banking App',
      description: 'Intuitive mobile banking experience with focus on security and simplicity. Clean interface for complex financial operations.',
      tags: ['Figma', 'Prototyping', 'UI Design'],
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
      color: '#00ff88'
    },
    {
      id: 3,
      number: '03',
      category: 'Dashboard',
      title: 'Analytics SaaS',
      description: 'Data visualization dashboard with real-time metrics. Transform complex data into actionable insights.',
      tags: ['Dashboard', 'Data Viz', 'Framer'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      color: '#FFD93D'
    },
    {
      id: 4,
      number: '04',
      category: 'Branding',
      title: 'Restaurant Brand',
      description: 'Complete brand identity system including logo, typography, color palette, and brand guidelines.',
      tags: ['Branding', 'Logo Design', 'Guidelines'],
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      color: '#FF61F6'
    }
  ]

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('submitting')
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setFormStatus('success')
      setTimeout(() => setFormStatus('idle'), 3000)
    } catch {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 3000)
    }
  }

  return (
    <div>
      {/* Custom Cursor */}
      <div className="cursor-dot" style={{ left: mousePosition.x, top: mousePosition.y }} />
      <div className={`cursor-ring ${cursorVariant}`} style={{ left: mousePosition.x, top: mousePosition.y }} />

      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Animated Background Particles */}
      <div className="bg-particles">
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
      </div>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-profile">
          <img src={profileImg} alt="Veneth" />
        </div>
        <ul className="nav-links">
          <li><a href="#" className="active">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="nav-contact">Let's Talk</a>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        {/* Floating Shapes */}
        <div className="floating-shape floating-shape-1" />
        <div className="floating-shape floating-shape-2" />
        <div className="floating-shape floating-shape-3" />

        <div className="hero-content">
          <div className="title-left">
            <span className="hero-name-label">VENETH</span>
            <h1 className="hero-main-title text-reveal">UI</h1>
          </div>

          <div className="hero-visual">
            <div className="hero-image-card cursor-hover" data-3d-tilt>
              <img src={profileImg} alt="Veneth ChandraKumar" className="hero-image-main" />
              <div className="hero-floating-card">
                <div className="available-pill">
                  <span className="pulse-dot"></span>
                  <span className="available-text">Available for Freelance</span>
                </div>
              </div>
            </div>
            <span className="hi-bubble">HI</span>
          </div>

          <div className="title-right">
            <h1 className="hero-main-title text-reveal">DESIGNER</h1>
            <div className="hero-side-content">
              <h2 className="hero-subtitle"> I design & build digital experiences that convert.</h2>
              <p className="hero-body">
                Specialising in <span className="stroke-text" data-text="UI/UX Design">UI/UX Design</span>, <span className="stroke-text" data-text="No-Code Development">No-Code Development</span>, and <span className="stroke-text" data-text="Vibe Coding">Vibe Coding</span>. I engineer responsive, fully functional web platforms that elevate brands and drive real user action.
              </p>
            </div>
          </div>
        </div>

        <div className="hero-bottom-toggle">
          <button className="theme-toggle-bottom" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>
        </div>
      </section >

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="services-header">
            <span className="section-label">What I Can Do</span>
            <h2 className="services-title">Services</h2>
          </div>
          <MagicBento 
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={8}
            glowColor="201, 251, 0"
          />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <div className="projects-header reveal">
            <span className="section-label">Selected Work</span>
            <h2>Projects</h2>
          </div>
        </div>
        <ScrollStack 
          className="projects-scroll-stack"
          itemDistance={60}
          itemScale={0.03}
          stackPosition="20%"
          scaleEndPosition="10%"
          baseScale={0.88}
          blurAmount={0.3}
        >
          {projects.map((project) => (
            <article 
              key={project.id} 
              className="project-scroll-card reveal"
              style={{ '--project-color': project.color }}
            >
              <div className="psc-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="psc-content">
                <div className="psc-meta">
                  <span className="psc-number">{project.number}</span>
                  <span className="psc-category">{project.category}</span>
                </div>
                <h3 className="psc-title">{project.title}</h3>
                <p className="psc-desc">{project.description}</p>
                <div className="psc-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="psc-tag">{tag}</span>
                  ))}
                </div>
                <div className="psc-actions">
                  <a href="#" className="psc-btn psc-btn-primary">
                    View Project <FiExternalLink />
                  </a>
                  <a href="#" className="psc-btn psc-btn-outline">
                    Case Study
                  </a>
                </div>
              </div>
            </article>
          ))}
        </ScrollStack>
      </section>

      <section id="about" className="about">
        <div className="about-content-wrapper">
          <div className="about-content-left">
            <span className="section-label">About Me</span>
            <p className="about-heading">Hi, I'm Veneth — a UI/UX designer and No-Code developer based in Trichy, Tamil Nadu, passionate about crafting meaningful and impactful digital experiences.</p>
            <p className="about-subheading">Great design is more than aesthetics — it's about seamless interaction and intuitive logic. By leveraging modern design systems and "vibe coding" — an AI-assisted, flow-state approach — I rapidly prototype and launch scalable websites perfectly aligned with business goals.</p>
            <div className="about-stats-grid">
              <div className="about-stat-card" data-3d-tilt>
                <span className="stat-number-lg">1+</span>
                <span className="stat-label-lg">Years of Experience</span>
              </div>
              <div className="about-stat-card" data-3d-tilt>
                <span className="stat-number-lg">5+</span>
                <span className="stat-label-lg">Completed Projects</span>
              </div>
              <div className="about-stat-card" data-3d-tilt>
                <span className="stat-number-lg">5+</span>
                <span className="stat-label-lg">Happy Clients</span>
              </div>
            </div>
            <div className="about-contact-info">
              <div className="about-contact-item">
                <span className="contact-label">Call Today:</span>
                <span className="contact-value">+91 8248547040</span>
              </div>
              <div className="about-contact-item">
                <span className="contact-label">Email:</span>
                <span className="contact-value">venethck34@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="about-canvas">
            <div className="about-image-card cursor-hover" data-3d-tilt>
              <img src={aboutImg} alt="Veneth ChandraKumar" className="about-portrait" />
              <div className="about-floating-card">
                <h5 className="floating-name">Veneth ChandraKumar</h5>
                <p className="floating-role">UI/UX Designer · No-Code Developer</p>
                <div className="floating-location">
                  <FiMapPin className="floating-loc-icon" />
                  <span>Trichy, Tamil Nadu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-visual reveal">
              <div className="contact-image-wrapper">
                <img src={profileImg} alt="Veneth ChandraKumar" />
                <div className="contact-hi-bubble">Hi</div>
              </div>
            </div>

            <div className="contact-form-area reveal reveal-delay-2">
              <span className="section-label">Contact</span>
              <h1 className="contact-title-large">LET'S BUILD SOMETHING IMPACTFUL</h1>
              <p className="contact-intro">Let's build something impactful together—whether it's your brand, your website, or your next big idea.</p>

              <form className="contact-form-main" onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="johnsmith@gmail.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Service Needed ?</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="">Select...</option>
                    <option value="uiux">UI/UX Design</option>
                    <option value="nocode">No-Code Development</option>
                    <option value="vibe">Vibe Coding</option>
                    <option value="branding">Branding</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>What Can I Help You...</label>
                  <textarea
                    placeholder="Hello, I'd like to enquire about..."
                    rows="5"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-submit" disabled={formStatus === 'submitting'}>
                  {formStatus === 'submitting' ? 'SENDING...' : 'SUBMIT'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-glow"></div>
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src={profileImg} alt="Veneth" />
                <span>Veneth ChandraKumar</span>
              </div>
              <p className="footer-tagline">Designing digital experiences that convert.</p>
              <div className="footer-social">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FiLinkedin />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FiInstagram />
                </a>
                <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FiDribbble />
                </a>
                <a href="mailto:venethck34@gmail.com" className="social-link">
                  <FiMail />
                </a>
              </div>
            </div>

            <div className="footer-links-group">
              <h4>Navigation</h4>
              <ul className="footer-links">
                <li><a href="#">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-links-group">
              <h4>Services</h4>
              <ul className="footer-links">
                <li><a href="#services">UI/UX Design</a></li>
                <li><a href="#services">No-Code Development</a></li>
                <li><a href="#services">Web Design</a></li>
                <li><a href="#services">Vibe Coding</a></li>
              </ul>
            </div>

            <div className="footer-links-group">
              <h4>Contact</h4>
              <ul className="footer-links">
                <li><a href="mailto:venethck34@gmail.com">venethck34@gmail.com</a></li>
                <li><a href="tel:+918248547040">+91 8248547040</a></li>
                <li><span className="footer-location">Trichy, Tamil Nadu</span></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-divider"></div>
            <div className="footer-bottom-content">
              <p>&copy; {new Date().getFullYear()} Veneth ChandraKumar. All rights reserved.</p>
              <p className="footer-credit">Crafted with passion & precision</p>
            </div>
          </div>
        </div>
      </footer>
    </div >
  )
}

export default App
