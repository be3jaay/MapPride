import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const useTableData = apiEndpoint => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async (pageNumber = 1) => {
    try {
      const response = await axios.get(apiEndpoint, {
        params: { page: pageNumber },
      });

      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
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
    fetchData(page);
  }, [page]);

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
        await axios.delete(`${apiEndpoint}/${item.id}`, item);
        MySwal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Content deleted successfully.',
        });
        fetchData(page);
      } catch (error) {
        console.error('There was an error deleting the resource!', error);
      }
    }
  };

  const handlePageChange = useCallback(
    newPage => {
      setPage(newPage);
    },
    [setPage],
  );

  const handleViewClick = useCallback(
    item => {
      setSelectedItem(item);
      setIsModalOpen(true);
    },
    [setSelectedItem, setIsModalOpen],
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedItem(null);
  }, [setIsModalOpen, setSelectedItem]);

  return {
    data,
    selectedItem,
    totalPages,
    page,
    isModalOpen,
    handleDelete,
    handlePageChange,
    handleViewClick,
    closeModal,
  };
};

export default useTableData;
