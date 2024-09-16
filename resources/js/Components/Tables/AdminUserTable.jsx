import { useState, useEffect } from 'react';
import axios from 'axios';
import PrimaryButton from '../PrimaryButton';
import Loading from '../Loading';
import { tableHeaderStyle, tableStyle } from './TableStyle';
import DangerButton from '../DangerButton';
import { useToastNotifications } from '../../../core/hooks';
import { useDateFormat } from '../../../core/hooks';
import { Badge } from '../Badge';

export default function AdminUserTable() {
  const [user, setUser] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const { getFormattedDate } = useDateFormat();
  const { notifySuccess } = useToastNotifications();

  const fetchUser = async (pageNumber = 1) => {
    try {
      const response = await axios.get('/api/users', {
        params: { page: pageNumber },
      });

      if (Array.isArray(response.data.data)) {
        setUser(response.data.data);
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
    fetchUser(page);
  }, [page]);

  const handlePageChange = newPage => {
    setPage(newPage);
    fetchUser(newPage);
  };

  const handleDelete = async user => {
    await axios.delete(`/api/users/${user.id}`, user);
    notifySuccess('The content was successfully deleted.');
  };

  const formattedDate = dateString => {
    return getFormattedDate(dateString);
  };

  return (
    <div>
      <div className="overflow-x-auto my-4 shadow-lg rounded-md p-4  ">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th style={tableHeaderStyle}>Username</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Gender</th>
              <th style={tableHeaderStyle}>Created At</th>
              <th style={tableHeaderStyle}>User Type</th>
              <th style={tableHeaderStyle}>Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.isArray(user) && user.length > 0 ? (
              user.map(user => (
                <tr key={user.id}>
                  <td style={tableStyle}>{user.name}</td>
                  <td style={tableStyle}>{user.email}</td>
                  <td style={tableStyle}>{user.gender}</td>
                  <td style={tableStyle}>{formattedDate(user.created_at)}</td>
                  <td style={tableStyle}>
                    <Badge message={user.usertype} type={user.usertype === 'admin' ? 'info' : 'success'} />
                  </td>
                  <td style={tableStyle}>
                    <DangerButton
                      onClick={() => {
                        handleDelete(user);
                      }}
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
    </div>
  );
}
