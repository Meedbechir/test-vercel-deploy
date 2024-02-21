import { useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../components/features/AuthSlice";
import { Toaster, toast } from "sonner";

const ShareLink = () => {
  const token = useSelector(selectToken);
  const LienSondage = localStorage.getItem("LienSondage");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (LienSondage && token) {
      navigator.clipboard.writeText(LienSondage);
      setIsCopied(true);
      toast.success("Lien copié!");
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } else {
      console.error("Utilisateur pas authentifié ou pas de lien disponible");
      toast.error("Utilisateur pas authentifié ou pas de lien disponible!");
    }
  };

  return (

    <div className='mt-32 flex items-center justify-center h-screen'>

    <div className="mt-32 flex items-center justify-center">
      <Toaster position="top-left" />

      {LienSondage && token ? (
        <div className="">
          <input
            value={LienSondage}
            disabled
            className="p-3 ms-5"
            style={{ minWidth: "430px" }}
          />
          <button
            onClick={handleCopy}
            className="ml-2 bg-slate-600 text-white px-4 py-2 rounded"
            disabled={isCopied}
          >
            {isCopied ? "Copié!" : "Copier"}
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-400 text-2xl font-bold">
          Pas de lien disponible. Créez un sondage ou connectez-vous.
        </p>
      )}
    </div>
    </div>
  );
};

export default ShareLink;