import { useState, useEffect } from "react";
import axios from "axios";
// import DeleteIcon from "@mui/icons-material/Delete";
// import UpdateIcon from "@mui/icons-material/Update";
import { useSelector } from "react-redux";
import { selectToken } from "../components/features/AuthSlice";

const Sondages = () => {
  const [sondage, setSondages] = useState([]);
  // const [selectedSurvey, setSelectedSurvey] = useState(null);
  // const [updatedQuestion, setUpdatedQuestion] = useState("");
  // const [updatedOptions, setUpdatedOptions] = useState("");
  // const token = localStorage.getItem("token");
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      axios
        .get("https://pulso-backend.onrender.com/api/sondages/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const userSondages = response.data.filter((survey) => {
            return survey.owner === parseInt(localStorage.getItem("user"));
          });
          setSondages(userSondages);
        })
        .catch((error) => {
          console.error("Error fetching surveys:", error);
        });
    }
  }, [token]);

  // const handleDelete = async (surveyId) => {
  //   try {
  //     if (token) {
  //       const res = await axios.delete(
  //         `https://pulso-backend.onrender.com/api/sondages/${surveyId}/`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       if (res.status === 204) {
  //         setSondages((prevSurveys) =>
  //           prevSurveys.filter((survey) => survey.id !== surveyId)
  //         );
  //       } else {
  //         console.error("Error deleting survey");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const handleUpdate = (survey) => {
  //   setSelectedSurvey(survey);
  //   setUpdatedQuestion(survey.question);
  //   setUpdatedOptions(survey.options.join("\n"));
  // };

  // const handleUpdateSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     if (token) {
  //       const updatedSurvey = {
  //         question: updatedQuestion,
  //         options: updatedOptions.split("\n"),
  //       };

  //       const res = await axios.put(
  //         `https://pulso-backend.onrender.com/api/sondages/${selectedSurvey.id}/`,
  //         updatedSurvey,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       if (res.status === 200) {
  //         setSondages((prevSurveys) =>
  //           prevSurveys.map((survey) =>
  //             survey.id === selectedSurvey.id
  //               ? { ...survey, ...updatedSurvey }
  //               : survey
  //           )
  //         );
  //         setSelectedSurvey(null);
  //         setUpdatedQuestion("");
  //         setUpdatedOptions("");
  //       } else {
  //         console.error("Error updating survey");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <div className="flex flex-col items-center justify-center font-sans h-screen">
      {(!token || sondage.length === 0) && (
        <div className="text-center text-gray-400 text-2xl font-bold">
          {token
            ? "Aucun sondage à afficher pour l'utilisateur connecté. Veuillez créer d'abord vos sondages pour qu'ils puissent s'afficher ici !"
            : "Veuillez vous connecter pour voir vos sondages existants."}
        </div>
      )}
      <div className=" flex flex-wrap justify-center gap-8">
        {sondage.length === 1 ? (
          <div
            key={sondage[0].id}
            className="w-full rounded-lg overflow-hidden shadow-lg bg-gray-200 bg-opacity-75 m-2"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 py-3 bg-slate-500 text-white">
                {sondage[0].question}
              </div>
              <ul className="list-disc text-gray-700 text-base">
                {sondage[0].options.map((option, index) => (
                  <li key={index}>{`${index + 1}. ${option}`}</li>
                ))}
              </ul>
            </div>
            {/* <div className="flex justify-end items-center px-6 py-2">
              <span>
                <UpdateIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleUpdate(sondage[0])}
                />
              </span>
              <span>
                <DeleteIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(sondage[0].id)}
                />
              </span>
            </div> */}
          </div>
        ) : (
          sondage.map((survey) => (
            <div
              key={survey.id}
              className="rounded-lg overflow-hidden shadow-lg bg-white m-2 w-72 text-center"
            >
              <div className="py-4">
                <div className="font-bold text-xl mb-2 py-3 bg-slate-500 text-white ">
                  {survey.question}
                </div>
                <ol className=" text-gray-400 font-bold hover:text-gray-600 text-start px-5">
                  {survey.options.map((option, index) => (
                    <li key={index}>{`${index + 1}. ${option}`}</li>
                  ))}
                </ol>
              </div>
              {/* <hr />
              <div className="flex justify-around py-2">
                {token && (
                  <>
                    <span>
                      <UpdateIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleUpdate(survey)}
                      />
                    </span>
                    <span>
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(survey.id)}
                      />
                    </span>
                  </>
                )}
              </div> */}
            </div>
          ))
        )}
      </div>

      {/* Modal Modification Sondage
      {selectedSurvey && (
        <div className="absolute inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <div
            className="inset-0 bg-gray-500 opacity-75"
            onClick={() => setSelectedSurvey(null)}
          ></div>
          <div className="bg-white p-8 rounded-md shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Modifier Sondage</h2>
            <form onSubmit={handleUpdateSubmit}>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="updatedQuestion"
              >
                Question:
              </label>
              <input
                type="text"
                id="updatedQuestion"
                value={updatedQuestion}
                onChange={(e) => setUpdatedQuestion(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-4"
              />

              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="updatedOptions"
              >
                Options:
              </label>
              <textarea
                id="updatedOptions"
                value={updatedOptions}
                onChange={(e) => setUpdatedOptions(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-4"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue mr-2"
                >
                  Modifier
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSurvey(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Sondages;
