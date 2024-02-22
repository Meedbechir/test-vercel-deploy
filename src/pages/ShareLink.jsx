import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../components/features/AuthSlice";
import { Toaster, toast } from "sonner";

const ShareLink = () => {
  const token = useSelector(selectToken);
  const [liensSondages, setLiensSondages] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("user");
    const lienSondagesStockes =
      JSON.parse(localStorage.getItem(`Sondages_${userId}`)) || [];
    setLiensSondages(lienSondagesStockes);
  }, []);

  const handleCopy = (lien) => {
    if (lien && token) {
      navigator.clipboard.writeText(lien);
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
    <div className="mt-40 font-sans">
      <div className="mt-32 flex items-center justify-center">
        <Toaster position="top-left" />
        {liensSondages.length > 0 && token ? (
          <div>
            {liensSondages.map((lien, index) => (
              <div key={index} className="mb-4">
                <input
                  value={lien.lien}
                  disabled
                  className="p-3 ms-5"
                  style={{ minWidth: "430px" }}
                />
                <button
                  onClick={() => handleCopy(lien.lien)}
                  className="ml-2 bg-slate-600 text-white px-4 py-1 rounded-md"
                  disabled={isCopied}
                >
                  {isCopied ? "Copié!" : "Copier"}
                </button>
              </div>
            ))}
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