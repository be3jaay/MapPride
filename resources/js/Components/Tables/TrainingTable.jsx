import { useState, useEffect } from 'react';
import axios from 'axios';
import PrimaryButton from '../PrimaryButton';
import AdminModalExperience from '../Modal/AdminModalExperience';
import Loading from '../Loading';

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

export const TrainingTable = () => {
  const [training, setTraining] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTraining = async (pageNumber = 1) => {
    try {
      const response = await axios.get('/api/training', {
        params: { page: pageNumber },
      });

      if (Array.isArray(response.data.data)) {
        setTraining(response.data.data);
        setTotalPages(response.data.last_page);
        setPage(response.data.current_page);
      } else {
        console.error('Unexpected data structure', response.data);
      }
    } catch (error) {
      console.error('There was an error fetching the resources!', error);
    }
  };

  useEffect(() => {
    fetchTraining(page);
  }, [page]);

  const handlePageChange = newPage => {
    setPage(newPage);
    fetchTraining(newPage);
  };

  const handleViewClick = training => {
    setSelectedTraining(training);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTraining(null);
  };

  return (
    <div>
      <div className="overflow-x-auto my-4 shadow-md">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th style={tableHeaderStyle}>Tabs</th>
              <th style={tableHeaderStyle}>Title</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Link</th>
              <th style={tableHeaderStyle}>Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.isArray(training) && training.length > 0 ? (
              training.map(training => (
                <tr key={training.id}>
                  <td style={tableStyle}>{training.tabs_title}</td>
                  <td style={tableStyle}>{training.title}</td>
                  <td style={tableStyle}>{training.description}</td>
                  <td style={tableStyle}>{training.url_link}</td>
                  <td style={tableStyle}>
                    <PrimaryButton
                      onClick={() => handleViewClick(training)}
                      className="flex items-center justify-center py-2"
                    >
                      Edit
                    </PrimaryButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={tableStyle}>
                  <Loading type={'primary'} />
                </td>
              </tr>
            )}
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
      {isModalOpen && selectedTraining && (
        <AdminModalExperience resource={selectedTraining} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};
