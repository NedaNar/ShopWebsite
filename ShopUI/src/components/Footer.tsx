import instagram from "../assets/images/instagram.png";
import linkedin from "../assets/images/linkedin.png";
import email from "../assets/images/email.png";

interface FooterTabProps {
  href: string;
  src: string;
}

const FooterTab = ({ href, src }: FooterTabProps) => {
  return (
    <a
      href={href}
      target="_blank"
      className="btn-floating btn teal lighten-1"
      style={{ margin: "0 0.4rem" }}
    >
      <img style={{ width: "1.6rem", margin: "0.6rem 0 0" }} src={src}></img>
    </a>
  );
};

export default function Footer() {
  return (
    <div style={{ margin: "4.8rem 0 0" }}>
      <footer className="page-footer blue-grey darken-2">
        <div className="container">
          <div className="row">
            <ul>
              <FooterTab
                href="https://www.instagram.com/nneda_art/"
                src={instagram}
              />
              <FooterTab
                href="https://www.linkedin.com/in/neda-narmontaite/"
                src={linkedin}
              />
              <FooterTab href="" src={email} />
            </ul>
          </div>
        </div>
        <div className="footer-copyright blue-grey darken-3">
          <div className="container">
            © 2024 Neda's Shop, All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
