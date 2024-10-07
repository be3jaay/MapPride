import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useModal from '../../../../core/hooks/use-modal';
import Modal from '@/Components/Modal';
import PrimaryButton from '../../PrimaryButton';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ModalMapForm } from './ModalMapForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { mapSchema } from '../../../../core/schema';
const MySwal = withReactContent(Swal);

export const AdminModalMap = () => {
  const [selection, setSelection] = useState([]);
  const { handleOpen, isOpen, closeModal } = useModal();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(mapSchema),
    defaultValues: { ...mapSchema.getDefault() },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = useCallback(
    async data => {
      try {
        const formData = new FormData();
        formData.append('location', data.location);
        formData.append('longitude', data.longitude);
        formData.append('latitude', data.latitude);
        formData.append('image', data.image[0]);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('address', data.address);
        formData.append('phone', data.phone);

        const services = [data.service1, data.service2, data.service3].filter(Boolean);
        formData.append('services', JSON.stringify(services));

        await axios.post('/api/map', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        MySwal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Content submitted successfully.',
        });
        closeModal();
        reset();
      } catch (error) {
        MySwal.fire({
          icon: 'error',
          title: 'error',
          text: 'There was an error posting your map',
        });
      }
    },
    [closeModal, reset],
  );

  const handleClose = useCallback(() => {
    reset();
    closeModal();
  }, [reset, closeModal]);

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const response = await axios.get('/api/map-selection');
        const selectionTitle = response.data.data;
        setSelection(selectionTitle);
      } catch (error) {
        console.error('Error fetching tabs:', error);
      }
    };

    fetchTabs();
  }, []);

  const [areCheckboxesChecked, setAreCheckboxesChecked] = useState(false);

  const handleCheckboxChange = useCallback(() => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
    setAreCheckboxesChecked(allChecked);
  }, [setAreCheckboxesChecked]);

  return (
    <div>
      <PrimaryButton onClick={handleOpen}>Create Marker</PrimaryButton>
      <Modal show={isOpen} onClose={handleClose}>
        <div className="modal-box bg-indigo-200 p-12 max-w-7xl">
          <ModalMapForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            selection={selection}
            handleCheckboxChange={handleCheckboxChange}
            isSubmitting={isSubmitting}
            areCheckboxesChecked={areCheckboxesChecked}
            errors={errors}
          />
        </div>
      </Modal>
    </div>
  );
};
