import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, usernameSelector } from "../../redux/store";

export default function NamePanel() {
  const [user, setUser] = useState(useSelector(usernameSelector));
  const dispatch = useDispatch();

  const acceptUser = (e) => {
    e.preventDefault();
    dispatch(setUsername(user));
  };

  return (
    <form className="panel" onSubmit={acceptUser}>
      <h2>Enter Username</h2>
      <div className="form-row">
        <input
          type="text"
          maxLength="32"
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
        <button type="submit" disabled={user?.length < 4}>
          Ok
        </button>
      </div>
    </form>
  );
}
