import { useState } from "react";
import { useDispatch } from "react-redux";
import { showMessageWithTimeout } from "../../store/appState/actions";
import { createOneComment } from "../../store/Story/actions";

export default function Comments(props) {
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [form, setForm] = useState(false);

  const dispatch = useDispatch();

  //console.log("what is props.id", props.id);
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(createOneComment(comment, email, props.id));
    dispatch(showMessageWithTimeout("success", false, "You create a comment"));
    setEmail("");
    setComment("");
    setForm(false);
  }
  return (
    <div>
      <button
        className="ButtonsMySpace"
        value={form}
        onClick={() => setForm(!form)}
      >
        Click here for add some comments!
      </button>
      {form ? (
        <form onSubmit={handleSubmit}>
          <p>
            <label>
              Comment:{" "}
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              email:{" "}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </p>
          <button type="submit"> Post a comment</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}
