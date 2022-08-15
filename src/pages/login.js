import React from "react";

const SpotifyLogin = () => {
  return (
    <div className="bg-[#000] w-auto h-[100vh] overflow-hidden grid">
      <div className="relative block mt-[8rem] m-auto">
        <img
          src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg"
          alt="Spotify logo"
          className="w-auto h-[200px] md:h-[250px] "
        />
        <div className="flex justify-center">
          <button className="uppercase text-[#fff] bg-[#32b954] py-2 px-3 rounded-[20px] text-[12px] mt-[12rem]">
            Login with Spotify
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotifyLogin;
