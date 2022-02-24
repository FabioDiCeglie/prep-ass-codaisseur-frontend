import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOneSpace } from "../../store/Spaces/actions";
import { useSelector } from "react-redux";
import { selectSpace } from "../../store/Spaces/selectors";
import { addLike } from "../../store/Spaces/actions";

export default function DetailSpacePage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const space = useSelector(selectSpace);

  console.log("what is space", space);
  useEffect(() => {
    dispatch(getOneSpace(id));
  }, []);
  return (
    <div>
      <h1>Detail space:</h1>
      {space ? (
        <div
          style={{ backgroundColor: space.backgroundColor, color: space.color }}
        >
          <h1>{space.title}</h1>
          <p>{space.description}</p>
          {space.stories
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((story) => (
              <div key={story.id}>
                <h1>{story.name}</h1>
                <p>{story.content}</p>
                <img
                  style={{ width: 300 }}
                  src={story.imageUrl}
                  alt={story.name}
                />
                <button onClick={() => dispatch(addLike(story.id))}>
                  Likes
                </button>
                <h1 style={{ color: "blue" }}>{story.storyLikes.length}</h1>
              </div>
            ))}
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
}
