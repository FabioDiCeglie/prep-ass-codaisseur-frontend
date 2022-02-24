import { useState } from "react";
import { useDispatch } from "react-redux";
import { createOneStory } from "../../store/user/actions";
import { showMessageWithTimeout } from "../../store/appState/actions";
export default function PostCoolStoryForm() {
  const [form, setForm] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(createOneStory(name, content, image));
    setName("");
    setContent("");
    setImage("");
    dispatch(showMessageWithTimeout("success", false, "You create a story"));
  }
  //console.log("form", form);
  //console.log("name", name);
  return (
    <div>
      <button value={form} onClick={() => setForm(!form)}>
        Post a cool story bro
      </button>
      {form ? (
        <form onSubmit={handleSubmit}>
          <p>
            <label>
              Name:{" "}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Content:{" "}
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Image:{" "}
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </label>
            <img src={image} style={{ width: 200 }} />
          </p>
          <button type="submit"> Post a form</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}
