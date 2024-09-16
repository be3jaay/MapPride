import PrimaryButton from '../PrimaryButton';
import Loading from '../Loading';
import { tableHeaderStyle, tableStyle } from './TableStyle';
import DangerButton from '../DangerButton';
import { AdminEditHotline } from '../Modal/Edit/AdminEditHotline';
import useTableData from '../../../core/hooks/use-table-data';
import { useDateFormat } from '../../../core/hooks';

export const AdminHotlineTable = () => {
  const {
    data: hotlines,
    selectedItem: selectedHotline,
    totalPages,
    page,
    isModalOpen,
    handleDelete,
    handlePageChange,
    handleViewClick,
    closeModal,
  } = useTableData('/api/hotlines');

  const { getFormattedDate } = useDateFormat();

  const formattedDate = dateString => {
    return getFormattedDate(dateString);
  };

  return (
    <div>
      <div className="overflow-x-auto my-4 shadow-lg rounded-md p-4">
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
            {Array.isArray(hotlines) && hotlines.length > 0 ? (
              hotlines.map(hotline => (
                <tr key={hotline.id}>
                  <td style={tableStyle}>{hotline.title}</td>
                  <td style={tableStyle}>{hotline.description}</td>
                  <td style={tableStyle}>{hotline.phoneNumber}</td>
                  <td style={tableStyle}>{formattedDate(hotline.created_at)}</td>
                  <td style={tableStyle}>{formattedDate(hotline.updated_at)}</td>

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
        <AdminEditHotline hotline={selectedHotline} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};
