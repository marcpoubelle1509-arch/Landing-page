import React, { useState, useEffect, useCallback, ComponentType } from 'react';
import { 
  Shield, 
  TrendingUp, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Menu, 
  X,
  Building2,
  Users,
  Clock,
  Star
} from 'lucide-react';

// Types
interface Feature {
  id: number;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  title: string;
  description: string;
  highlight: string;
}

interface Stat {
  id: number;
  value: string;
  label: string;
}

interface Benefit {
  id: number;
  text: string;
}

interface Testimonial {
  id: number;
  company: string;
  role: string;
  content: string;
  rating: number;
}

interface NavigationLink {
  id: number;
  href: string;
  label: string;
}

interface FooterLink {
  id: number;
  href: string;
  label: string;
}

interface FooterLinks {
  product: FooterLink[];
  support: FooterLink[];
}

interface HeaderProps {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FeatureCardProps {
  feature: Feature;
}

interface StatCardProps {
  stat: Stat;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

// Data constants
const FEATURES_DATA: Feature[] = [
  {
    id: 1,
    icon: Shield,
    title: 'Sécurité Enterprise',
    description: 'Protection des données avec les plus hauts standards de sécurité internationale et conformité RGPD complète.',
    highlight: 'ISO 27001'
  },
  {
    id: 2,
    icon: TrendingUp,
    title: 'Performance Optimale', 
    description: 'Des résultats mesurables avec une amélioration moyenne de 340% du ROI pour nos clients enterprise.',
    highlight: 'ROI +340%'
  },
  {
    id: 3,
    icon: Award,
    title: 'Excellence Reconnue',
    description: 'Leader du marché avec des certifications internationales et la reconnaissance Gartner Magic Quadrant.',
    highlight: 'Leader Gartner'
  }
];

const STATS_DATA: Stat[] = [
  { id: 1, value: '2000+', label: 'Entreprises nous font confiance' },
  { id: 2, value: '99.9%', label: 'Disponibilité garantie SLA' },
  { id: 3, value: '24/7', label: 'Support expert multilingue' }
];

const BENEFITS_DATA: Benefit[] = [
  { id: 1, text: 'Sans engagement contractuel' },
  { id: 2, text: 'Support premium inclus' },
  { id: 3, text: 'Déploiement sous 48h' }
];

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1,
    company: 'TechCorp International',
    role: 'Directeur des Opérations',
    content: 'Une transformation complète de notre efficacité opérationnelle en seulement 3 mois. ROI exceptionnel.',
    rating: 5
  },
  {
    id: 2,
    company: 'Global Industries',
    role: 'Chief Technology Officer',
    content: 'La solution la plus robuste et scalable que nous ayons implémentée. Parfaite pour l\'enterprise.',
    rating: 5
  }
];

const NAVIGATION_LINKS: NavigationLink[] = [
  { id: 1, href: '#solutions', label: 'Solutions' },
  { id: 2, href: '#avantages', label: 'Avantages' },
  { id: 3, href: '#ressources', label: 'Ressources' },
  { id: 4, href: '#contact', label: 'Contact' }
];

const FOOTER_LINKS: FooterLinks = {
  product: [
    { id: 1, href: '#', label: 'Fonctionnalités' },
    { id: 2, href: '#', label: 'Sécurité' },
    { id: 3, href: '#', label: 'Intégrations' },
    { id: 4, href: '#', label: 'API Documentation' }
  ],
  support: [
    { id: 1, href: '#', label: 'Documentation' },
    { id: 2, href: '#', label: 'Centre d\'aide' },
    { id: 3, href: '#', label: 'Contact Support' },
    { id: 4, href: '#', label: 'Statut Système' }
  ]
};

// Component implementations
const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
const IconComponent = feature.icon as React.FC<{ className?: string; 'aria-hidden'?: boolean }>;
  
  return (
    <article className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-xl hover:shadow-gray-200/30 transition-all duration-300 hover:-translate-y-2 group border border-gray-100/50 backdrop-blur-sm">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <IconComponent className="w-8 h-8 text-white" aria-hidden={true} />
        </div>
        <span className="absolute -top-2 -right-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200 shadow-sm">
          {feature.highlight}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-200">
        {feature.title}
      </h3>
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
        {feature.description}
      </p>
    </article>
  );
};

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  return (
    <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-100/50 hover:bg-white/70 transition-all duration-300">
      <div className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" role="presentation">
        {stat.value}
      </div>
      <p className="text-gray-600 font-medium">{stat.label}</p>
    </div>
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <article className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800 transition-all duration-300 hover:border-gray-600">
      <div className="flex mb-4" role="presentation" aria-label={`Note: ${testimonial.rating} sur 5 étoiles`}>
        {Array.from({ length: testimonial.rating }, (_, index) => (
          <Star 
            key={index} 
            className="w-5 h-5 text-yellow-400 fill-current" 
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote className="text-gray-200 mb-4 leading-relaxed">
        "{testimonial.content}"
      </blockquote>
      <footer className="text-sm">
        <cite className="font-semibold text-white not-italic">{testimonial.company}</cite>
        <p className="text-gray-400 mt-1">{testimonial.role}</p>
      </footer>
    </article>
  );
};

const Header: React.FC<HeaderProps> = ({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, [setIsMobileMenuOpen]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-gray-200/20' : 'bg-white/90 backdrop-blur-md'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Navigation principale">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Enterprise Pro
            </span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {NAVIGATION_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 font-medium transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              type="button"
              className="hidden lg:inline-flex text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Se connecter
            </button>
            <button 
              type="button"
              className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-2.5 rounded-lg font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Démo gratuite
            </button>
            
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200/50 py-4 bg-white/95 backdrop-blur-xl">
            <div className="space-y-4">
              {NAVIGATION_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="block text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button 
                type="button"
                className="block w-full text-left text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 py-2"
              >
                Se connecter
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section className="pt-24 pb-20 lg:pt-32 lg:pb-28 bg-gradient-to-br from-gray-50 via-white to-gray-100/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full px-4 py-2 mb-6 shadow-sm">
            <Award className="w-4 h-4 text-gray-700 mr-2" aria-hidden="true" />
            <span className="text-sm font-medium text-gray-700">Leader du marché 2025</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Solutions Enterprise
            </span>
            <span className="block bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
              de Nouvelle Génération
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transformez votre entreprise avec notre plateforme intégrée. 
            Sécurité enterprise, performance optimale, conformité garantie.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button 
              type="button"
              className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-3.5 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-700 transition-all duration-200 flex items-center justify-center group shadow-lg hover:shadow-xl"
            >
              Planifier une démo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </button>
            <button 
              type="button"
              className="border-2 border-gray-300 text-gray-700 px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 backdrop-blur-sm"
            >
              Essai gratuit 14 jours
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            {BENEFITS_DATA.map((benefit) => (
              <div key={benefit.id} className="flex items-center bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-200/50">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" aria-hidden="true" />
                <span className="font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <section id="solutions" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Pourquoi nous choisir ?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Des solutions pensées pour les entreprises modernes qui exigent l'excellence 
            et ne tolèrent aucun compromis sur la performance et la sécurité.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {FEATURES_DATA.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-3 gap-8">
          {STATS_DATA.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Pourquoi 2000+ entreprises nous choisissent
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Une solution complète qui s'adapte à vos processus métier et grandit avec votre organisation.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <Users className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" aria-hidden="true" />
                <span className="text-gray-200 font-medium">Équipes distribuées</span>
              </div>
              <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <Shield className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" aria-hidden="true" />
                <span className="text-gray-200 font-medium">Sécurité certifiée</span>
              </div>
              <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <Clock className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" aria-hidden="true" />
                <span className="text-gray-200 font-medium">Support 24/7</span>
              </div>
              <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <Award className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" aria-hidden="true" />
                <span className="text-gray-200 font-medium">Excellence reconnue</span>
              </div>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0 space-y-6">
            {TESTIMONIALS_DATA.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Prêt à transformer votre entreprise ?
          </span>
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Rejoignez les leaders qui ont choisi l'excellence. 
          Démo personnalisée avec nos experts en moins de 24h.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            type="button"
            className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl group"
          >
            Planifier ma démo executive
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
          </button>
          <button 
            type="button"
            className="border-2 border-gray-400 text-white px-8 py-4 rounded-lg font-bold hover:bg-gray-700 hover:border-gray-300 transition-all duration-200 backdrop-blur-sm"
          >
            Parler à un expert
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Enterprise Pro
              </span>
            </div>
            <p className="text-gray-600 max-w-md mb-6 leading-relaxed">
              Solutions enterprise de nouvelle génération pour les organisations 
              qui exigent l'excellence opérationnelle et la performance maximale.
            </p>
            <p className="text-sm text-gray-500 font-medium">
              © 2025 Enterprise Pro. Tous droits réservés.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Produit</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.id}>
                  <a 
                    href={link.href} 
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.id}>
                  <a 
                    href={link.href} 
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main component
const LandingPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleResize = (): void => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white antialiased">
      <Header 
        isScrolled={isScrolled} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;