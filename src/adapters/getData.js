import axios from "axios";

export const fetchUser = async (token) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const user = {
      name: response.data.display_name,
      id: response.data.id,
      image: response.data.images,
    };
    return user;
  } catch (error) {
    console.log(error);
  }
};
export const fetchPlaylists = async (token) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data.items?.map(({ name, id }) => {
      return { name, id };
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchPlaylist = async (token, playlist) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlist}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const playlistData = {
      id: response.data.id,
      image: response.data.images[0],
      isPublic: response.data.public,
      name: response.data.name,
      description: response.data.description,
      uri: response.data.uri,
      owner: response.data.owner.display_name,
      tracks: response.data.tracks.items.map((item) => ({
        id: item.track.id,
        name: item.track.name,
        isExplicit: item.track.explicit,
        track_uri: item.track.uri,
        addedOn: item.added_at,
        color: item.primary_color,
        album: item.track.album.name,
        image: item.track.album.images[0],
        duration: item.track.duration_ms,
        artist: item.track.artists.map((artiste) => artiste.name),
      })),
    };
    return playlistData;
  } catch (error) {
    console.log(error);
  }
};
export const featuredPlaylists = async (token) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/browse/featured-playlists",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.playlists.items;
  } catch (error) {
    console.log(error);
  }
};
export const userTopItems = async (token, type) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/${type}`,

      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.log(error);
  }
};
export const newReleases = async (token) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases",

      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.albums.items;
  } catch (error) {
    console.log(error);
  }
};
export const recentPlayed = async (token) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played",

      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response.data);
    return response.data.items;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCurrentlyPlaying = async (token) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.item !== null) {
      const { item } = response.data;
      const currentlyPlaying = {
        id: item.id,
        name: item.name,
        artistes: item.artists.map((artiste) => artiste.name),
        duration: item.duration_ms,
        image: item.album.images[0].url,
        uri: response.data.context.uri,
        track_uri: response.data.item.uri,
        progress_ms: response.data.progress_ms,
      };
      console.log(response.data);
      return currentlyPlaying;
    } else return {};
  } catch (error) {
    console.log(error);
  }
};
export const fetchMusixMatchTrack = async (artist, track) => {
  try {
    const response = await axios.get(
      `https://cors-errors.vercel.app/track?artist=${artist}&track=${track}`
    );
    const trackDetails = {
      track_id: response.data.message.body.track_list[0].track.track_id,
      commontrack_id:
        response.data.message.body.track_list[0].track.commontrack_id,
    };
    return trackDetails;
  } catch (error) {
    console.log(error);
  }
};
export const fetchMusixMatchTrackLyrics = async (track_id, commontrack_id) => {
  try {
    const response = await axios.get(
      `https://cors-errors.vercel.app/lyrics?track_id=${track_id}`
    );
    let n = response.data.message.body.lyrics.lyrics_id;
    const data = {
      lyrics: response.data.message.body.lyrics.lyrics_body,
      id: n,
    };
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchCurrentlyPlayingProgress = async (token) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data !== "") {
      return response.data.progress_ms;
    } else return null;
  } catch (error) {
    console.log(error);
  }
};
export const fetchPlayerState = async (token) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/me/player", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    if (response.data !== "") {
      const playerState = {
        isPlaying: response.data.is_playing,
        volume: response.data.device.volume_percent,
      };

      return playerState;
    } else {
      const playerState = {
        isPlaying: false,
        volume: 10,
      };

      return playerState;
    }
  } catch (error) {
    console.log(error);
  }
};
export const fetchCategories = async (token) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/browse/categories?limit=50&offset=1",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data.categories.items?.map(({ name, id, icons }) => {
      return { name, id, icons };
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchCategoryItem = async (token, id) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data.playlists.items?.map(
      ({ name, id, description, images, uri }) => {
        return { name, id, description, images, uri };
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const searchQuery = async (token, value) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${value}&type=album,artist,playlist,track,show,episode&include_external=audio&limit=15`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    const album = data.albums.items.map(
      ({ artists, id, images, name, release_date, type, uri }) => {
        return {
          artists,
          id,
          images,
          name,
          release_date,
          type,
          uri,
        };
      }
    );
    const artists = data.artists.items.map(
      ({ id, images, name, popularity, type, uri }) => {
        return {
          id,
          images,
          name,
          popularity,
          type,
          uri,
        };
      }
    );
    const playlists = data.playlists.items.map(
      ({ id, images, name, owner, type, uri }) => {
        return {
          id,
          images,
          name,
          owner,
          type,
          uri,
        };
      }
    );
    const episodes = data.episodes.items.map(
      ({ id, images, name, description, release_date, duration_ms, type }) => {
        return {
          id,
          images,
          name,
          description,
          release_date,
          duration_ms,
          type,
        };
      }
    );
    const shows = data.shows.items.map(
      ({ id, images, name, description, publisher, total_episodes, type }) => {
        return {
          id,
          images,
          name,
          description,
          publisher,
          total_episodes,
          type,
        };
      }
    );
    const tracks = data.tracks.items.map(
      ({ id, album, name, popularity, duration_ms, artists, type, uri }) => {
        return {
          id,
          album,
          name,
          popularity,
          duration_ms,
          artists,
          type,
          uri,
        };
      }
    );

    const searchResult = { album, artists, playlists, episodes, shows, tracks };
    return searchResult;
  } catch (error) {
    console.log(error);
  }
};
