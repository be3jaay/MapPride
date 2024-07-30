import { useState, useEffect } from 'react';
import axios from 'axios';
import PrimaryButton from '../PrimaryButton';
import AdminModalExperience from '../Modal/AdminModalExperience';
import Loading from '../Loading';
import { Badge } from '../Badge';
import { tableHeaderStyle, tableStyle } from './TableStyle';

export const FeedbackTable = () => {
  const [feedback, setFeedback] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchFeedback = async (pageNumber = 1) => {
    try {
      const response = await axios.get('/api/feedback', {
        params: { page: pageNumber },
      });

      if (Array.isArray(response.data.data)) {
        setFeedback(response.data.data);
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
    fetchFeedback(page);
  }, [page]);

  const handlePageChange = newPage => {
    setPage(newPage);
    fetchFeedback(newPage);
  };

  const handleViewClick = feedback => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeedback(null);
  };

  return (
    <div>
      <div className="overflow-x-auto my-4 shadow-md">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th style={tableHeaderStyle}>Ratings</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Date Created</th>
              <th style={tableHeaderStyle}>Actions</th>
              <th style={tableHeaderStyle}>Actions Taken</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.isArray(feedback) && feedback.length > 0 ? (
              feedback.map(feedback => (
                <tr key={feedback.id}>
                  <td style={tableStyle}>{feedback.feedback_value} stars</td>
                  <td style={tableStyle}>{feedback.description}</td>
                  <td style={tableStyle}>{feedback.created_at}</td>
                  <td style={tableStyle}>
                    <PrimaryButton
                      onClick={() => handleViewClick(feedback)}
                      className="flex items-center justify-center py-2"
                    >
                      Edit
                    </PrimaryButton>
                  </td>
                  <td style={tableStyle}>
                    <Badge type="success" message="Fixed" />
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
      {isModalOpen && selectedFeedback && (
        <AdminModalExperience resource={selectedFeedback} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};
