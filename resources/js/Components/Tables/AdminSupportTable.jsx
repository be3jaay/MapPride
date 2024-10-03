import PrimaryButton from '../PrimaryButton';
import Loading from '../Loading';
import { tableHeaderStyle, tableStyle } from './TableStyle';
import { AdminEditSupport } from '../Modal/Edit/AdminEditSupport';
import DangerButton from '../DangerButton';
import useTableData from '../../../core/hooks/use-table-data';
import { useDateFormat } from '../../../core/hooks';

export const SupportTable = () => {
  const {
    data: support,
    selectedItem: selectedSupport,
    totalPages,
    page,
    isModalOpen,
    handleDelete,
    handlePageChange,
    handleViewClick,
    closeModal,
  } = useTableData('/api/support');

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
              <th style={tableHeaderStyle}>Title</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Phone Number</th>
              <th style={tableHeaderStyle}>Created At: </th>
              <th style={tableHeaderStyle}>Updated At: </th>
              <th style={tableHeaderStyle}>Edit</th>
              <th style={tableHeaderStyle}>Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.isArray(support) && support.length > 0 ? (
              support.map(item => (
                <tr key={item.id}>
                  <td style={tableStyle}>{item.title}</td>
                  <td style={tableStyle}>{item.description}</td>
                  <td style={tableStyle}>{item.phoneNumber}</td>
                  <td style={tableStyle}>{formattedDate(item.created_at)}</td>
                  <td style={tableStyle}>{formattedDate(item.updated_at)}</td>
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
