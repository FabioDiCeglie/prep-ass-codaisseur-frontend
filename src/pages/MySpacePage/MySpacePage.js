import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { useDispatch } from "react-redux";
import { deleteOneStory } from "../../store/user/actions";
import PostCoolStoryForm from "../../components/PostCoolStoryForm";
import EditForm from "../../components/EditForm";
import("./style.css");

export default function MySpacePage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  console.log("what is user", user);
  return user && user.name && user.email ? (
    <div className="MyspaceBlock">
      <div>
        <div className="MyspaceInfoUser">
          <h1 className="titleInfoUser">This is your space!</h1>
          <h4>Name: {user.name}</h4>
          <h4>Email: {user.email}</h4>
          <h4>{user.userSpace.title}</h4>
          <h4>{user.userSpace.description}</h4>
          <PostCoolStoryForm />
          <EditForm />
        </div>
        <div>
          <h1 style={{ textAlign: "center" }}>All your stories: </h1>
        </div>
        <div>
          <div
            style={{
              backgroundColor: user.userSpace.backgroundColor,
              color: user.userSpace.color,
            }}
            className="MyspaceStory"
          >
            {user.userSpace.stories
              ? user.userSpace.stories.map((story) => (
                  <div className="Stories" key={story.id}>
                    <p>{story.name}</p>
                    <p>{story.content}</p>
                    <img
                      style={{ maxWidth: 200, maxHeight: 200 }}
                      src={story.imageUrl}
                      alt={story.name}
                    />

                    <br />
                    <button
                      className="ButtonsMySpace"
                      onClick={() => dispatch(deleteOneStory(story.id))}
                    >
                      Delete story
                    </button>
                  </div>
                ))
              : "Loading"}
          </div>
        </div>
      </div>
    </div>
  ) : (
    "Loading"
  );
}
