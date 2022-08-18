import "./App.css";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  clearData,
  fetchData,
  incrementId,
  decrementId,
  customId,
} from "./features/dataSlice";
import { useEffect } from "react";

function App(props) {
  // your logic goes here!
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  const renderImage = () => {
    if (data.apiData) {
      return (
        <img
          src={data.apiData.primaryImage}
          alt={data.apiData.title}
          className="galleryImage"
        />
      );
    } else {
      return <p>Image goes here</p>;
    }
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [props.objectId, dispatch]);

  return (
    <div className="App">
      <div>
        <button
          onClick={() => {
            dispatch(fetchData());
          }}
        >
          Trigger Thunk
        </button>
        <button
          onClick={() => {
            dispatch(clearData());
          }}
        >
          Clear
        </button>
        <button
          onClick={() => {
            dispatch(incrementId());
          }}
        >
          Next
        </button>
        <button
          onClick={() => {
            dispatch(decrementId());
          }}
        >
          Back
        </button>
      </div>
      <input
        value={data.objectId}
        onChange={(e) => {
          dispatch(customId(Number(e.target.value)));
        }}
      />
      <div>
        {/* Once you have plugged everything in, render the image here! */}

        {renderImage()}
        <br />
        {data.apiData.title}
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  objectId: state.data.objectId,
});
export default connect(mapStateToProps)(App);
