import { Link, useLocation } from "react-router-dom";
import { Button } from "../Button";
import { useContext } from "react";
import { Context } from "@/context";
import { TbRefresh } from "react-icons/tb";
import { MdKeyboardReturn } from "react-icons/md";
import Logo from "@/assets/Icons/Logo";

const Header = () => {
  const location = useLocation();
  const { setShowUpdatePetsModal } = useContext(Context);

  return (
    <header>
      <Link to="/" className="link link__home" aria-label="Return to Home page">
        <Logo />
        <h1>Pet adoption</h1>
      </Link>
      {location.pathname === "/" && (
        <Button.Root
          data-testid="update-pets"
          ariaLabel="Update pets"
          className="update-pets"
          onClick={() => setShowUpdatePetsModal(true)}
        >
          <TbRefresh />
        </Button.Root>
      )}
      {location.pathname !== "/" && (
        <>
          <Link
            data-testid="link__return"
            className="link link__return"
            to="/"
            aria-label="Return to Home page"
          >
            <MdKeyboardReturn />
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
