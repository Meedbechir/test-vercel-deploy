/* eslint-disable react/no-unescaped-entities */
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen font-sans">
      <div className="text-center">
        <h1 className="text-gray-800 text-5xl font-black mb-8">
          La façon la plus simple de créer des sondages
        </h1>
        <h3 className="text-gray-700 font-semibold my-12 text-xl">
          Dites adieu aux formulaires ennuyeux. Rencontrez Pulso — le générateur{" "}
          <br />
          gratuit de formulaires, intuitifs que vous recherchiez.
        </h3>
        <NavLink to="/forms">
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            className="px-4 py-2 my-12 rounded-md"
          >
            Créer un formulaire
          </Button>
        </NavLink>
        <p className="text-gray-400">Pas d'authentification requise</p>
      </div>
    </div>
  );
};

export default Home;
