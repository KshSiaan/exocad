"use client";
import { authService } from "@/services/auth.service";
import type { RegisterPayload } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
export function useRegister() {
    return useMutation({
        mutationKey: ["register"],
        mutationFn: (payload: RegisterPayload) => authService.register(payload),
    });
}

export function useLogin() {
    const navig = useRouter()
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (payload: { email: string; password: string }) =>
      authService.login(payload),
    onSuccess: (response) => {
      //set cookie with "token"
          // biome-ignore lint/suspicious/noDocumentCookie: <explanation>
          document.cookie = `token=${response.data.token}; path=/; max-age=${response.data.expires_in};`;
          if(response.data?.user?.role === "DESIGNER"){
            navig.push("/designer/dashboard")
          }else if(response.data?.user?.role === "DENTIST"){
            navig.push("/dashboard")
          }else if(response.data?.user?.role === "ADMIN"){
            navig.push("/admin")
          }
    }
  })
}

export function useVerifyOtp() {
  return useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: (payload: { subscription_id: string; otp: string }) =>
      authService.verifyOtp(payload),
  });
}