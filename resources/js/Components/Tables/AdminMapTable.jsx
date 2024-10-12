import { tableHeaderStyle, tableStyle } from './TableStyle';
import DangerButton from '../DangerButton';
import { useEffect, useState } from 'react';
import PrimaryButton from '../PrimaryButton';
import Loading from '../Loading';
// import { AdminEditMap } from '../Modal/Edit/AdminEditMap';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const AdminMapTable = () => {
  const [filterUser, setFilterUser] = useState(false); // Toggle for filtering non-admins
  const [showOnlyAdmins, setShowOnlyAdmins] = useState(false); // Toggle for showing only admins
  const [selectMarker, setSelectMarker] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (pageNumber = 1) => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterUserToggle = () => {
    setFilterUser(prevVal => !prevVal);
    if (showOnlyAdmins) setShowOnlyAdmins(false); // Ensure only one toggle is active
  };

  const handleShowOnlyAdminsToggle = () => {
    setShowOnlyAdmins(prevVal => !prevVal);
    if (filterUser) setFilterUser(false); // Ensure only one toggle is active
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handlePageChange = newPage => {
    setPage(newPage);
  };

  const handleDelete = async item => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/map/${item.id}`);
        MySwal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Content deleted successfully.',
        });
        fetchData(page);
      } catch (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error deleting content',
        });
      }
    }
  };

  // Filter data based on the switches
  const filteredMarkers = selectMarker.filter(item => {
    if (filterUser) {
      return item.usertype !== 'admin';
    }
    if (showOnlyAdmins) {
      return item.usertype === 'admin';
    }
    return true;
  });

  return (
    <div className="">
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-2">
          <h3>Filter User Contribution</h3>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            onChange={handleFilterUserToggle}
            checked={filterUser}
            disabled={showOnlyAdmins} // Disable if the "Show Only Admins" toggle is active
          />
        </div>
        <div className="flex items-center gap-2">
          <h3>Show Only Admins</h3>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            onChange={handleShowOnlyAdminsToggle}
            checked={showOnlyAdmins}
            disabled={filterUser} // Disable if the "Filter User" toggle is active
          />
        </div>
      </div>
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
              <th style={tableHeaderStyle}>Posted By</th>
              <th style={tableHeaderStyle}>Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="12" style={tableStyle}>
                  <Loading type="primary" />
                </td>
              </tr>
            ) : Array.isArray(filteredMarkers) && filteredMarkers.length > 0 ? (
              filteredMarkers.map(item => (
                <tr key={item.id}>
                  <td style={tableStyle}>{item.title}</td>
                  <td style={tableStyle}>{item.description}</td>
                  <td style={tableStyle}>{item.location}</td>
                  <td style={tableStyle}>{item.address}</td>
                  <td style={tableStyle}>{item.phone}</td>
                  <td style={tableStyle}>{item.services}</td>
                  <td style={tableStyle}>{item.username}</td>
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
                  Fetched no data...
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
    </div>
  );
};
