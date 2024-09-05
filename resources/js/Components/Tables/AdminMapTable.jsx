import { tableHeaderStyle, tableStyle } from './TableStyle';
import DangerButton from '../DangerButton';
import WarningButton from '../WarningButton';
import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import PrimaryButton from '../PrimaryButton';
import Loading from '../Loading';
import { AdminEditMap } from '../Modal/Edit/AdminEditMap';
import axios from 'axios';
import { useToastNotifications } from '../../../core/hooks';

export const AdminMapTable = () => {
  const [selectMarker, setSelectMarker] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { notifySuccess, notifyError } = useToastNotifications();

  const fetchData = async (pageNumber = 1) => {
    try {
      const response = await axios.get('/api/map', {
        params: { page: pageNumber },
      });
      const data = response.data.data ?? [];
      setSelectMarker(data);
      setTotalPages(response.data.last_page || 1);
      setPage(response.data.current_page || 1);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handlePageChange = newPage => {
    setPage(newPage);
  };

  const handleDelete = async item => {
    try {
      await axios.delete(`/api/map/${item.id}`);
      notifySuccess('The content was successfully deleted.');
      fetchData(page);
    } catch (error) {
      notifyError('Error deleting resource.');
      console.error('Error deleting resource:', error);
    }
  };

  const handleViewClick = item => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="">
      <div className="overflow-x-auto my-4 shadow-lg rounded-md p-4">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th style={tableHeaderStyle}>Title</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Location</th>
              <th style={tableHeaderStyle}>Address</th>
              <th style={tableHeaderStyle}>Phone</th>
              <th style={tableHeaderStyle}>Services</th>
              <th style={tableHeaderStyle}>Edit</th>
              <th style={tableHeaderStyle}>Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.isArray(selectMarker) && selectMarker.length > 0 ? (
              selectMarker.map(item => (
                <tr key={item.id}>
                  <td style={tableStyle}>{item.title}</td>
                  <td style={tableStyle}>{item.description}</td>
                  <td style={tableStyle}>{item.location}</td>
                  <td style={tableStyle}>{item.address}</td>
                  <td style={tableStyle}>{item.phone}</td>
                  <td style={tableStyle}>{item.services}</td>
                  <td style={tableStyle}>
                    <PrimaryButton
                      onClick={() => handleViewClick(item)}
                      className="flex items-center justify-center py-2"
                    >
                      Edit
                    </PrimaryButton>
                  </td>
                  <td style={tableStyle}>
                    <DangerButton onClick={() => handleDelete(item)} className="flex items-center justify-center py-2">
                      Delete
                    </DangerButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" style={tableStyle}>
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
      {isModalOpen && selectedItem && <AdminEditMap map={selectedItem} isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
};
