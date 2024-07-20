import { makeAutoObservable, runInAction } from "mobx";
import loginService from "../services/login.service";
import registerService from "../services/register.service";
import exitService from "../services/exit.service";
import refreshService from "../services/refresh.service";

export default class Store {
  profiles = {};
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  SetAuth(bool) {
    this.isAuth = bool;
  }
  setProfiles(profile) {
    this.profile = profile;
  }
  setLoading(bool) {
    this.isLoading = bool;
  }
  async login(login, password) {
    try {
      const response = await loginService.login(login, password);
      // console.log("Login_Data", response);
      localStorage.setItem("token", response.accessToken);
      this.SetAuth(true);
      this.setProfiles(response.profiles);
    } catch (error) {
      console.log(error);
      console.log(error.response?.data?.message);
    }
  }
  async registration(login, password) {
    try {
      const response = await registerService.registration(login, password);
      // console.log("Reg_Data", response);
      localStorage.setItem("token", response.accessToken);
      this.SetAuth(true);
      this.setProfiles(response.profiles);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }
  async logout() {
    try {
      const response = await exitService.logout();
      // console.log("LOgout_Data", response);
      localStorage.removeItem("token");
      this.SetAuth(false);
      this.setProfiles({});
    } catch (error) {
      console.log(error);
      console.log(error.response?.data?.message);
    }
  }
  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await refreshService.refresh();
      runInAction(() => {
        // console.log("responseChechAuth", response);
        localStorage.setItem("token", response.accessToken);
        this.SetAuth(true);
        this.setProfiles(response.profiles);
      });
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  }
}
