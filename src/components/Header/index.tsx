import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <Link to="/" className="link link__home" aria-label="Return to Home page">
      <header>
        <img src={Logo} alt="Logo" />
        <h1>Pet adoption</h1>
      </header>
    </Link>
  );
};

export default Header;
