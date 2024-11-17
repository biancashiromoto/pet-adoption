import { Link, useLocation } from "react-router-dom";
import Logo from "@/assets/logo.svg";
import { Button } from "../Button";
import { useContext } from "react";
import { Context } from "@/context";
import { TbRefresh } from "react-icons/tb";

const Header = () => {
  const location = useLocation();
  const { setShowUpdatePetsModal } = useContext(Context);

  return (
    <header>
      <Link to="/" className="link link__home" aria-label="Return to Home page">
        <img src={Logo} alt="Logo" />
        <h1>Pet adoption</h1>
      </Link>
      {location.pathname === "/" && (
        <Button.Root
          ariaLabel="Update pets"
          className="update-pets"
          onClick={() => setShowUpdatePetsModal(true)}
        >
          <TbRefresh />
        </Button.Root>
      )}
    </header>
  );
};

export default Header;
