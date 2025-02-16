import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ToDoForm({ todos, setTodo }) {
  const [value, setValue] = useState("");
  const [isValid, validate] = useState(false);

  // handle form state
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //  handle add task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.length) {
      setTodo([...todos, { body: value.toLowerCase(), id: uuidv4(), isCompleted: false }]);
      validate(false);
    } else if (value.length === 0) {
      validate(true);
    }
    setValue("");
  };

  return (
    <>
      <form className="my-4">
        {value.length === 0 && isValid && (
          <p className="mx-4 text-danger">*task cannot be empty</p>
        )}
        {value.length >= 20 && (
          <p className="mx-4 text-danger">
            *only {value.length} characters allowed
          </p>
        )}

        <div className="mx-4">
          <div className="row g-2">
            <div className="col-12 col-sm-8 col-lg-6">
              <input
                type="text"
                className="border border-dark form-control"
                placeholder="Add a new Task"
                onChange={handleChange}
                maxLength={20}
                value={value}
              />
            </div>
            <div className="col-12 col-sm-4 col-lg-6">
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-dark w-100"
              >
                Add ➕
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
