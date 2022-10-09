import React from "react";
import { useNavigate } from "react-router-dom";

const Activity = ({
  create,
  params = null,
  setOpen,
  openSort,
  setOpenSort,
  editTitle,
  handleChangeTitle,
  handleEditTitle,
  title,
  refInput,
  setInputValue,
  handleSort,
  todos,
  sort,
}) => {
  const navigate = useNavigate();

  return (
    <div
      data-cy="activity"
      className="container mx-auto flex justify-between my-10"
    >
      <div className="text-3xl font-bold flex items-center">
        {params && (
          <span onClick={() => navigate(-1)} className="cursor-pointer">
            <img src={require("../assets/arrowLeft.svg").default} alt="" />
          </span>
        )}
        {editTitle ? (
          <input
            ref={refInput}
            type="text"
            defaultValue={title}
            onChange={handleChangeTitle}
            className="border-b border-black outline-none"
          />
        ) : (
          <span className="mx-3">{params ? title : "Activity"}</span>
        )}
        {params && (
          <span onClick={handleEditTitle}>
            <img
              src={require("../assets/pencil.svg").default}
              alt="pencil-icon"
              className="cursor-pointer"
            />
          </span>
        )}
      </div>
      <div className="flex items-center">
        {params && (
          <div className="cursor-pointer mr-4 relative">
            {todos?.todo_items?.length > 0 && (
              <img
                src={require("../assets/sort.svg").default}
                alt="sort-icon"
                onClick={() => setOpenSort((prev) => !prev)}
              />
            )}
            {openSort && (
              <div className="absolute border mt-2 -left-4 z-50">
                {[
                  {
                    label: "Terbaru",
                    value: "newest",
                    src: require("../assets/sort_1.svg").default,
                  },
                  {
                    label: "Terlama",
                    value: "oldest",
                    src: require("../assets/sort_2.svg").default,
                  },
                  {
                    label: "A-Z",
                    value: "asc",
                    src: require("../assets/sort_3.svg").default,
                  },
                  {
                    label: "Z-A",
                    value: "desc",
                    src: require("../assets/sort_4.svg").default,
                  },
                  {
                    label: "Belum Selesai",
                    value: "not-done",
                    src: require("../assets/sort_5.svg").default,
                  },
                ].map(({ label, value, src }, i) => (
                  <div
                    key={i}
                    className="bg-white w-52 p-3 flex items-center border-b  hover:bg-gray-200"
                    onClick={() => {
                      handleSort(value);
                    }}
                  >
                    <img src={src} alt="sort" />
                    <span className="ml-4 mx-auto text-lg">{label}</span>
                    {sort === value && (
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
          </div>
        )}
        <button
          data-cy="add-todolist"
          className="text-white font-bold py-2 px-4 rounded-3xl"
          style={{ backgroundColor: "#16ABF8" }}
          onClick={() => {
            if (params) {
              setInputValue((prev) => ({ ...prev, todo_item: {} }));
              setOpen((prev) => ({ visible: !prev.visible, action: "Simpan" }));
            } else {
              create();
            }
          }}
        >
          Tambah
        </button>
      </div>
    </div>
  );
};

export default Activity;
