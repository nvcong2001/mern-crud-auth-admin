import { create } from "zustand";
import type { AuthState } from "../types/store";
import { authService } from "../apis/authService";
import { message } from "antd";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  setAccessToken: (accessToken) => {
    set({ accessToken });
  },

  clearState: () => {
    set({ accessToken: null, user: null, loading: false });
  },

  signUp: async (username, password, email, firstName, lastName) => {
    try {
      set({ loading: true });

      //  gọi api
      await authService.signUp(username, password, email, firstName, lastName);

      message.success(
        "Đăng ký thành công! Bạn sẽ được chuyển sang trang đăng nhập.",
      );
    } catch (error) {
      console.error(error);
      message.error("Đăng ký không thành công");
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (username, password) => {
    try {
      set({ loading: true });

      const { accessToken } = await authService.signIn(username, password);
      get().setAccessToken(accessToken);

      await get().fetchMe();

      message.success("Chào mừng bạn quay lại với Moji 🎉");
    } catch (error) {
      console.error(error);
      message.error("Đăng nhập không thành công!");
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      await authService.signOut();
      get().clearState();
      message.success("Logout thành công!");
    } catch (error) {
      console.error(error);
      message.error("Lỗi xảy ra khi logout. Hãy thử lại!");
    }
  },

  fetchMe: async () => {
    try {
      set({ loading: true });
      const user = await authService.fetchMe();

      set({ user });
    } catch (error) {
      console.error(error);
      set({ user: null, accessToken: null });
      message.error("Lỗi xảy ra khi lấy dữ liệu người dùng. Hãy thử lại!");
    } finally {
      set({ loading: false });
    }
  },

  refresh: async () => {
    try {
      set({ loading: true });
      const { user, fetchMe, setAccessToken } = get();
      const accessToken = await authService.refresh();

      setAccessToken(accessToken);

      if (!user) {
        await fetchMe();
      }
    } catch (error: any) {
      const status = error?.response?.status;
    
      if (status === 401 ) {
        get().clearState();
        return;
      }
      if (status === 403) {
        message.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
        get().clearState();
        return;
      }
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      set({ loading: false });
    }
  },
}));
