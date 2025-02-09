import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';


const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<{ login: string }[]>([]);
  const [index, setIndex] = useState(0);
  const [candidate, setCandidate] = useState < Candidate >({
    login: 'No username available', 
    avatar_url: 'No avatar available', 
    bio: 'No bio available', 
    location: 'No location available', 
    company: 'No company available', 
    email: 'No email available', 
    id: 0, 
    name: 'No name available'
  });

  function handleAddToSaved() {
    setIndex(index + 1);
    const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    savedCandidates.push(candidate)
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates))
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await searchGithub();
      setCandidates(data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const data = await searchGithubUser(candidates[index]?.login);
      setCandidate(data);
    };
    if (candidates.length > 0) {
      fetchData();
    }
  }, [index, candidates]);
  console.log(candidate);
  return <div>
     <h1>CandidateSearch</h1>
     <div>
      <h2>{candidate?.login || "No username available"}</h2>
      <img src={candidate?.avatar_url} alt={candidate?.login || "No avatar available"} />
      <p>{candidate?.bio || "No bio available"}</p>
      <p>{candidate?.location || "No location available"}</p>
      <p>{candidate?.company || "No company available"}</p>
      <p>{candidate?.email || "No email available"}</p>
      <button onClick={() => setIndex(index + 1)} disabled={index === 0}>
        -
      </button>
      <button onClick={handleAddToSaved} disabled={index === candidates.length - 1}>
        +
      </button>
     </div>
    </div>
};

export default CandidateSearch;
