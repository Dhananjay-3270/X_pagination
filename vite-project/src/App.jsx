import { useState, useEffect } from 'react';
import './App.css';

function Pagination() {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const indexOfLastMember = currentPage * 10;
  const indexOfFirstMember = indexOfLastMember - 10;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

  return (
    <div className="pagination-container">
      <table className="member-table">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentMembers.map((member, index) => (
            <tr key={index}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-buttons">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(members.length / 10)}>Next</button>
      </div>
    </div>
  );
}

export default Pagination;
