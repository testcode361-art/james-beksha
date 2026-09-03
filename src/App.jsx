// src/App.jsx
import React, { useState, useEffect } from 'react';
import { 
  Mail, BookOpen, User, Award, Quote, ArrowRight, Star, 
  Music, Shield, BookMarked, Menu, X, Home, Info, Phone, 
  MapPin, Compass, FileText, Fingerprint, Scroll, 
  AlertCircle, Target, Zap, Gem, Rocket 
} from 'lucide-react';

const App = () => {
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [logoError, setLogoError] = useState(false);
  const [bgError, setBgError] = useState(false);
  const [authorPhotoError, setAuthorPhotoError] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setEmailStatus('📩 Case file received. We\'ll be in touch.');
      setEmail('');
      setTimeout(() => setEmailStatus(''), 4000);
    } else {
      setEmailStatus('⚠️ Invalid case number. Please enter a valid email.');
      setTimeout(() => setEmailStatus(''), 3000);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'book', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'book', label: 'Book', icon: BookOpen },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <div className="min-h-screen antialiased">
      {/* ===== NAVIGATION ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f1a2e]/95 backdrop-blur-md border-b border-[#b8963a]/10 shadow-lg animate-slide-down">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              {!logoError ? (
                <img 
                  src="/Images/logoName.png" 
                  alt="James E. Beksha Logo" 
                  className="logo-image"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-[#b8963a] to-[#8a7228] rounded-xl flex items-center justify-center text-[#f5f0e8] font-bold text-sm shadow-lg border border-[#b8963a]/20">
                  <span className="text-base">JEB</span>
                </div>
              )}
              <span className="font-bold text-[#f5f0e8] text-lg tracking-tight">
                James E. Beksha
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`nav-link text-sm font-medium ${
                      activeSection === item.id ? 'active' : ''
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </span>
                  </a>
                );
              })}
            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition text-[#f5f0e8]"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className={`md:hidden mobile-menu-enter ${isMenuOpen ? 'active' : ''}`}>
            <div className="py-4 space-y-2 border-t border-[#b8963a]/10">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={closeMenu}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeSection === item.id
                        ? 'bg-[#b8963a]/10 text-[#b8963a] font-medium'
                        : 'text-[#f5f0e8]/70 hover:text-[#f5f0e8] hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* ===== HERO / HOME - Left Aligned Text ===== */}
      <section id="home" className="relative overflow-hidden text-[#f5f0e8] pt-20 w-full min-h-screen flex items-center">
        {/* Background Image */}
        {!bgError ? (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/Images/bg.png')` }}
            onError={() => setBgError(true)}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0f1a2e] via-[#1a1a1a] to-[#0f1a2e]" />
        )}
        
        {/* TOP SECRET stamp */}
        <div className="absolute top-24 right-8 md:right-16 transform rotate-12 opacity-10 z-10 animate-float">
          <div className="border-2 border-[#8b1a1a] rounded-lg px-4 py-2">
            <span className="text-[#8b1a1a] font-mono text-xs tracking-wider font-bold">TOP SECRET</span>
          </div>
        </div>

        {/* Content - Left Aligned */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 flex flex-col items-start w-full">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-[#0f1a2e]/60 backdrop-blur-sm px-4 py-2 rounded-full text-[#f5f0e8] text-sm font-mono font-bold border border-[#b8963a]/20 mb-6 animate-pulse-slow">
              <AlertCircle className="w-4 h-4 text-[#b8963a]" />
              CASE FILE #001
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.2] drop-shadow-lg animate-slide-up">
              <span className="text-white">James E. Beksha</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mt-4 max-w-2xl font-light drop-shadow-md animate-slide-up animation-delay-200">
              Private Eye · Martial Artist · Storyteller
            </p>
            <div className="flex flex-wrap gap-3 mt-8 animate-slide-up animation-delay-400">
              <span className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm border border-white/10 hover:bg-black/40 transition text-white/90 hover:scale-105 transform duration-300">
                <BookOpen className="w-4 h-4 text-[#b8963a]" /> Author
              </span>
              <span className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm border border-white/10 hover:bg-black/40 transition text-white/90 hover:scale-105 transform duration-300">
                <Award className="w-4 h-4 text-[#b8963a]" /> 5th Dan Karate
              </span>
              <span className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm border border-white/10 hover:bg-black/40 transition text-white/90 hover:scale-105 transform duration-300">
                <Shield className="w-4 h-4 text-[#b8963a]" /> 5x Champion
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce-slow">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-scroll-dot"></div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION - Full Width ===== */}
      <section id="about" className="about-section-bg w-full py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="about-wrapper animate-on-scroll" id="about-wrapper">
            <div className={`about-header transition-all duration-700 ${isVisible['about-wrapper'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="about-icon-wrapper">
                <User className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-[#1a1a1a]">About the Author</h2>
                <p className="text-[#1a1a1a]/60 text-sm mt-1 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#8b1a1a]"></span>
                  <span className="font-mono text-[#8b1a1a] text-xs font-bold tracking-wider">CASE FILE #001-B</span>
                </p>
              </div>
            </div>

            <div className="about-content grid md:grid-cols-5 gap-8">
              {/* Left Column - Author Photo and Text inline */}
              <div className="md:col-span-3 space-y-6">
                {/* Photo and Text inline row - Photo now fills the card height */}
                <div className={`transition-all duration-700 delay-100 ${isVisible['about-wrapper'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="about-card p-3">
                    <div className="flex flex-col md:flex-row gap-4 items-stretch">
                      {/* Author Photo - Nearly full height with minimal padding */}
                      <div className="relative w-full md:w-80 flex-shrink-0">
                        {!authorPhotoError ? (
                          <div className="relative overflow-hidden rounded-xl border-2 border-[#b8963a]/30 shadow-xl h-full">
                            <img 
                              src="/Images/author-photo.png" 
                              alt="James E. Beksha - Author" 
                              className="w-full h-full object-cover"
                              onError={() => setAuthorPhotoError(true)}
                            />
                            {/* Decorative corner accents */}
                            <div className="absolute top-0 left-0 w-14 h-14 border-t-3 border-l-3 border-[#b8963a]/40 rounded-tl-xl"></div>
                            <div className="absolute top-0 right-0 w-14 h-14 border-t-3 border-r-3 border-[#b8963a]/40 rounded-tr-xl"></div>
                            <div className="absolute bottom-0 left-0 w-14 h-14 border-b-3 border-l-3 border-[#b8963a]/40 rounded-bl-xl"></div>
                            <div className="absolute bottom-0 right-0 w-14 h-14 border-b-3 border-r-3 border-[#b8963a]/40 rounded-br-xl"></div>
                            {/* Crimson stamp overlay */}
                            <div className="absolute bottom-3 right-3 bg-[#8b1a1a]/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#8b1a1a]/40 shadow-lg">
                              <span className="text-[#f5f0e8] text-[10px] font-mono font-bold tracking-wider">AUTHOR</span>
                            </div>
                            {/* Gold accent line */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b8963a] via-[#d4b86a] to-[#b8963a]"></div>
                          </div>
                        ) : (
                          <div className="relative overflow-hidden rounded-xl border-2 border-[#b8963a]/20 bg-[#1a1a1a] p-12 text-center h-full flex flex-col items-center justify-center">
                            <User className="w-20 h-20 text-[#b8963a]/50 mx-auto mb-3" />
                            <p className="text-[#f5f0e8]/60 text-sm font-mono">Author Photo</p>
                            <p className="text-[#f5f0e8]/40 text-xs font-mono">James E. Beksha</p>
                          </div>
                        )}
                      </div>

                      {/* Text Content - Right side with adjusted spacing for larger photo */}
                      <div className="flex-1 space-y-3 py-1">
                        <p className="text-base leading-relaxed text-[#1a1a1a]">
                          <span className="font-semibold text-[#1a1a1a]">James E. Beksha</span> began his writer's odyssey in a security guard mailer on the 6th of February 1992. 
                          While reading Robert B. Parker's <span className="italic font-medium">Thin Air</span>, he asked himself: <span className="font-medium text-[#8b1a1a]">"how hard could it be to write a book?"</span> 
                          That question launched a 22-year journey.
                        </p>
                        <p className="text-base leading-relaxed text-[#1a1a1a]">
                          A high school dropout in 1979, James is a hard worker from a hard-working family — with a <span className="font-semibold text-[#1a1a1a]">Rock n' Roll Attitude</span> that 
                          fuels every page. His debut novel is now being re-published with <span className="font-semibold text-[#1a1a1a]">Author Reputation Press</span> out of Canton, Mass.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quote - Now below the photo/text row */}
                <div className={`about-quote transition-all duration-700 delay-200 ${isVisible['about-wrapper'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="flex items-start gap-3">
                    <Quote className="w-5 h-5 text-[#8b1a1a] flex-shrink-0 mt-1" />
                    <div className="text-sm text-[#1a1a1a]">
                      <p>I've included a photo of me on the inside back cover, downsized from 8×11 to 6×9, and changed the font in character conversations from italic to normal.</p>
                      <p className="mt-2 font-bold text-[#8b1a1a]">So please get your copy now and jump on board <span className="italic">The Eddie James Mystery Train</span>.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Drop a line form */}
              <div className="md:col-span-2 space-y-4">
                <div className={`transition-all duration-700 delay-300 ${isVisible['about-wrapper'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="about-card">
                    <div className="flex items-center gap-3 text-[#8b1a1a] mb-3">
                      <Mail className="w-5 h-5" />
                      <span className="font-semibold font-mono text-sm tracking-wide">DROP A LINE</span>
                    </div>
                    <p className="text-sm text-[#1a1a1a]/70 mb-4">Submit your case notes about the book.</p>
                    <form onSubmit={handleEmailSubmit} className="space-y-3">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="eddiejames58@Yahoo.com" 
                        className="input-email"
                      />
                      <button 
                        type="submit"
                        className="w-full btn-primary flex items-center justify-center gap-2"
                      >
                        Send <ArrowRight className="w-4 h-4" />
                      </button>
                      {emailStatus && (
                        <div className={`text-sm text-center ${emailStatus.includes('Case') ? 'text-[#8b1a1a]' : 'text-[#8b1a1a]'}`}>
                          {emailStatus}
                        </div>
                      )}
                    </form>
                    <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[#1a1a1a]/50 font-mono">
                      <span className="w-2 h-2 rounded-full bg-[#b8963a]"></span>
                      eddiejames58@Yahoo.com
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BOOK SECTION - Full Width ===== */}
      <section id="book" className="book-section-bg w-full py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="book-wrapper animate-on-scroll" id="book-wrapper">
            <div className={`book-header transition-all duration-700 ${isVisible['book-wrapper'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="book-icon-wrapper">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-[#f5f0e8]">The Case of the Enslaved Souls</h2>
                <p className="text-[#b8963a]/70 text-sm mt-1 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#8b1a1a]"></span>
                  <span className="font-mono text-[#8b1a1a] text-xs font-bold tracking-wider">CASE FILE #002</span>
                </p>
              </div>
            </div>

            <div className="book-content grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className={`transition-all duration-700 delay-100 ${isVisible['book-wrapper'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <span className="book-tag">⬡ ACTIVE CASE</span>
                </div>
                
                <p className={`text-[#f5f0e8]/80 text-lg leading-relaxed transition-all duration-700 delay-200 ${isVisible['book-wrapper'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  When an 18-year-old college freshman vanishes from her downtown Boston apartment, a worried father hires a local private eye — 
                  and that individual is none other than Boston's own <span className="book-highlight">Eddie James</span>.
                </p>
                <p className={`text-[#f5f0e8]/80 text-lg leading-relaxed transition-all duration-700 delay-300 ${isVisible['book-wrapper'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  A former 5-time Martial Arts champion turned Private Investigator, Eddie also happens to be a 5th degree black belter in karate. 
                  But as he starts his first investigation, our hero soon comes to realize there's more than just a missing college student at stake.
                </p>

                <div className={`book-quote-box transition-all duration-700 delay-400 ${isVisible['book-wrapper'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="flex items-start gap-3">
                    <Quote className="w-5 h-5 text-[#b8963a] flex-shrink-0 mt-1" />
                    <div className="text-[#f5f0e8]/70 italic">
                      <p>So might I suggest you get a comfortable chair, and get yourself ready for a one-of-a-kind thriller that will have you on the edge of your seat throughout.</p>
                      <p className="mt-2 font-semibold not-italic text-[#b8963a]">Welcome reader. You're about to enter The Case of the Enslaved Souls.</p>
                    </div>
                  </div>
                </div>

                <div className={`flex flex-wrap gap-4 pt-2 transition-all duration-700 delay-500 ${isVisible['book-wrapper'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <a href="#" className="btn-primary flex items-center gap-2">
                    Get your copy <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="#" className="btn-secondary">
                    Read case file
                  </a>
                </div>
              </div>

              <div className="book-showcase">
                <div className={`book-image-container transition-all duration-700 delay-200 ${isVisible['book-wrapper'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <img 
                    src="/Images/front-cover.png" 
                    alt="The Case of the Enslaved Souls - Front Cover" 
                    className="w-full h-auto"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNDAwIDYwMCI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMxYTFhMWEiLz48dGV4dCB4PSIyMDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2I5OTYzYSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RlJPTlQgQ09WRVI8L3RleHQ+PC9zdmc+';
                    }}
                  />
                </div>
                
                <div className={`book-image-container transition-all duration-700 delay-400 ${isVisible['book-wrapper'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <img 
                    src="/Images/back-cover.png" 
                    alt="The Case of the Enslaved Souls - Back Cover" 
                    className="w-full h-auto"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNDAwIDYwMCI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMxYTFhMWEiLz48dGV4dCB4PSIyMDAiIHk9IjI4MCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2I5OTYzYSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QkFDSyBDT1ZFUjwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL - Full Width ===== */}
      <section className="testimonial-section-bg w-full py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="testimonial-wrapper animate-on-scroll" id="testimonial-wrapper">
            <div className={`transition-all duration-700 ${isVisible['testimonial-wrapper'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-[#b8963a] fill-[#b8963a] animate-pulse-slow" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl font-light text-[#1a1a1a] leading-relaxed text-center">
                “A thrilling ride with a hero who's as tough as he is tenacious. 
                Eddie James is the kind of detective you want in your corner.”
              </blockquote>
              <p className="mt-4 text-[#1a1a1a]/50 text-center font-mono text-sm">— Early reader review · CASE FILE #003</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION - Full Width ===== */}
      <section id="contact" className="contact-section-bg w-full py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="contact-wrapper animate-on-scroll" id="contact-wrapper">
            <div className={`contact-header transition-all duration-700 ${isVisible['contact-wrapper'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="contact-icon-wrapper">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-[#1a1a1a]">Get in Touch</h2>
                <p className="text-[#1a1a1a]/60 text-sm mt-1 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#8b1a1a]"></span>
                  <span className="font-mono text-[#8b1a1a] text-xs font-bold tracking-wider">CASE FILE #004</span>
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className={`contact-card transition-all duration-700 delay-100 ${isVisible['contact-wrapper'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="flex items-start gap-4">
                    <div className="contact-icon-circle">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a] text-lg">Contact</h3>
                      <a href="mailto:eddiejames58@Yahoo.com" className="text-[#1a1a1a]/70 hover:text-[#8b1a1a] transition font-mono text-sm">
                        eddiejames58@Yahoo.com
                      </a>
                      <p className="text-sm text-[#1a1a1a]/40 mt-1">Response within 24 hours</p>
                    </div>
                  </div>
                </div>

                <div className={`contact-card transition-all duration-700 delay-200 ${isVisible['contact-wrapper'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="flex items-start gap-4">
                    <div className="contact-icon-circle">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a] text-lg">Location</h3>
                      <p className="text-[#1a1a1a]/70">Canton, Massachusetts</p>
                      <p className="text-sm text-[#1a1a1a]/40 mt-1">Author Reputation Press</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className={`contact-card transition-all duration-700 delay-300 ${isVisible['contact-wrapper'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="flex items-start gap-4">
                    <div className="contact-icon-circle">
                      <Music className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a] text-lg">Rock n' Roll Attitude</h3>
                      <p className="text-[#1a1a1a]/70">Hard work meets creative passion</p>
                      <p className="text-sm text-[#1a1a1a]/40 mt-1">Writing since 1992</p>
                    </div>
                  </div>
                </div>

                <div className={`contact-card transition-all duration-700 delay-400 ${isVisible['contact-wrapper'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="flex items-start gap-4">
                    <div className="contact-icon-circle">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a] text-lg">Martial Arts</h3>
                      <p className="text-[#1a1a1a]/70">5th Degree Black Belt</p>
                      <p className="text-sm text-[#1a1a1a]/40 mt-1">5x Martial Arts Champion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`contact-cta transition-all duration-700 delay-500 ${isVisible['contact-wrapper'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-[#1a1a1a]/60 text-sm font-mono">
                <span className="text-[#8b1a1a]">✦</span> Submit your case notes on <span className="font-semibold text-[#1a1a1a]">The Case of the Enslaved Souls</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[#b8963a]/10 py-8 bg-[#0f1a2e] w-full">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Author info */}
          <div className="flex items-center gap-2 text-sm text-[#f5f0e8]/40">
            <span className="font-semibold text-[#f5f0e8]/60">James E. Beksha</span>
            <span className="hidden md:inline">·</span>
            <span>Author · Private Eye fiction</span>
          </div>

          {/* Center: Launch Portal Button */}
          <div className="flex-shrink-0">
            <a
              href="https://buy.stripe.com/7sY5kEdVm6vNfRU8Ey2kw07"
              target="_blank"
              rel="noopener noreferrer"
              className="
                relative group
                px-4 py-2 sm:px-6 sm:py-2.5
                bg-gradient-to-r from-[#8b1a1a] via-[#a82828] to-[#8b1a1a]
                text-[#f5f0e8] text-xs sm:text-sm font-medium
                rounded-full
                shadow-md shadow-[#8b1a1a]/30
                transform transition-all duration-300
                hover:scale-105 hover:shadow-[#a82828]/50
                hover:shadow-lg
                border border-[#b8963a]/20
                overflow-hidden
                flex items-center gap-2
              "
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#8b1a1a] via-[#a82828] to-[#8b1a1a] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></span>
              <span className="relative z-10 flex items-center gap-2">
                <Rocket className="w-4 h-4 text-[#b8963a] group-hover:text-[#d4b86a] transition-colors duration-300" />
                Launch & Go-Live Portal
                <ArrowRight className="w-4 h-4 text-[#b8963a] group-hover:text-[#d4b86a] transition-colors duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 rounded-full border border-[#b8963a]/20 group-hover:border-[#b8963a]/60 transition-all duration-300"></span>
            </a>
          </div>

          {/* Right: Email and copyright */}
          <div className="flex items-center gap-4 text-sm text-[#f5f0e8]/40">
            <a href="mailto:eddiejames58@Yahoo.com" className="hover:text-[#b8963a] flex items-center gap-1 transition font-mono text-xs">
              <Mail className="w-4 h-4" /> eddiejames58@Yahoo.com
            </a>
            <span className="text-[#f5f0e8]/20">|</span>
            <span className="text-xs font-mono">© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;