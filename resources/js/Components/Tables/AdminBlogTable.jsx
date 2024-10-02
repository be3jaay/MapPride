import PrimaryButton from '../PrimaryButton';
import Loading from '../Loading';
import { tableHeaderStyle, tableStyle } from './TableStyle';
import { AdminEditSupport } from '../Modal/Edit/AdminEditSupport';
import DangerButton from '../DangerButton';
import useTableData from '../../../core/hooks/use-table-data';
import { useDateFormat } from '../../../core/hooks';

export const AdminBlogTable = () => {
  const {
    data: support,
    selectedItem: selectedSupport,
    totalPages,
    page,
    isModalOpen,
    handleDelete,
    handlePageChange,
    closeModal,
  } = useTableData('/api/blogs');

  const { getFormattedDate } = useDateFormat();

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
              <th style={tableHeaderStyle}>Title</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Image</th>

              <th style={tableHeaderStyle}>Created At: </th>
              <th style={tableHeaderStyle}>Updated At: </th>
              <th style={tableHeaderStyle}>Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.isArray(support) && support.length > 0 ? (
              support.map(support => (
                <tr key={support.id}>
                  <td style={tableStyle}>{support.username}</td>
                  <td style={tableStyle}>{support.title}</td>
                  <td style={tableStyle}>{support.description}</td>
                  <td style={tableStyle}>
                    <img src={`/storage/${support.image}`} alt="No image" className="h-auto w-full rounded-md" />
                  </td>

                  <td style={tableStyle}>{formattedDate(support.created_at)}</td>
                  <td style={tableStyle}>{formattedDate(support.updated_at)}</td>

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
