import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

 useEffect(() => {
  const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
  setSavedCandidates(savedCandidates);
 }, []);

 const handleRemove = (login: string) => {
  const updatedCandidates = savedCandidates.filter(candidate => candidate.login !== login);
  setSavedCandidates(updatedCandidates);
  localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
 };

  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 && <p>No saved candidates yet.</p>}
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
          </thead>
        <tbody>
          {savedCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td><img src={candidate.avatar_url} alt={candidate.login || "No avatar available"}/></td>
              <td><h2>{candidate.login || "No username available"}</h2></td>
              <td><p>{candidate.location || "No location available"}</p></td>
              <td><p>{candidate.email || "No email available"}</p></td>
              <td><p>{candidate.company || "No company available"}</p></td>
              <td><p>{candidate.bio || "No bio available"}</p></td>
              <td><button onClick={() => handleRemove(candidate.login)}>-</button></td>
            </tr>
          ))}
          </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
