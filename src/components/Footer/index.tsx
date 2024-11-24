import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <p>Developed by Bianca Shiromoto</p>
      <section>
        <a
          aria-label="LinkedIn"
          href="https://www.linkedin.com/in/bshiromoto/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          aria-label="GitHub"
          href="https://github.com/biancashiromoto"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
      </section>
    </footer>
  );
};

export default Footer;
