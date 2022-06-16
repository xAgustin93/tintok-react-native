import { Platform } from "react-native";
import { ENV } from "../utils";

export class Video {
  async create(token, data, idUser) {
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("user", idUser);

    const videoType = data.videoUri.substr(data.videoUri.lastIndexOf(".") + 1);
    formData.append("video", {
      name: `video.${videoType}`,
      type: videoType,
      uri:
        Platform.OS === "ios"
          ? data.videoUri.replace("file://", "")
          : data.videoUri,
    });

    const imageType = data.imageUri.substr(data.imageUri.lastIndexOf(".") + 1);
    formData.append("image", {
      name: `image.${imageType}`,
      type: imageType,
      uri:
        Platform.OS === "ios"
          ? data.imageUri.replace("file://", "")
          : data.imageUri,
    });

    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.VIDEO}/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 201) throw result;
    return result;
  }

  async getAllVideos(token) {
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.VIDEO}/`;
    const params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;
    return result;
  }

  async shareVideo(token, idVideo, total) {
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.VIDEO_ACTIONS}/${idVideo}/`;

    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ share_counter: total }),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;
    return result;
  }

  async isLike(token, idVideo, idUser) {
    const filter = `user=${idUser}&video=${idVideo}`;
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.VIDEO_LIKE}/?${filter}`;

    const params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;

    if (result.length > 0) return true;
    return false;
  }

  async createLike(token, idVideo, idUser) {
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.VIDEO_LIKE}/`;

    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user: idUser, video: idVideo }),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 201) throw result;
    return result;
  }

  async updateLikes(token, idVideo, likes) {
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.VIDEO_ACTIONS}/${idVideo}/`;

    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ likes_counter: likes }),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;
    return result;
  }

  async getLike(token, idVideo, idUser) {
    const filter = `user=${idUser}&video=${idVideo}`;
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.VIDEO_LIKE}/?${filter}`;

    const params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;
    return result[0];
  }

  async deleteLike(token, idLike) {
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.VIDEO_LIKE}/${idLike}/`;

    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);

    if (response.status !== 204) throw "Error...";
    return true;
  }

  async getVideosUser(token, idUser) {
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.VIDEO}/?user=${idUser}`;
    const params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;
    return result;
  }

  async getVideosFavoritesUser(token, idUser) {
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.VIDEO_LIKE}/?user=${idUser}`;
    const params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;
    return result;
  }

  async getFollowingsVideos(token) {
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.FOLLOWINGS_VIDEOS}/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;
    return result;
  }

  async getVideoById(token, idVideo) {
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.VIDEO}/${idVideo}/`;
    const params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;
    return result;
  }
}
