import { makeAutoObservable, runInAction } from "mobx";
import loginService from "../services/login.service";
import registerService from "../services/register.service";
import exitService from "../services/exit.service";
import refreshService from "../services/refresh.service";
import { toast } from "react-toastify";

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
      localStorage.setItem("token", response.accessToken);
      this.SetAuth(true);
      this.setProfiles(response.profiles);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }
  async registration(login, password) {
    try {
      const response = await registerService.registration(login, password);
      localStorage.setItem("token", response.accessToken);
      this.SetAuth(true);
      this.setProfiles(response.profiles);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }
  async logout() {
    try {
      await exitService.logout();
      localStorage.removeItem("token");
      this.SetAuth(false);
      this.setProfiles({});
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  }
  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await refreshService.refresh();
      runInAction(() => {
        localStorage.setItem("token", response.accessToken);
        this.SetAuth(true);
        this.setProfiles(response.profiles);
      });
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message);
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  }
}
