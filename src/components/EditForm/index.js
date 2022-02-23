import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateOneStory } from "../../store/user/actions";
import { selectUser } from "../../store/user/selectors";
export default function EditForm() {
  const [form, setForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [color, setColor] = useState("");
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  //console.log("what is user", user);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updateOneStory(user.id, title, description, backgroundColor, color)
    );
    setTitle("");
    setDescription("");
  }
  //console.log("form", form);
  //console.log("name", name);
  return (
    <div>
      <button value={form} onClick={() => setForm(!form)}>
        Edit my space
      </button>
      {form ? (
        <form onSubmit={handleSubmit}>
          <p>
            <label>
              Title:{" "}
              <input
                type="text"
                placeholder={user.userSpace.title}
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
                placeholder={user.userSpace.description}
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
