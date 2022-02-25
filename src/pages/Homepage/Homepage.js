import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllSpaces } from "../../store/Spaces/actions";
import { useSelector } from "react-redux";
import { selectSpaces } from "../../store/Spaces/selectors";
import { Link } from "react-router-dom";
import("./style.css");

export default function Homepage() {
  const spaces = useSelector(selectSpaces);
  const dispatch = useDispatch();

  //console.log("what is spaces", spaces);
  useEffect(() => {
    dispatch(getAllSpaces());
  }, []);
  return (
    <div className="HomepageBlock">
      <div>
        <h1 className="Title-Homepage">Welcome in this new world !</h1>
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
                <Link to={`/spaces/${space.id}`}>
                  <button>Visit space</button>
                </Link>
              </div>
            ))
          : "Loading"}
      </div>
    </div>
  );
}
