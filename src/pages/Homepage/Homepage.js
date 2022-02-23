import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllSpaces } from "../../store/Spaces/actions";
import { useSelector } from "react-redux";
import { selectSpaces } from "../../store/Spaces/selectors";
export default function Homepage() {
  const spaces = useSelector(selectSpaces);
  const dispatch = useDispatch();

  console.log("what is spaces", spaces);
  useEffect(() => {
    dispatch(getAllSpaces());
  }, []);
  return (
    <div>
      <h1>Homepage</h1>
      {spaces
        ? spaces.map((space) => (
            <div
              key={space.id}
              style={{
                backgroundColor: space.backgroundColor,
                color: space.color,
              }}
            >
              <h1>{space.title}</h1>
              <p>{space.description}</p>
            </div>
          ))
        : "Loading"}
    </div>
  );
}
