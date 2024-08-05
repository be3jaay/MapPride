import { useState, useEffect } from 'react';
import axios from 'axios';
import PrimaryButton from '../PrimaryButton';
import Loading from '../Loading';
import { tableHeaderStyle, tableStyle } from './TableStyle';
import { AdminEditTraining } from '../Modal/AdminEditTraining';
import DangerButton from '../DangerButton';
import { ToastContainer, toast } from 'react-toastify';

export const TrainingTable = () => {
  const [training, setTraining] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const notifySuccess = () => toast.success('Training content updated successfully.');
  const notifyError = () => toast.error('There was an error updating the training content.');

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

  const handleDelete = async training => {
    try {
      await axios.delete(`/api/training/${training.id}`, training);
      reset();
      notifySuccess();
      onClose();
    } catch (error) {
      notifyError();
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
    <>
      <ToastContainer />
      <div>
        <div className="overflow-x-auto my-4 shadow-lg rounded-md p-4 ">
          <table className="min-w-full divide-y-2 divide-gray-200 text-md">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th style={tableHeaderStyle}>Tabs</th>
                <th style={tableHeaderStyle}>Title</th>
                <th style={tableHeaderStyle}>Description</th>
                <th style={tableHeaderStyle}>Link</th>
                <th style={tableHeaderStyle}>Edit</th>
                <th style={tableHeaderStyle}>Delete</th>
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
                    <td style={tableStyle}>
                      <DangerButton
                        onClick={() => handleDelete(training)}
                        className="flex items-center justify-center py-2"
                      >
                        Delete
                      </DangerButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={tableStyle}>
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
          <AdminEditTraining training={selectedTraining} isOpen={isModalOpen} onClose={closeModal} />
        )}
      </div>
    </>
  );
};
