import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { useDispatch } from "react-redux";
import { deleteOneStory } from "../../store/user/actions";
import PostCoolStoryForm, {
  PoostCoolStoryForm,
} from "../../components/PostCoolStoryForm";

export default function MySpacePage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  //console.log("what is user", user);
  return user && user.name && user.email ? (
    <div>
      <div>
        <h1>This is your space!</h1>
        <h4>Name: {user.name}</h4>
        <h4>Email: {user.email}</h4>
        <h1>UserSpace</h1>
        <div
          style={{
            backgroundColor: user.userSpace.backgroundColor,
            color: user.userSpace.color,
          }}
        >
          <h4>{user.userSpace.title}</h4>
          <h4>{user.userSpace.description}</h4>
          <h1>All your stories: </h1>
          <h3>
            {user.userSpace.stories
              ? user.userSpace.stories.map((story) => (
                  <div key={story.id}>
                    <p>{story.name}</p>
                    <p>{story.content}</p>
                    <img
                      style={{ maxWidth: 200 }}
                      src={story.imageUrl}
                      alt={story.name}
                    />
                    <br />
                    <button onClick={() => dispatch(deleteOneStory(story.id))}>
                      Delete story
                    </button>
                  </div>
                ))
              : "Loading"}
          </h3>
          <PostCoolStoryForm />
        </div>
      </div>
    </div>
  ) : (
    "Loading"
  );
}
