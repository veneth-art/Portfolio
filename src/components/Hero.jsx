import { useEffect, useRef, useState } from 'react'
import { FiArrowDown, FiZap, FiMail, FiLinkedin, FiDribbble, FiInstagram } from 'react-icons/fi'
import { PrimaryButton, SecondaryButton, ScrollHintButton, GlowButton } from './Button'
import './Hero.css'

function Hero() {
  const canvasRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const scene = new window.THREE.Scene()
    const camera = new window.THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new window.THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const geometry = new window.THREE.TorusGeometry(2, 0.5, 16, 100)
    const material = new window.THREE.MeshBasicMaterial({ 
      color: 0x00ff88,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    })
    const torus = new window.THREE.Mesh(geometry, material)
    scene.add(torus)

    const geometry2 = new window.THREE.IcosahedronGeometry(1.5, 0)
    const material2 = new window.THREE.MeshBasicMaterial({ 
      color: 0xff3366,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    })
    const icosahedron = new window.THREE.Mesh(geometry2, material2)
    icosahedron.position.set(3, 1, -2)
    scene.add(icosahedron)

    const particlesGeometry = new window.THREE.BufferGeometry()
    const particlesCount = 500
    const posArray = new Float32Array(particlesCount * 3)
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15
    }
    
    particlesGeometry.setAttribute('position', new window.THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new window.THREE.PointsMaterial({
      size: 0.02,
      color: 0x00ff88,
      transparent: true,
      opacity: 0.8
    })
    const particlesMesh = new window.THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    camera.position.z = 5

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePos({ x: event.clientX, y: event.clientY })
    }

    const animate = () => {
      requestAnimationFrame(animate)

      torus.rotation.x += 0.003
      torus.rotation.y += 0.005
      
      icosahedron.rotation.x += 0.002
      icosahedron.rotation.y += 0.003

      particlesMesh.rotation.y += 0.0005

      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [])

  const scrollToWorks = () => {
    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })
  }

  const socialLinks = [
    { icon: FiLinkedin, href: 'https://linkedin.com/in/veneth-chandrakumar-aab3a320a', label: 'LinkedIn' },
    { icon: FiDribbble, href: 'https://behance.net/massveneth', label: 'Behance' },
    { icon: FiInstagram, href: '#', label: 'Instagram' },
  ]

  return (
    <>
      <section className="hero">
        <canvas ref={canvasRef} className="three-canvas" />
        
        <div className="hero-glow" style={{
          left: mousePos.x + 'px',
          top: mousePos.y + 'px'
        }} />
        
        <div className="hero-split container">
          <div className="hero-content">
            <div className="hero-badge animate-fade-in-up">
              <FiZap className="badge-icon" />
              <span>Available for Freelance</span>
            </div>
            
            <h1 className="hero-title animate-fade-in-up delay-100">
              <span className="hero-name">Veneth ChandraKumar</span><br />
              <span className="hero-role">UI/UX & No-Code Developer</span>
            </h1>
            
            <p className="hero-tagline animate-fade-in-up delay-200">
              Design & Build Digital Experiences That Actually Convert.
            </p>
            
            <p className="hero-description animate-fade-in-up delay-200">
              Specialising in UI/UX Design, No-Code Development, and Vibe Coding. I don't just design pretty screens — I engineer responsive, fully functional web platforms that elevate brands and drive real user action.
            </p>
            
            <div className="hero-cta animate-fade-in-up delay-300">
              <GlowButton onClick={scrollToWorks}>
                View My Works
              </GlowButton>
              <a href="mailto:venethdesign@gmail.com">
                <SecondaryButton as="span">
                  <FiMail /> Get In Touch
                </SecondaryButton>
              </a>
            </div>
            
            <div className="hero-socials animate-fade-in-up delay-400">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title={social.label}
                >
                  <social.icon />
                </a>
              ))}
            </div>
            
            <div className="hero-stats animate-fade-in-up delay-400">
              <div className="stat">
                <span className="stat-number">20+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat">
                <span className="stat-number">1+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">15+</span>
                <span className="stat-label">Happy Clients</span>
              </div>
            </div>
          </div>
          
          <div className="hero-image animate-fade-in-up delay-200">
            <div className="profile-image-wrapper">
              <img 
                src="/assets/veneth.png" 
                alt="Veneth ChandraKumar - UI/UX & No-Code Developer" 
                className="profile-image"
              />
              <div className="profile-image-glow"></div>
            </div>
          </div>
        </div>
        
        <ScrollHintButton className="animate-fade-in delay-500" onClick={scrollToWorks}>
          <span>Scroll to explore</span>
          <FiArrowDown className="scroll-arrow animate-float" />
        </ScrollHintButton>
      </section>
    </>
  )
}

export default Hero
