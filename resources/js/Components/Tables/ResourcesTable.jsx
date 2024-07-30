import { useState, useEffect } from 'react';
import axios from 'axios';
import PrimaryButton from '../PrimaryButton';
import AdminModalExperience from '../Modal/AdminModalExperience';
import Loading from '../Loading';
import { tableHeaderStyle, tableStyle } from './TableStyle';
import { AdminEditResources } from '../Modal/AdminEditResources';

export const ResourcesTable = () => {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchResources = async (pageNumber = 1) => {
    try {
      const response = await axios.get('/api/resources', {
        params: { page: pageNumber },
      });

      if (Array.isArray(response.data.data)) {
        setResources(response.data.data);
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
    fetchResources(page);
  }, [page]);

  const handlePageChange = newPage => {
    setPage(newPage);
    fetchResources(newPage);
  };

  const handleViewClick = resource => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedResource(null);
  };

  return (
    <div>
      <div className="overflow-x-auto my-4 shadow-md">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th style={tableHeaderStyle}>Tabs</th>
              <th style={tableHeaderStyle}>Title</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Link</th>
              <th style={tableHeaderStyle}>Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.isArray(resources) && resources.length > 0 ? (
              resources.map(resource => (
                <tr key={resource.id}>
                  <td style={tableStyle}>{resource.tabs_title}</td>
                  <td style={tableStyle}>{resource.title}</td>
                  <td style={tableStyle}>{resource.description}</td>
                  <td style={tableStyle}>{resource.url_link}</td>
                  <td style={tableStyle}>
                    <PrimaryButton
                      onClick={() => handleViewClick(resource)}
                      className="flex items-center justify-center py-2"
                    >
                      Edit
                    </PrimaryButton>
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
      {isModalOpen && selectedResource && (
        <AdminEditResources resource={selectedResource} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};
