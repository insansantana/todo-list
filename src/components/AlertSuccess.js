import React from "react";

const AlertSuccess = ({ open, setOpen, content }) => {
  if (!open) return null;

  return (
    <div
      id="modal-dialog"
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={() => {
        setOpen(false);
      }}
    >
      <div className=" fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="flex items-center p-4">
              <img
                src={require("../assets/info.svg").default}
                alt="info-icon"
              />
              <span className="ml-2 text-black font-bold">
                {content || "Activity berhasil dihapus"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertSuccess;
