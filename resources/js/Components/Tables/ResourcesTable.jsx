import PrimaryButton from '../PrimaryButton';
import Loading from '../Loading';
import { tableHeaderStyle, tableStyle } from './TableStyle';
import { AdminEditResources } from '../Modal/Edit/AdminEditResources';
import { ToastContainer } from 'react-toastify';
import DangerButton from '../DangerButton';
import useTableData from '../../../core/hooks/use-table-data';

export const ResourcesTable = () => {
  const {
    data: resources,
    selectedItem: selectedResource,
    totalPages,
    page,
    isModalOpen,
    handlePageChange,
    handleViewClick,
    closeModal,
    handleDelete,
  } = useTableData('/api/resources');

  return (
    <>
      <ToastContainer />
      <div>
        <div className="overflow-x-auto my-4 shadow-lg rounded-md p-4 ">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-MD">
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
              {Array.isArray(resources) && resources.length > 0 ? (
                resources.map(resources => (
                  <tr key={resources.id}>
                    <td style={tableStyle}>{resources.tabs_title}</td>
                    <td style={tableStyle}>{resources.title}</td>
                    <td style={tableStyle}>{resources.description}</td>
                    <td style={tableStyle}>{resources.url_link}</td>
                    <td style={tableStyle}>
                      <PrimaryButton
                        onClick={() => handleViewClick(resources)}
                        className="flex items-center justify-center py-2"
                      >
                        Edit
                      </PrimaryButton>
                    </td>
                    <td style={tableStyle}>
                      <DangerButton
                        onClick={() => handleDelete(resources)}
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
        {isModalOpen && selectedResource && (
          <AdminEditResources resources={selectedResource} isOpen={isModalOpen} onClose={closeModal} />
        )}
      </div>
    </>
  );
};
