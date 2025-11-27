import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Menu, X, CheckCircle, Zap, Layers, Globe, Smartphone, TrendingUp, Mail } from 'lucide-react';

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-base font-bold transition-all duration-300 rounded-none tracking-wide";
  const variants = {
    primary: "bg-primary text-accent hover:bg-[#FFED4E] shadow-lg hover:shadow-xl",
    secondary: "bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-neutral-100 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-tighter text-accent flex items-center gap-2">
          PIXEL <span className="text-primary">&</span> CO
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors relative group ${
                location.pathname === link.path ? 'text-accent' : 'text-neutral-600'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          ))}
          <Link to="/contact">
            <Button variant="primary" className="px-6 py-2 text-sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-accent" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-t border-neutral-200 overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-bold text-accent hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-accent text-white py-20">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <h3 className="text-3xl font-black tracking-tight mb-6">PIXEL <span className="text-primary">&</span> CO</h3>
        <p className="text-neutral-400 max-w-md mb-8">
          Transforming ambitious ideas into standout, innovative online presences for tech startups and e-commerce scale-ups.
        </p>
      </div>
      <div>
        <h4 className="text-lg font-bold mb-6 text-primary">Company</h4>
        <ul className="space-y-4 text-neutral-400">
          <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
          <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
          <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
          <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-bold mb-6 text-primary">Connect</h4>
        <ul className="space-y-4 text-neutral-400">
          <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
          <li>hello@pixelandco.agency</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-neutral-800 text-center text-neutral-500 text-sm">
      © {new Date().getFullYear()} Pixel & Co. All rights reserved.
    </div>
  </footer>
);

// --- Page Components ---

const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#FFD60A_360deg)] opacity-10 blur-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-accent tracking-tighter leading-[0.9] mb-8">
              Ignite Your <span className="text-primary block">Brand's Digital</span> Future
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 font-medium leading-relaxed mb-10 max-w-lg">
              We craft bold branding, sleek web designs, and dynamic motion graphics that turn tech startups and e-commerce visions into unforgettable experiences. Fast, innovative, results-driven.
            </p>
            <Link to="/contact">
              <Button>Launch Your Project Today</Button>
            </Link>
          </motion.div>

          <motion.div 
            style={{ y: y1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200" 
                alt="Digital Experience" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-full h-full bg-primary/20 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-32 bg-accent text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
              At Pixel & Co, we blend modern minimalism with energetic precision to deliver premium digital solutions.
            </h2>
            <p className="text-xl text-neutral-400 leading-relaxed mb-12">
              Specializing in tech startups and e-commerce brands, we focus on bold typography, subtle animations, and AI-powered personalization to create sites that load lightning-fast and convert effortlessly. Your ideas deserve to stand out—let's make them unstoppable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: <Zap className="w-8 h-8 text-primary" />, text: "Bold, minimalist designs that capture attention in seconds" },
              { icon: <Smartphone className="w-8 h-8 text-primary" />, text: "Seamless mobile-first experiences with micro-animations" },
              { icon: <TrendingUp className="w-8 h-8 text-primary" />, text: "Data-backed results from transparent case studies" },
              { icon: <Layers className="w-8 h-8 text-primary" />, text: "Innovative tech integration for personalized user journeys" }
            ].map((prop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-neutral-100 group"
              >
                <div className="mb-6 p-4 bg-black rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                  {prop.icon}
                </div>
                <p className="font-bold text-lg leading-snug">{prop.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const About = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-10">Who We Are</h1>
            <p className="text-xl text-neutral-600 mb-6 leading-relaxed">
              Founded by visionary designers passionate about the digital edge, Pixel & Co started as a spark in the tech scene. We've grown into a go-to agency for startups and e-commerce brands seeking that premium edge.
            </p>
            <p className="text-xl text-neutral-600 leading-relaxed">
              From bold rebrands to immersive web experiences, we've helped 50+ clients disrupt their markets with clean, confident designs that move the needle.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
             <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
              alt="Team Collaboration" 
              className="rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>

        {/* Mission */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary p-12 md:p-24 rounded-3xl mb-32 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black text-accent tracking-tight mb-8">
            "To transform bold ideas into premium digital realities that drive growth, engagement, and innovation for ambitious brands."
          </h2>
        </motion.div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Innovation", desc: "Pushing boundaries with AI and animation trends" },
            { title: "Excellence", desc: "Delivering sleek, fast-loading sites every time" },
            { title: "Transparency", desc: "Showcasing real results through interactive portfolios" },
            { title: "Energy", desc: "Infusing confident, dynamic energy into every project" }
          ].map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 border-l-4 border-primary bg-neutral-50"
            >
              <h3 className="text-2xl font-black mb-4">{val.title}</h3>
              <p className="text-neutral-600">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      title: "Bold Branding",
      desc: "Elevate your tech startup or e-commerce brand with striking identities that command attention. We use bold sans-serif typography and neutral palettes with vibrant accents to create memorable logos, visual systems, and style guides tailored for digital dominance.",
      benefits: ["Stand out in crowded markets", "Build trust and recognition", "Adapt seamlessly across web, apps"],
      cta: "Start Your Brand Refresh",
      img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Web Design",
      desc: "Design intuitive, high-converting websites optimized for mobile-first users. Incorporating scroll-triggered animations and quick-loading elements, we build sleek platforms that showcase your products and stories with energetic precision.",
      benefits: ["Boost engagement with dynamic nav", "Drive conversions via results-driven layouts", "Ensure speed and scalability"],
      cta: "Build Your Site Now",
      img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Motion Graphics",
      desc: "Bring your brand to life with subtle, energetic animations that enhance storytelling. From micro-interactions to full video assets, we integrate motion into your digital ecosystem for immersive experiences that captivate 25-40-year-old audiences.",
      benefits: ["Increase user retention", "Highlight product features dynamically", "Align with trends like bold typography"],
      cta: "Animate Your Vision",
      img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black tracking-tighter mb-24 text-center"
        >
          Our Services
        </motion.h1>

        <div className="space-y-32">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
            >
              <div className="flex-1">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-8">{service.title}</h2>
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">{service.desc}</p>
                <ul className="space-y-4 mb-10">
                  {service.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-center gap-3 font-medium">
                      <CheckCircle className="text-primary flex-shrink-0" size={20} />
                      {b}
                    </li>
                  ))}
                </ul>
                <Button>{service.cta}</Button>
              </div>
              <div className="flex-1 w-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-xl overflow-hidden shadow-2xl aspect-[4/3]"
                >
                  <img src={service.img} alt={service.title} className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-accent/10 hover:bg-transparent transition-colors duration-500" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const projects = [
    {
      title: "TechFlow Startup Rebrand",
      desc: "Revamped branding and web design for a SaaS platform, featuring bold typography and AI-driven personalization.",
      result: "40% increase in user sign-ups",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "E-Shop Motion Overhaul",
      desc: "Dynamic motion graphics and e-commerce site rebuild with scroll animations.",
      result: "25% conversion uplift",
      img: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "InnoBrand Web Launch",
      desc: "Full-suite design for a fintech startup: minimalist layout, interactive showcases, and subtle micro-animations.",
      result: "3x traffic growth in first quarter",
      img: "https://images.unsplash.com/photo-1481487484168-9b930d552086?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-neutral-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">Our Bold Creations in Action</h1>
          <p className="text-xl text-neutral-400">
            Explore handpicked projects where we turned innovative ideas into high-impact digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-neutral-800 rounded-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-neutral-400 mb-6">{project.desc}</p>
                <div className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold">
                  Result: {project.result}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
              Ready to <span className="text-primary">Pixelate</span> Your Ideas?
            </h1>
            <p className="text-xl text-neutral-600 mb-12 max-w-md">
              Let's collaborate on your next big digital leap. Share your vision, and we'll craft a custom plan with bold, innovative solutions.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-bold">Email Us</p>
                  <p className="text-neutral-500">hello@pixelandco.agency</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-10 rounded-2xl shadow-xl border border-neutral-100"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Name</label>
                <input 
                  type="text" 
                  className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Email</label>
                <input 
                  type="email" 
                  className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Message</label>
                <textarea 
                  rows="4" 
                  className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <Button className="w-full">Get Your Free Consultation</Button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

// --- App Root ---

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="font-sans text-accent selection:bg-primary selection:text-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;