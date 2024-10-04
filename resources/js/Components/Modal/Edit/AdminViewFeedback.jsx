import Modal from '../../Modal';

const FeedbackContent = ({ feedback }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-3xl font-bold text-indigo-800">{feedback.feedback_value} stars</h3>
      </div>
      <h3 className="text-2xl font-bold text-black">{feedback.created_at}</h3>
      <p className="text-md text-black text-justify">{feedback.description}</p>
    </div>
  );
};
const AdminViewFeedback = ({ feedback, isOpen, onClose }) => {
  if (!feedback) return null;

  return (
    <Modal show={isOpen} onClose={onClose}>
      <div className="modal-box bg-indigo-200 w-[32rem] p-12">
        <button
          className="btn btn-md text-black btn-circle btn-ghost absolute right-2 top-2"
          type="button"
          onClick={onClose}
        >
          ✕
        </button>
        <FeedbackContent feedback={feedback} />
      </div>
    </Modal>
  );
};

export default AdminViewFeedback;
