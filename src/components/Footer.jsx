function Footer() {
  return (
    <footer className="footer section" style={{ borderTop: '1px solid var(--border-medium)', marginTop: 'var(--space-10)' }}>
      <div className="container">
        <div className="footer__grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-8)',
          marginBottom: 'var(--space-10)'
        }}>
          {/* Brand Column */}
          <div className="footer__brand">
            <div className="navbar__logo footer__logo">Lodestone<span>.</span></div>
            <p className="footer__tagline text-muted" style={{ marginTop: 'var(--space-2)' }}>
              L'excellence au bout des doigts.<br />
              Conçu pour l'espace de travail moderne.
            </p>
          </div>
          
          {/* Products Column */}
          <div className="footer__nav-group">
            <h4 className="footer__heading">Produits</h4>
            <ul className="footer__links">
              <li><a href="#hero" className="footer__link">Stand Lodestone MagSafe</a></li>
              <li><a href="#features" className="footer__link">Nouveautés 2026</a></li>
              <li><a href="#specs" className="footer__link">Spécifications techniques</a></li>
              <li><a href="#order" className="footer__link">Acheter maintenant</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="footer__nav-group">
            <h4 className="footer__heading">Support</h4>
            <ul className="footer__links">
              <li><a href="#faq" className="footer__link">FAQ</a></li>
              <li><a href="#" className="footer__link">Guide d'installation</a></li>
              <li><a href="#" className="footer__link">Garantie 2 ans</a></li>
              <li><a href="#" className="footer__link">Nous contacter</a></li>
            </ul>
          </div>
          
          {/* Socials Column */}
          <div className="footer__socials-group">
            <h4 className="footer__heading">Rejoignez-nous</h4>
            <div className="footer__socials">
              <a href="#" aria-label="X (Twitter)" className="footer__social-link"><i className="fa-brands fa-x"></i></a>
              <a href="#" aria-label="Instagram" className="footer__social-link"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" aria-label="YouTube" className="footer__social-link"><i className="fa-brands fa-youtube"></i></a>
              <a href="#" aria-label="LinkedIn" className="footer__social-link"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom" style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: 'var(--space-6)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)'
        }}>
          <p className="text-xs text-muted" style={{ margin: 0 }}>© 2026 Lodestone Technologies. Tous droits réservés.</p>
          <div className="footer__legal">
            <a href="#" className="footer__legal-link">Mentions Légales</a>
            <a href="#" className="footer__legal-link">Politique de Confidentialité</a>
            <a href="#" className="footer__legal-link">Conditions Générales de Vente</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
