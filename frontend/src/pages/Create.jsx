import { useState, useEffect, React } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { create, setActiveGame } from "../features/game/gameSlice";

function Create() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    btnTxt: "",
    incVal: 1,
    startDate: "",
    endDate: "",
  });

  const { name, description, btnTxt, incVal, startDate, endDate } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(create(formData)).then((res) => {
      dispatch(setActiveGame(res.payload));
      navigate(`/${res.payload._id}`);
    });
  };

  const onCancel = (e) => {
    e.preventDefault();
    setFormData({
      email: "",
      password: "",
    });
    navigate("/");
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <div className="form-container">
        <section className="heading">
          <h1>New Tracker</h1>
          <p>Create a new tracker</p>
        </section>

        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                placeholder="Enter the tracker name"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={description}
                placeholder="Enter the tracker description"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="btnTxt"
                name="btnTxt"
                value={btnTxt}
                placeholder="Enter the tracker button text"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label>Incrementor: </label>
              <input
                type="number"
                className="form-control increment-control"
                id="incVal"
                name="incVal"
                value={incVal}
                placeholder="Incrementor"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="date"
                className="form-control"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-form btn-block">
                Submit
              </button>
            </div>
          </form>
          <div className="form-group">
            <button type="cancel" className="btn btn-block" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Create;
