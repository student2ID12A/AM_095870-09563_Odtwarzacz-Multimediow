// api/client.js

import { API_BASE } from "./config";

async function handle(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export const api = {
  async findUser(login, password) {
    console.log("API: findUser →", login, password);
    const res = await fetch(
      `${API_BASE}/users?login=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}`
    );
    console.log("API: STATUS →", res.status);
    return handle(res);
  },

  async userExists(login) {
    console.log("API: userExists →", login);
    const res = await fetch(
      `${API_BASE}/users?login=${encodeURIComponent(login)}`
    );
    console.log("API: STATUS →", res.status);
    const data = await handle(res);
    console.log("API: userExists RESPONSE →", data);
    return data.length > 0;
  },

  async registerUser(login, password) {
    console.log("API: registerUser →", login, password);
    const res = await fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });
    console.log("API: STATUS →", res.status);
    return handle(res);
  },
};
