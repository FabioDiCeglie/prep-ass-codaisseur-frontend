import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOneSpace } from "../../store/Spaces/actions";
import { useSelector } from "react-redux";
import { selectSpace } from "../../store/Spaces/selectors";
import { addLike } from "../../store/Spaces/actions";

import { fetchComments } from "../../store/Story/actions";
import { selectStoryComments } from "../../store/Story/selectors";
import Comments from "../../components/Comments";
import { selectToken } from "../../store/user/selectors";

export default function DetailSpacePage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const space = useSelector(selectSpace);
  const storiesAndComments = useSelector(selectStoryComments);
  const token = useSelector(selectToken);

  //console.log("what is storiesAndComments", storiesAndComments);
  useEffect(() => {
    dispatch(getOneSpace(id));
    dispatch(fetchComments(id));
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
                {token ? (
                  <button onClick={() => dispatch(addLike(story.id))}>
                    Likes
                  </button>
                ) : (
                  ""
                )}
                <h1 style={{ color: "blue" }}>{story.storyLikes.length}</h1>
                <Comments id={story.id} />
                {storiesAndComments ? (
                  <div>
                    <p>
                      {storiesAndComments
                        .filter(
                          (storyWithComments) =>
                            storyWithComments.storyId === story.id
                        )
                        .map(({ comments }) =>
                          comments.map((comment) => <p>{comment.comment}</p>)
                        )}
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
}
