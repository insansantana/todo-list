import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
export const Card = ({ activity, setOpen }) => {
  const { created_at, id, title } = activity;

  return (
    <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
      <div className="flex justify-between flex-col cursor-pointer">
        <Link to={`/detail/${id}`} data-cy="activity-item">
          <h5
            className="mb-2 text-2xl  h-64 font-bold tracking-tight text-gray-900"
            data-cy="activity-item-title"
          >
            {title}
          </h5>
        </Link>
        <div className="flex justify-between">
          <span
            className="font-semibold text-xl"
            style={{ color: "#888888" }}
            data-cy="activity-item-date"
          >
            {moment(created_at).format("DD MMMM YYYY")}
          </span>
          <button
            data-cy="activity-item-delete-button"
            className="cursor-pointer"
            onClick={() =>
              setOpen({
                visible: true,
                data: id,
                content: `Apakah anda yakin menghapus list activity <strong>"${title}"?</strong>`,
              })
            }
          >
            <img
              src={require("../assets/trash.svg").default}
              alt="delete-icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
