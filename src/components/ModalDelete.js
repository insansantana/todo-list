import React from "react";

const ModalDelete = ({ open, setOpen, deletItem, content }) => {
  if (!open) return null;

  return (
    <div
      data-cy="modal-delete"
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
            <div className="flex justify-center my-12">
              <img src={require("../assets/alert.svg").default} alt="" />
            </div>
            <div className="flex justify-center font-semibold text-center text-xl tracking-widest">
              <p dangerouslySetInnerHTML={{ __html: content }}></p>
            </div>
            <div className="bg-gray-50 px-4 py-12 flex justify-evenly">
              <button
                data-cy="modal-delete-cancel-button"
                type="button"
                className="inline-flex w-full justify-center rounded-3xl border border-transparent bg-grey px-12 py-3 text-base font-semibold text-black shadow-sm  focus:outline-none sm:ml-3 sm:w-auto text-3xl"
                style={{ background: "#F4F4F4" }}
                onClick={() => {
                  setOpen({ visible: false });
                }}
              >
                Batal
              </button>
              <button
                data-cy="modal-delete-confirm-button"
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-3xl border border-gray-300 px-12 py-3 text-base font-semibold text-white shadow-sm focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto text-3xl"
                style={{ background: "#ED4C5C" }}
                onClick={deletItem}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
