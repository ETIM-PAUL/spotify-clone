import React, { useEffect } from "react";
import { fetchPlaylists } from "../../adapters/getData";
import { useSpotify } from "../../context/SpotifyContext";
import { NavLink } from "react-router-dom";

const SideBarPlaylists = () => {
  const { state, dispatch } = useSpotify();

  const { playlists } = state;

  useEffect(() => {
    fetchPlaylists(state.token).then((response) =>
      dispatch({ type: "setPlaylists", payload: response })
    );
  }, [dispatch, state.token]);

  return (
    <div className="text-[gray] mt-3 h-60 overflow-y-scroll">
      <ul>
        {playlists.map(({ name, id }) => {
          return (
            <NavLink
              to={`/playlist/${id}`}
              key={id}
              style={({ isActive }) => ({ color: isActive ? "white" : "gray" })}
            >
              <li
                onClick={() => {
                  dispatch({ type: "setPlaylist", payload: id });
                  dispatch({ type: "setCategory", payload: null });
                }}
                className="text-[14px] hover:text-[#fff] hover:cursor-default py-2 font-medium font-sans truncate"
              >
                {name}
              </li>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBarPlaylists;
