import { howl } from "@/lib/api";
import type { LoginResponse, LoginPayload, RegisterPayload, RegisterResponse } from "@/types/auth.types";
import type { ApiResponse } from "@/types/base";



export const authService = {
  register: (payload: RegisterPayload) =>
    howl<ApiResponse<RegisterResponse>>("/register", { method: "POST", body: payload }),

  login: (payload: LoginPayload) =>
    howl<ApiResponse<LoginResponse>>("/login", { method: "POST", body: payload }),
};
