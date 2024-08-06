import { useState, useEffect } from 'react';
import axios from 'axios';
import PrimaryButton from '../PrimaryButton';
import Loading from '../Loading';
import { tableHeaderStyle, tableStyle } from './TableStyle';
import DangerButton from '../DangerButton';
import { useToastNotifications } from '../../../core/hooks';
import { AdminHotlineModal } from '../Modal/AdminHotlineModal';

export const AdminHotlineTable = () => {
  const [hotline, setHotline] = useState([]);
  const [selectedHotline, setSelectedHotline] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { notifySuccess } = useToastNotifications();

  const fetchHotline = async (pageNumber = 1) => {
    try {
      const response = await axios.get('/api/hotlines', {
        params: { page: pageNumber },
      });

      if (Array.isArray(response.data.data)) {
        setHotline(response.data.data);
        setTotalPages(response.data.last_page);
        setPage(response.data.current_page);
      } else {
        console.error('Unexpected data structure', response.data);
      }
    } catch (error) {
      console.error('There was an error fetching the resources!', error);
    }
  };

  const handleDelete = async hotline => {
    await axios.delete(`/api/hotline/${hotline.id}`, hotline);
    notifySuccess('Hotline content deleted successfully.');
    reset();
  };

  useEffect(() => {
    fetchHotline(page);
  }, [page]);

  const handlePageChange = newPage => {
    setPage(newPage);
    fetchHotline(newPage);
  };

  const handleViewClick = hotline => {
    setSelectedHotline(hotline);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHotline(null);
  };

  return (
    <div>
      <div className="overflow-x-auto my-4 shadow-lg rounded-md p-4  ">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th style={tableHeaderStyle}>Title</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Phone Number</th>
              <th style={tableHeaderStyle}>Edit</th>
              <th style={tableHeaderStyle}>Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.isArray(hotline) && hotline.length > 0 ? (
              hotline.map(hotline => (
                <tr key={hotline.id}>
                  <td style={tableStyle}>{hotline.title}</td>
                  <td style={tableStyle}>{hotline.description}</td>
                  <td style={tableStyle}>{hotline.phoneNumber}</td>
                  <td style={tableStyle}>
                    <PrimaryButton
                      onClick={() => handleViewClick(hotline)}
                      className="flex items-center justify-center py-2"
                    >
                      Edit
                    </PrimaryButton>
                  </td>
                  <td style={tableStyle}>
                    <DangerButton
                      onClick={() => handleDelete(hotline)}
                      className="flex items-center justify-center py-2"
                    >
                      Delete
                    </DangerButton>
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
      {isModalOpen && selectedHotline && (
        <AdminHotlineModal hotline={selectedHotline} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};
