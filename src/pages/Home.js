import React from "react";
import { Card } from "../components/Card";
import ModalDelete from "../components/ModalDelete";
import Activity from "../components/Activity";
import AlertSuccess from "../components/AlertSuccess";
import { baseURL } from "../util/config";

const Home = () => {
  const [openModal, setOpenModal] = React.useState({
    visible: false,
    data: null,
    title: "",
  });
  const [activitys, setActivitys] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [info, setInfo] = React.useState({});

  const deleteActivity = async () => {
    setLoading(true);

    fetch(`${baseURL}/activity-groups/${openModal.data}`, {
      method: "DELETE",
      body: "",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setOpenModal({ visible: false, data: null });
        setInfo({ message: "Activity berhasil di hapus" });
        setTimeout(() => setLoading(false), 2000);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  const createActivity = async () => {
    setLoading(true);
    fetch(`${baseURL}/activity-groups/`, {
      method: "POST",
      body: JSON.stringify({
        email: "insan.santana@gmail.com",
        title: "New Activity",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setActivitys((prev) => [...prev, { ...result }]);
        setInfo({ message: "Activity berhasil di buat" });
        setTimeout(() => setLoading(false), 2000);
      })
      .catch((error) => console.log("error", error));
  };

  React.useEffect(() => {
    if (!loading) {
      (async () => {
        fetch(`${baseURL}/activity-groups?email=insan.santana@gmail.com`, {
          method: "GET",
          redirect: "follow",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((result) => {
            setActivitys(result.data);
          })
          .catch((error) => console.log("error", error));
      })();
    }
  }, [loading]);
  return (
    <section data-cy="home">
      <Activity create={createActivity} />
      <div>
        {activitys?.length > 0 ? (
          <div className="container mx-auto grid lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-4  grid-cols-2 gap-2 ">
            {activitys.map((activity, i) => (
              <Card key={i} activity={activity} setOpen={setOpenModal} />
            ))}
          </div>
        ) : (
          <img
            src={require("../assets/activity.svg").default}
            alt="logo-activity"
            className="mx-auto"
          />
        )}
      </div>
      <AlertSuccess
        open={loading}
        setOpen={setLoading}
        content={info?.message}
      />
      <ModalDelete
        open={openModal.visible}
        setOpen={setOpenModal}
        content={openModal.content}
        deletItem={deleteActivity}
      />
    </section>
  );
};

export default Home;
