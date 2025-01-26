const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
          <div className="p-4 border-b border-green-100">
            <h3 className="text-xl font-semibold text-green-800">{title}</h3>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    );
  };

export default Modal;