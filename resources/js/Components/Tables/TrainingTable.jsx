import PrimaryButton from '../PrimaryButton';
import Loading from '../Loading';
import { tableHeaderStyle, tableStyle } from './TableStyle';
import DangerButton from '../DangerButton';
import { ToastContainer } from 'react-toastify';
import { AdminEditTraining } from '../Modal/Edit/AdminEditTraining';
import useTableData from '../../../core/hooks/use-table-data';

export const TrainingTable = () => {
  const {
    data: training,
    selectedItem: selectedTraining,
    totalPages,
    page,
    isModalOpen,
    handlePageChange,
    handleViewClick,
    closeModal,
    handleDelete,
  } = useTableData('/api/training');

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
