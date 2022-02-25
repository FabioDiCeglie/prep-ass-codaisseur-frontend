import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateOneStory } from "../../store/user/actions";
import { selectUser } from "../../store/user/selectors";
import("./style.css");
export default function EditForm() {
  const [form, setForm] = useState(false);
  const user = useSelector(selectUser);
  const [title, setTitle] = useState(user.userSpace.title);
  const [description, setDescription] = useState(user.userSpace.description);
  const [backgroundColor, setBackgroundColor] = useState(
    user.userSpace.backgroundColor
  );
  const [color, setColor] = useState(user.userSpace.color);
  const dispatch = useDispatch();

  //console.log("what is user", user);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updateOneStory(user.id, title, description, backgroundColor, color)
    );
    setTitle("");
    setDescription("");
    setForm(false);
  }
  //console.log("form", form);
  //console.log("name", name);
  return (
    <div>
      <button
        className="ButtonsMySpace"
        value={form}
        onClick={() => setForm(!form)}
      >
        Edit my space
      </button>
      {form ? (
        <form onSubmit={handleSubmit}>
          <p>
            <label>
              Title:{" "}
              <input
                type="text"
                //placeholder={user.userSpace.title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Description:{" "}
              <input
                type="text"
                //placeholder={user.userSpace.description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              BackgroundColor:{" "}
              <input
                type="color"
                //placeholder={user.userSpace.backgroundColor}
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Color:{" "}
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </label>
          </p>

          <button type="submit"> Edit a space</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}
