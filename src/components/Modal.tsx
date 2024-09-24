export function Modal({ isOpen, toggleModal, action, message }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white p-8 border rounded-md transition flex flex-col justify-center items-center">
            <p className="max-w-xs mb-6 text-gray-500">{message}</p>

            <div className="w-full flex justify-end gap-4">
              <button
                className="bg-white hover:bg-gray-100 active:bg-gray-200 border px-4 py-2 font-semibold rounded"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-700 active:bg-red-800 rounded"
                onClick={() => {
                  action();
                  toggleModal();
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
