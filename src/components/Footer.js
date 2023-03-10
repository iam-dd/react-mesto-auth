import React from "react";

function Footer() {
  const date = new Date();

  return (
    <footer className="footer page__footer">
      <p className="footer__copyright">© {date.getFullYear()} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
