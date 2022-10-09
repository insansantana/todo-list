import React from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../util/config";
import ModalForm from "../components/ModalForm";
import Activity from "../components/Activity";
import ModalDelete from "../components/ModalDelete";
import AlertSuccess from "../components/AlertSuccess";

const Detail = ({ paretNode }) => {
  const params = useParams();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState({ visible: false, action: "Simpan" });
  const [openSort, setOpenSort] = React.useState(false);
  const [sort, setSort] = React.useState("");
  const [editTitle, setEditTitle] = React.useState(null);
  const [closeSelect, setCloseSelect] = React.useState(false);
  const [todos, setTodos] = React.useState([]);
  const [info, setInfo] = React.useState({});
  const [inputValue, setInputValue] = React.useState({});
  const [openModalDelete, setOpenModalDelete] = React.useState({
    visible: false,
    id: null,
  });
  const [priorities] = React.useState([
    {
      label: "Very High",
      value: "very-high",
      badge: "#ED4C5C",
    },
    {
      label: "High",
      value: "high",
      badge: "#F8A541",
    },
    {
      label: "Medium",
      value: "medium",
      badge: "#00A790",
    },
    {
      label: "Low",
      value: "low",
      badge: "#428BC1",
    },
    {
      label: "Very Low",
      value: "very-low",
      badge: "#8942C1",
    },
  ]);
  const refInput = React.useRef(null);

  const handleOpenSort = (e) => {
    if (e.target.getAttribute("data-cy")) setOpenSort(false);
  };
  const handleChangeTitle = (e) => {
    setInputValue((prev) => ({ ...prev, title: e.target.value }));
  };
  const handleEditTitle = (e) => {
    setEditTitle((prev) => !prev);
  };
  const handleSort = (type) => {
    let newTodos;
    switch (type) {
      case "newest":
        newTodos = todos.todo_items.sort((a, b) => {
          const orderA = a.id;
          const orderB = b.id;

          if (orderA > orderB) {
            return -1;
          }
          if (orderA < orderB) {
            return 1;
          }

          return 0;
        });
        break;
      case "oldest":
        newTodos = todos.todo_items.sort((a, b) => {
          const orderA = a.id;
          const orderB = b.id;

          if (orderA < orderB) {
            return -1;
          }
          if (orderA > orderB) {
            return 1;
          }

          return 0;
        });
        break;
      case "asc":
        newTodos = todos.todo_items.sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          return 0;
        });
        break;
      case "desc":
        newTodos = todos.todo_items.sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          if (titleA > titleB) {
            return -1;
          }
          if (titleA < titleB) {
            return 1;
          }
          return 0;
        });
        break;
      case "not-done":
        newTodos = todos.todo_items.sort((a, b) => {
          const statusA = a.is_active;
          const statusB = b.is_active;

          if (statusA > statusB) {
            return -1;
          }
          if (statusA < statusB) {
            return 1;
          }

          return 0;
        });
        break;
      default:
        return true;
    }

    setTodos((prev) => ({
      ...prev,
      todo_items: newTodos,
    }));
    setSort(type);
    setOpenSort(false);
  };
  const createUpdateTodos = ({ method = "POST", data = null, id = null }) => {
    setLoading(true);
    fetch(`${baseURL}/todo-items${id ? "/" + id : ""}`, {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (method === "POST") {
          setTodos((prev) => ({ ...prev, result }));
          setInfo({ message: "List item berhasil dibuat" });
        } else {
          setInfo({ message: "List item berhasil diupdate" });
        }

        setOpen((prev) => ({ ...prev, visible: false }));
        setTimeout(() => setLoading(false), 2000);
      })
      .catch((error) => console.log("error", error));
  };

  const deleteTodos = () => {
    setLoading(true);
    fetch(`${baseURL}/todo-items/${openModalDelete.id}`, {
      method: "DELETE",
      body: "",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setOpenModalDelete({ visible: false, id: null });
        setInfo({ message: "List item berhasil dihapus" });
        setTimeout(() => setLoading(false), 2000);
      })
      .catch((error) => {
        setLoading(true);
        console.log("error", error);
      });
  };
  React.useEffect(() => {
    if (refInput.current) {
      refInput.current.focus();
    }

    if (editTitle === false) {
      fetch(`${baseURL}/activity-groups/${todos.id}`, {
        method: "PATCH",
        body: JSON.stringify({ title: inputValue.title }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setInputValue((prev) => ({ ...prev, title: result.title }));
        })
        .catch((error) => console.log("error", error));
    }
  }, [editTitle, inputValue.title, todos.id]);

  const getActivity = () => {
    fetch(`${baseURL}/activity-groups/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setTodos(result);
        setInputValue((prev) => ({ ...prev, title: result.title }));
      })
      .catch((error) => console.log("error", error));
  };

  React.useEffect(() => {
    if (params.id && loading === false) {
      fetch(`${baseURL}/activity-groups/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setTodos(result);
          setInputValue((prev) => ({ ...prev, title: result.title }));
        })
        .catch((error) => console.log("error", error));
    }
  }, [loading, params.id]);

  const refEdit = React.useRef(null);
  const refModal = React.useRef(null);
  const handleClickOutsideEditTitle = (e) => {
    if (!refEdit.current?.contains(e.target)) {
      setEditTitle(false);
    }
  };
  const handleClickOutsideModalForm = (e) => {
    if (!refModal.current?.contains(e.target)) {
      setOpen((prev) => ({ ...prev, visible: false }));
    }
  };
  React.useEffect(() => {
    if (open.visible === true) {
      document.addEventListener("click", handleClickOutsideModalForm, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutsideModalForm, true);
    };
  }, [open.visible]);
  React.useEffect(() => {
    if (editTitle === true) {
      document.addEventListener("click", handleClickOutsideEditTitle, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutsideEditTitle, true);
    };
  }, [editTitle]);

  return (
    <section data-cy="todolist-item" onClick={handleOpenSort}>
      <Activity
        refInput={refInput}
        params={params}
        setOpen={setOpen}
        openSort={openSort}
        setOpenSort={setOpenSort}
        handleOpenSort={handleOpenSort}
        editTitle={editTitle}
        handleEditTitle={handleEditTitle}
        handleChangeTitle={handleChangeTitle}
        title={inputValue.title}
        setInputValue={setInputValue}
        handleSort={handleSort}
        sort={sort}
        todos={todos}
        refEdit={refEdit}
      />
      <div data-cy="detail" className="container mx-auto">
        {todos?.todo_items?.length > 0 ? (
          todos?.todo_items?.map((item, i) => (
            <div key={i} data-cy="todo-item" className="flex items-center mb-4">
              <div className="w-full shadow-lg flex items-center justify-between shadow-gray-200 p-5 rounded-xl">
                <div className="flex items-center">
                  <input
                    data-cy="todo-item-checkbox"
                    checked={!item.is_active}
                    type="checkbox"
                    className="h-5 w-5"
                    onChange={(e) => {
                      fetch(`${baseURL}/todo-items/${item.id}`, {
                        method: "PATCH",
                        body: JSON.stringify({ is_active: !e.target.checked }),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      })
                        .then((response) => response.json())
                        .then((result) => {
                          getActivity();
                        })
                        .catch((error) => console.log("error", error));
                    }}
                  />
                  <span className="mx-4">
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 9 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="4.5"
                        cy="4.5"
                        r="4.5"
                        fill={
                          priorities.filter(
                            (curr) => curr.value === item.priority
                          )[0].badge
                        }
                      />
                    </svg>
                  </span>
                  <span
                    data-cy="todo-item-title"
                    className={`text-lg font-semibold ${
                      !item.is_active && "line-through opacity-50"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className="mx-4 cursor-pointer"
                    onClick={() => {
                      setOpen((prev) => ({
                        visible: true,
                        action: "Update",
                        id: item.id,
                      }));
                      setInputValue((prev) => ({
                        ...prev,
                        todo_item: {
                          title: item.title,
                          priority: priorities.reduce((acc, curr) => {
                            if (curr.value === item.priority) acc = curr;
                            return acc;
                          }, {}),
                        },
                      }));
                    }}
                  >
                    <img
                      src={require("../assets/pencil.svg").default}
                      alt="logo-edit"
                    />
                  </span>
                </div>
                <button
                  data-cy="todo-item-delete-button"
                  className="flex items-center"
                  onClick={() =>
                    setOpenModalDelete({
                      visible: true,
                      id: item.id,
                      content: `Apakah anda yakin menghapus list item <strong>"${item.title}"</strong>?`,
                    })
                  }
                >
                  <img
                    src={require("../assets/trash.svg").default}
                    alt="logo-delete"
                    className="cursor-pointer"
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <img
            data-cy="todo-empty-state"
            src={require("../assets/detail.svg").default}
            alt="detail-icon"
            className="mx-auto"
            onClick={() =>
              setOpen((prev) => ({ ...prev, visible: !prev.visible }))
            }
          />
        )}
      </div>
      <ModalDelete
        open={openModalDelete.visible}
        content={openModalDelete.content}
        setOpen={setOpenModalDelete}
        deletItem={deleteTodos}
      />
      <ModalForm
        open={open}
        setOpen={setOpen}
        closeSelect={closeSelect}
        setCloseSelect={setCloseSelect}
        setInputValue={setInputValue}
        inputValue={inputValue}
        createTodos={createUpdateTodos}
        priorities={priorities}
        todos={todos}
        refModal={refModal}
      />
      <AlertSuccess
        open={loading}
        setOpen={setLoading}
        content={info?.message}
      />
    </section>
  );
};

export default Detail;
