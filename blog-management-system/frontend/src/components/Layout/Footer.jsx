const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>(c) {new Date().getFullYear()} Blog Studio. All rights reserved.</p>
        <p>Built with React & Express</p>
      </div>
    </footer>
  );
};

export default Footer;
