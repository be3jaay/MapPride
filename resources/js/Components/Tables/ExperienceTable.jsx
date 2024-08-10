import { Badge } from '../Badge';
import PrimaryButton from '../PrimaryButton';
import AdminModalExperience from '../Modal/Edit/AdminModalExperience';
import { tableHeaderStyle, tableStyle } from './TableStyle';
import Loading from '../Loading';
import useTableData from '../../../core/hooks/use-table-data';
import { useState } from 'react';

export const ExperienceTable = () => {
  const [expStatus, setExpStatus] = useState({});

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

  const handleStatusChange = (id, status) => {
    setExpStatus({ ...expStatus, [id]: status });
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
                  <td style={tableStyle}>
                    <PrimaryButton
                      onClick={() => handleViewClick(exp)}
                      className="flex items-center justify-center py-2"
                    >
                      View
                    </PrimaryButton>
                  </td>
                  <td style={tableStyle}>
                    <Badge
                      type={
                        expStatus[exp.id] === 'Approved'
                          ? 'success'
                          : expStatus[exp.id] === 'Declined'
                          ? 'error'
                          : 'warning'
                      }
                      message={
                        expStatus[exp.id] === 'Approved'
                          ? 'Approved'
                          : expStatus[exp.id] === 'Declined'
                          ? 'Declined'
                          : 'Under Observation'
                      }
                    />
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
        <AdminModalExperience
          experience={selectedExperience}
          isOpen={isModalOpen}
          onClose={closeModal}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};
