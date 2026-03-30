import { FiExternalLink, FiFigma, FiCode, FiEdit3, FiMonitor, FiSmartphone, FiTrendingUp, FiMail, FiMapPin, FiCalendar } from 'react-icons/fi'
import { PrimaryButton, SecondaryButton, GlowButton } from './Button'
import './BentoGrid.css'

const skills = [
  { name: 'Figma', icon: FiFigma, level: 95, color: '#F24E1E' },
  { name: 'Adobe XD', icon: FiEdit3, level: 90, color: '#FF61F6' },
  { name: 'Adobe Photoshop', icon: FiMonitor, level: 88, color: '#31A8FF' },
  { name: 'UI/UX Design', icon: FiCode, level: 92, color: '#00ff88' },
  { name: 'Web Design', icon: FiSmartphone, level: 85, color: '#FF6B6B' },
  { name: 'Prototyping', icon: FiTrendingUp, level: 90, color: '#FFD93D' },
]

const projects = [
  {
    id: 1,
    title: 'E-Commerce Website Redesign',
    category: 'Web Design',
    description: 'Complete redesign of an e-commerce platform focusing on user experience and conversion optimization.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    tags: ['Figma', 'UI Design', 'Prototyping'],
    color: '#F24E1E'
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    category: 'Mobile App Design',
    description: 'Intuitive mobile banking application design with focus on accessibility and security.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',
    tags: ['Adobe XD', 'UI/UX', 'Mobile'],
    color: '#00ff88'
  },
  {
    id: 3,
    title: 'SaaS Dashboard',
    category: 'Dashboard Design',
    description: 'Modern analytics dashboard for a SaaS product with data visualization and user-friendly interface.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    tags: ['Figma', 'Dashboard', 'Data Viz'],
    color: '#FF61F6'
  },
  {
    id: 4,
    title: 'Restaurant Website',
    category: 'Web Design',
    description: 'Elegant website design for a fine dining restaurant with online reservation system.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    tags: ['Web Design', 'Responsive', 'Branding'],
    color: '#FFD93D'
  },
]

const aboutContent = {
  title: 'About Me',
  description: 'I am a passionate UI/UX Designer with over 1 year of experience creating engaging digital experiences. My work focuses on understanding user needs and translating them into beautiful, functional designs.',
  location: 'Tiruchirappalli, Tamil Nadu, India',
  availability: 'Available for Freelance & Full-time',
  email: 'venethdesign@gmail.com'
}

function BentoGrid() {
  return (
    <section id="works" className="bento-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">What I Do</span>
          <h2>Skills & Expertise</h2>
          <p>Tools and technologies I use to bring ideas to life.</p>
        </div>
        
        <div className="bento-grid">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <div 
                key={index}
                className="bento-card skill-card col-span-4"
                style={{ '--skill-color': skill.color }}
              >
                <div className="skill-icon-wrapper">
                  <Icon style={{ color: skill.color }} />
                </div>
                <h3 className="skill-name">{skill.name}</h3>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ width: `${skill.level}%`, background: skill.color }}
                  />
                </div>
                <span className="skill-level">{skill.level}%</span>
              </div>
            )
          })}
        </div>

        <div className="section-header" style={{ marginTop: '80px' }}>
          <span className="section-label">Portfolio</span>
          <h2>Selected Projects</h2>
          <p>A showcase of my recent design work.</p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="project-card"
              style={{ '--project-color': project.color }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <PrimaryButton as="button">
                    View Project <FiExternalLink />
                  </PrimaryButton>
                </div>
              </div>
              <div className="project-info">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-header" style={{ marginTop: '80px' }}>
          <span className="section-label">Get In Touch</span>
          <h2>Let's Work Together</h2>
          <p>Have a project in mind? Let's discuss how we can create something amazing.</p>
        </div>

        <div className="about-section">
          <div className="bento-card about-card col-span-6">
            <div className="about-icon">
              <FiMapPin />
            </div>
            <h3>Location</h3>
            <p>{aboutContent.location}</p>
          </div>
          <div className="bento-card about-card col-span-6">
            <div className="about-icon">
              <FiMail />
            </div>
            <h3>Email</h3>
            <a href="mailto:venethdesign@gmail.com">{aboutContent.email}</a>
          </div>
        </div>

        <div className="cta-section">
          <div className="bento-card cta-card col-span-12">
            <h2>Ready to Start Your Project?</h2>
            <p>I'm currently available for freelance work and full-time opportunities.</p>
            <div className="cta-buttons">
              <a href="mailto:venethdesign@gmail.com">
                <GlowButton as="span">
                  <FiMail /> Get In Touch
                </GlowButton>
              </a>
              <a 
                href="https://linkedin.com/in/veneth-chandrakumar-aab3a320a" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <SecondaryButton as="span">
                  <FiExternalLink /> LinkedIn
                </SecondaryButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BentoGrid
