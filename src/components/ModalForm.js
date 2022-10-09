import React from "react";

const ModalForm = ({
  open,
  setOpen,
  setCloseSelect,
  closeSelect,
  setInputValue,
  inputValue,
  createTodos,
  priorities,
  todos,
}) => {
  if (!open.visible) return null;

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className=" fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            data-cy="modal-add"
            className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-9/12"
          >
            <div className="px-4 border-b flex items-center justify-between">
              <h3 className="text-2xl text-gray-700 font-bold p-4">
                Tambah List Item
              </h3>
              <img
                onClick={() => setOpen(false)}
                src={require("../assets/close.svg").default}
                alt="close-icon"
                className=""
              />
            </div>
            <div className="flex flex-col mx-4 p-4">
              <label
                htmlFor=""
                className="text-gray-800 font-bold text-md mb-2"
              >
                NAMA LIST ITEM
              </label>
              <input
                data-cy="modal-add-name-input"
                type="text"
                defaultValue={inputValue?.todo_item?.title}
                placeholder="Tambahkan nama list item"
                className="border rounded-md p-3 placeholder:text-xl focus:outline-blue-400"
                onChange={(e) =>
                  setInputValue((prev) => ({
                    ...prev,
                    todo_item: { ...prev.todo_item, title: e.target.value },
                  }))
                }
              />
            </div>
            <div
              data-cy="modal-add-priority-dropdown"
              className="flex flex-col mx-4 p-4 "
            >
              <label
                htmlFor=""
                className="text-gray-800 font-bold text-md mb-2"
              >
                PRIORITY
              </label>
              <button
                className={`border w-64 cursor-pointer relative`}
                style={{ background: closeSelect && "#F4F4F4" }}
                onClick={() => setCloseSelect((prev) => !prev)}
              >
                <div className="flex items-center border p-3">
                  {inputValue?.todo_item?.priority?.badge && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="7"
                        cy="7"
                        r="7"
                        fill={inputValue.todo_item.priority.badge}
                      />
                    </svg>
                  )}
                  <span
                    className={`${
                      inputValue?.todo_item?.priority?.badge && "ml-4"
                    } mr-auto text-xl text-black`}
                  >
                    {inputValue?.todo_item?.priority?.label || "Pilih priority"}
                  </span>
                  {closeSelect ? (
                    <img
                      src={require("../assets/arrowUp.svg").default}
                      alt="close-icon"
                    />
                  ) : (
                    <img
                      src={require("../assets/arrowDown.svg").default}
                      alt="close-icon"
                    />
                  )}
                </div>
                {closeSelect && (
                  <div className="absolute w-full border z-50">
                    {priorities.map(({ value, label, badge }, i) => (
                      <div
                        data-cy="modal-add-priority-item"
                        key={i}
                        className="bg-white w-full p-3 flex items-center border-b hover:bg-gray-200"
                        onClick={() => {
                          setInputValue((prev) => ({
                            ...prev,
                            todo_item: {
                              ...prev.todo_item,
                              priority: { value, label, badge },
                            },
                          }));
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="7" cy="7" r="7" fill={badge} />
                        </svg>
                        <span className="ml-4 mx-auto text-lg">{label}</span>
                        {inputValue?.todo_item?.priority?.value === value && (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.75 9L7.5 12.75L15 5.25"
                              stroke="#4A4A4A"
                              strokeLinecap="square"
                            />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </button>
            </div>

            <div className="mt-10 flex justify-end border-t">
              <button
                data-cy="modal-add-save-button"
                type="button"
                className="inline-flex rounded-3xl border border-transparent bg-grey px-12 py-3 mr-10 my-4 text-base font-semibold text-white shadow-sm  focus:outline-none text-3xl"
                style={{ background: "#16ABF8" }}
                onClick={() => {
                  if (open.action === "Simpan") {
                    createTodos({
                      method: "POST",
                      data: {
                        title: inputValue?.todo_item?.title,
                        priority:
                          inputValue?.todo_item?.priority?.value || "very-high",
                        activity_group_id: todos.id,
                      },
                    });
                  }
                  if (open.action === "Update") {
                    createTodos({
                      method: "PATCH",
                      data: {
                        title: inputValue.todo_item.title,
                        priority: inputValue.todo_item.priority.value,
                      },
                      id: open.id,
                    });
                  }
                }}
              >
                {open.action}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
