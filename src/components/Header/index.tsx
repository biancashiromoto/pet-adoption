import Logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <header>
      <img src={Logo} alt="Logo" />
      <h1>Pet adoption</h1>
    </header>
  );
};

export default Header;
