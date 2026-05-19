const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <span className="footer-logo">Blog<span className="brand-accent">R</span></span>
          <span className="footer-tagline">Your editorial workspace</span>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} BlogR. Built with React &amp; Express.</p>
      </div>
    </footer>
  );
};

export default Footer;
