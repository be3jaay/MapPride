import { Badge } from '../Badge';
import PrimaryButton from '../PrimaryButton';
import AdminModalExperience from '../Modal/Edit/AdminModalExperience';
import { tableHeaderStyle, tableStyle } from './TableStyle';
import Loading from '../Loading';
import useTableData from '../../../core/hooks/use-table-data';
import { useDateFormat } from '../../../core/hooks';

export const ExperienceTable = () => {
  const {
    data: experiences,
    selectedItem: selectedExperience,
    totalPages,
    page,
    isModalOpen,
    handlePageChange,
    handleViewClick,
    closeModal,
  } = useTableData('/api/experience');

  const { getFormattedDate } = useDateFormat();

  const formatDate = dateString => {
    return getFormattedDate(dateString);
  };

  return (
    <div>
      <div className="overflow-x-auto my-4 shadow-lg border-md p-4">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th style={tableHeaderStyle}>Username</th>
              <th style={tableHeaderStyle}>Title</th>
              <th style={tableHeaderStyle}>Experience Type</th>
              <th style={tableHeaderStyle}>Location</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Created At</th>
              <th style={tableHeaderStyle}>Actions</th>
              <th style={tableHeaderStyle}>Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.isArray(experiences) && experiences.length > 0 ? (
              experiences.map(exp => (
                <tr key={exp.id}>
                  <td style={tableStyle}>{exp.username}</td>
                  <td style={tableStyle}>{exp.title}</td>
                  <td style={tableStyle}>{exp.experience_type}</td>
                  <td style={tableStyle}>{exp.location}</td>
                  <td style={tableStyle}>{exp.description}</td>
                  <td style={tableStyle}>{formatDate(exp.updated_at)}</td>
                  <td style={tableStyle}>
                    <PrimaryButton
                      onClick={() => handleViewClick(exp)}
                      className="flex items-center justify-center py-2"
                    >
                      View
                    </PrimaryButton>
                  </td>
                  <td style={tableStyle}>
                    {exp.approved ? (
                      <Badge type="success" message="Approved" />
                    ) : (
                      <Badge type="warning" message="For approval" />
                    )}
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
      {isModalOpen && selectedExperience && (
        <AdminModalExperience experience={selectedExperience} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};
