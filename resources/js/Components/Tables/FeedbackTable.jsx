import PrimaryButton from '../PrimaryButton';
import Loading from '../Loading';
import { Badge } from '../Badge';
import { tableHeaderStyle, tableStyle } from './TableStyle';
import useTableData from '../../../core/hooks/use-table-data';
import AdminViewFeedback from '../Modal/Edit/AdminViewFeedback';
import { useState } from 'react';
import { useDateFormat } from '../../../core/hooks';

export const FeedbackTable = () => {
  const [feedbackStatus, setFeedbackStatus] = useState({});
  const {
    data: feedback,
    selectedItem: selectedFeedback,
    totalPages,
    page,
    isModalOpen,
    handlePageChange,
    handleViewClick,
    closeModal,
  } = useTableData('/api/feedback');

  const { getFormattedDate } = useDateFormat();

  const handleStatusChange = (id, status) => {
    setFeedbackStatus({ ...feedbackStatus, [id]: status });
  };

  const formatDate = dateString => {
    return getFormattedDate(dateString);
  };

  return (
    <div>
      <div className="overflow-x-auto my-4 shadow-lg rounded-md p-4 ">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md">
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
                  <td style={tableStyle}>{formatDate(feedback.created_at)}</td>
                  <td style={tableStyle}>
                    <PrimaryButton
                      onClick={() => handleViewClick(feedback)}
                      className="flex items-center justify-center py-2"
                    >
                      View
                    </PrimaryButton>
                  </td>
                  <td style={tableStyle}>
                    <Badge type="warning" message="Under Observation" />
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
        <AdminViewFeedback
          feedback={selectedFeedback}
          isOpen={isModalOpen}
          onClose={closeModal}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};
