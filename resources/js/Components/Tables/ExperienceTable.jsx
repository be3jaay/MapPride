import { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge } from '../Badge';
import PrimaryButton from '../PrimaryButton';
import AdminModalExperience from '../Modal/AdminModalExperience';

const tableHeaderStyle = {
  whiteSpace: 'nowrap',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  color: 'indigo',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '1rem',
};

const tableStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  fontWeight: '500',
  color: '#111827',
  textAlign: 'center',
  maxWidth: '200px',
};

export const ExperienceTable = () => {
  const [experiences, setExperiences] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchExperiences = async (pageNumber = 1) => {
    try {
      const response = await axios.get('/api/experience', {
        params: { page: pageNumber },
      });
      setExperiences(response.data.data);
      setTotalPages(response.data.last_page);
      setPage(response.data.current_page);
    } catch (error) {
      console.error('There was an error fetching the experiences!', error);
    }
  };

  useEffect(() => {
    fetchExperiences(page);
  }, [page]);

  const handlePageChange = newPage => {
    setPage(newPage);
    fetchExperiences(newPage);
  };

  const handleViewClick = experience => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExperience(null);
  };

  return (
    <div>
      <div className="overflow-x-auto my-4 shadow-md">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th style={tableHeaderStyle}>Username</th>
              <th style={tableHeaderStyle}>Title</th>
              <th style={tableHeaderStyle}>Experience Type</th>
              <th style={tableHeaderStyle}>Location</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Actions</th>
              <th style={tableHeaderStyle}>Actions Taken</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {experiences.map(exp => (
              <tr key={exp.id}>
                <td style={tableStyle}>{exp.username}</td>
                <td style={tableStyle}>{exp.title}</td>
                <td style={tableStyle}>{exp.experience_type}</td>
                <td style={tableStyle}>{exp.location}</td>
                <td style={tableStyle}>{exp.description}</td>
                <td style={tableStyle}>
                  <PrimaryButton onClick={() => handleViewClick(exp)} className="flex items-center justify-center py-2">
                    View
                  </PrimaryButton>
                </td>
                <td style={tableStyle}>
                  <Badge type="success" message="Approved" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center my-4">
        <PrimaryButton
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="flex items-center justify-center py-2"
        >
          Previous
        </PrimaryButton>
        <span className="mx-4">
          Page {page} of {totalPages}
        </span>
        <PrimaryButton
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className="flex items-center justify-center py-2"
        >
          Next
        </PrimaryButton>
      </div>

      {isModalOpen && selectedExperience && (
        <AdminModalExperience experience={selectedExperience} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};
