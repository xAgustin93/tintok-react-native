import { ENV } from "../utils";
import { size } from "lodash";

export class Follow {
  async getFollowedsCount(token, idUser) {
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.FOLLOWEDS_COUNT}/${idUser}/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;
    return result.count;
  }

  async getFollowersCount(token, idUser) {
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.FOLLOWERS_COUNT}/${idUser}/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;
    return result.count;
  }

  async isFollowing(token, idUser, idUserFollowed) {
    const filter = `user=${idUser}&user_followed=${idUserFollowed}`;
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.FOLLOW}/?${filter}`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;

    if (size(result) === 0) return false;

    return true;
  }

  async follow(token, idUser, idUserFollowed) {
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.FOLLOW}/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user: idUser,
        user_followed: idUserFollowed,
      }),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 201) throw result;
    return result;
  }

  async deleteFollow(token, idFollow) {
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.FOLLOW}/${idFollow}/`;
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

  async getFollowing(token, idUser, idUserFollowed) {
    const filter = `user=${idUser}&user_followed=${idUserFollowed}`;
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.FOLLOW}/?${filter}`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;
    return result[0];
  }

  async getFolloweds(token, idUser) {
    const filter = `user=${idUser}`;
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.FOLLOW}/?${filter}`;
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

  async getFollowers(token, idUser) {
    const filter = `user_followed=${idUser}`;
    const url = `${ENV.BASE_API}/${ENV.API_ROUTES.FOLLOW}/?${filter}`;
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
}
