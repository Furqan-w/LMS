import { makeAutoObservable } from "mobx";

class AuthStore {
  user: any = null;

  constructor() {
    makeAutoObservable(this);

    // 🔹 Rehydrate from sessionStorage on app load
    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    }
  }

  setUser(user: any) {
    this.user = user;

    // 🔹 Persist automatically
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  updateName(newName: string) {
    if (this.user) {
      this.user.name = newName;

      // 🔹 Keep storage in sync
      sessionStorage.setItem("user", JSON.stringify(this.user));
    }
  }

  logout() {
    this.user = null;
    sessionStorage.removeItem("user");
  }
}

export const authStore = new AuthStore();
