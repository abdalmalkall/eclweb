import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

const ConfirmDeletePopup = ({ isOpen, onClose, onConfirm, title, message, isSubmitting = false }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={isSubmitting ? undefined : onClose}
      title={title}
    >
      <div className="space-y-4">
        <p className="text-gray-700">{message}</p>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="danger" 
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <Spinner size="sm" />
                <span className="ml-2">Deleting...</span>
              </span>
            ) : (
              'Delete'
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeletePopup;