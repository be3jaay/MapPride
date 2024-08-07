import { useState, useEffect } from 'react';
import axios from 'axios';
import PrimaryButton from '../PrimaryButton';
import Loading from '../Loading';
import { tableHeaderStyle, tableStyle } from './TableStyle';
import { AdminEditSupport } from '../Modal/Edit/AdminEditSupport';
import DangerButton from '../DangerButton';
import { useToastNotifications } from '../../../core/hooks';

export const SupportTable = () => {
  const [support, setSupport] = useState([]);
  const [selectedSupport, setSelectedSupport] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { notifySuccess } = useToastNotifications();

  const fetchSupport = async (pageNumber = 1) => {
    try {
      const response = await axios.get('/api/support', {
        params: { page: pageNumber },
      });

      if (Array.isArray(response.data.data)) {
        setSupport(response.data.data);
        setTotalPages(response.data.last_page);
        setPage(response.data.current_page);
      } else {
        console.error('Unexpected data structure', response.data);
      }
    } catch (error) {
      console.error('There was an error fetching the resources!', error);
    }
  };

  const handleDelete = async support => {
    await axios.delete(`/api/support/${support.id}`, support);
    notifySuccess('Support content deleted successfully.');
    reset();
  };

  useEffect(() => {
    fetchSupport(page);
  }, [page]);

  const handlePageChange = newPage => {
    setPage(newPage);
    fetchSupport(newPage);
  };

  const handleViewClick = support => {
    setSelectedSupport(support);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSupport(null);
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
            {Array.isArray(support) && support.length > 0 ? (
              support.map(support => (
                <tr key={support.id}>
                  <td style={tableStyle}>{support.title}</td>
                  <td style={tableStyle}>{support.description}</td>
                  <td style={tableStyle}>{support.phoneNumber}</td>
                  <td style={tableStyle}>
                    <PrimaryButton
                      onClick={() => handleViewClick(support)}
                      className="flex items-center justify-center py-2"
                    >
                      Edit
                    </PrimaryButton>
                  </td>
                  <td style={tableStyle}>
                    <DangerButton
                      onClick={() => handleDelete(support)}
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
      {isModalOpen && selectedSupport && (
        <AdminEditSupport support={selectedSupport} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};
