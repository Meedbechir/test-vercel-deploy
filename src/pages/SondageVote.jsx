import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SondageVote = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [sondageDetails, setSondageDetails] = useState({
    id: null,
    question: '',
    options: [],
  });
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchSondageDetails = async () => {
      try {
        const response = await axios.get(
          `https://pulso-backend.onrender.com/api/sondages/${slug}`
        );

        setSondageDetails({
          id: response.data.id || null,
          question: response.data.question,
          options: response.data.options || [],
        });
      } catch (error) {
        console.error('Erreur:', error);
        setSondageDetails(null);
      }
    };

    fetchSondageDetails();
  }, [slug]);

  useEffect(() => {
    const hasVoted = localStorage.getItem('hasVoted') === 'true';
    if (hasVoted) {
      navigate('/pageaftervote');
    }
  }, [navigate]);

  const handleRadioChange = (option) => {
    setSelectedOption(option);
  };

  const handleVoteClick = async () => {
    if (selectedOption) {
      try {
        const response = await axios.post(
          'https://pulso-backend.onrender.com/api/sondages/choix/',
          {
            choix: selectedOption,
            sondage_id: sondageDetails.id,
          }
        );

        if (response.status === 201) {
          console.log('Vote réussi !');
          localStorage.setItem('hasVoted', 'true');
          navigate('/pageaftervote');
        } else {
          console.error('Erreur lors du vote');
        }
      } catch (error) {
        console.error('Erreur lors du vote:', error);
      }
    }
  };

  if (!sondageDetails) {
    return <div>Loading...</div>;
  }

  const { question, options } = sondageDetails;

  return (
    <div className="text-center ">
      <h1 className="text-3xl font-bold mb-4">{question}</h1>
      <ul className="list-none">
        {options.map((option, index) => (
          <li key={index} className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-indigo-600"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleRadioChange(option)}
              />
              <span className="ml-2">{option}</span>
            </label>
          </li>
        ))}
      </ul>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleVoteClick}
      >
        Voter
      </button>
    </div>
  );
};

export default SondageVote;
