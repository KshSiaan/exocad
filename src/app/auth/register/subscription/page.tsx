"use client";

import { Check } from "lucide-react";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCompleteDataStore } from "@/store/register";
import { useQuery } from "@tanstack/react-query";
import { howl } from "@/lib/api";
import { useState } from "react";
import { useRegister, useVerifyOtp } from "@/hooks/api/use-auth";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
const outfit = Outfit({ subsets: ["latin"] });

type Plan = {
  id: number;
  plan_name: string;
  duration: string;
  price: string;
  discount: number;
  features: string[];
  status: string;
  is_enabled: number;
  created_at: string;
  updated_at: string;
  final_price: string;
};

function PlanCard({ plan, onSelect }: { plan: Plan; onSelect: () => void }) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-7 flex flex-col transition-all",
        // dark
        //   ? "bg-white border-2 border-primary/60 z-10 shadow-xl shadow-primary/10"
        // :
        "bg-white border border-gray-200/80 hover:border-gray-300 hover:shadow-md",
      )}
    >
      {Number(plan.price) > 0 && (
        <div className="absolute top-[13px] -right-2 z-10">
          <span className="bg-primary text-foreground text-[11px] font-bold px-3.5 py-1 rounded-tr-xl rounded-l-lg whitespace-nowrap">
            Most Popular
          </span>
          <div className="absolute top-[24px] w-2 h-1.5 right-0 rounded-br-2xl -z-10 bg-[#1e7973]" />
        </div>
      )}

      <div className="mb-3">
        <h3 className="font-bold text-[1.05rem] text-gray-900">
          {plan.plan_name}
        </h3>
        {/* <p className="text-[12px] mt-1 leading-snug text-gray-400">
          {plan.tagline}
        </p> */}
      </div>

      <div className="flex items-baseline gap-0.5 mb-5">
        <span className="text-[2.8rem] font-bold leading-none text-gray-900">
          ${plan.price}
        </span>
        <span className="text-[13px] ml-1 text-gray-400">{plan.duration}</span>
      </div>

      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "w-full py-2.5 rounded-lg text-[13px] font-semibold transition-colors mb-6",
          Number(plan.price) > 0
            ? "bg-primary text-foreground hover:bg-[#3dbdb4]"
            : "bg-[#0d0d1a] text-white border border-gray-800 hover:bg-black",
        )}
      >
        Get {plan.plan_name}
      </button>

      <div className="border-t border-gray-100 pt-5 flex-1">
        <p className="text-[11px] font-semibold mb-3.5 uppercase tracking-wide text-gray-400">
          What you will get
        </p>
        <ul className="space-y-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <Check size={13} className="text-primary shrink-0 mt-0.5" />
              <span className="text-[12.5px] leading-snug text-gray-600">
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function SubscriptionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const { mutate: registerMutate, isPending: isRegistering } = useRegister();
  const [otp, setOtp] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const { mutate: verifyOtpMutate, isPending: isVerifyingOtp } = useVerifyOtp();
  const { data, isPending } = useQuery({
    queryKey: ["get_subs"],
    queryFn: async (): Promise<{
      status: boolean;
      message: string;
      data: Array<{
        id: number;
        plan_name: string;
        duration: string;
        price: string;
        discount: number;
        features: Array<string>;
        status: string;
        is_enabled: number;
        created_at: string;
        updated_at: string;
        final_price: string;
      }>;
    }> => {
      return howl("/get-subscriptions");
    },
  });
  const { completeData } = useCompleteDataStore();
  const navig = useRouter();
  const role = searchParams.get("role") ?? "dentist";
  const handleSelect = (planId: string) => {
    setSelectedPlanId(planId);
    registerMutate(
      { ...completeData, subscription_id: planId },
      {
        onSuccess: (response) => {
          toast.success(response?.message || "Registration successful!");
          console.log("Registration successful:", response);
          console.log("OTP:", response.data.otp);
          setOtpDialogOpen(true);
          // Handle success (e.g., redirect to login page or show a success message)
        },
        onError: (error) => {
          console.error("Registration failed:", error);
          toast.error("Registration failed. Please try again.");
          // Handle error (e.g., show an error message)
        },
      },
    );
  };
  const handleVerifyOtp = () => {
    // Implement OTP verification logic here
    if (!selectedPlanId) {
      toast.error("No plan selected. Please select a plan first.");
      return;
    }
    console.log("Verifying OTP:", otp);
    verifyOtpMutate(
      { subscription_id: selectedPlanId ?? "", otp },
      {
        onSuccess: (response) => {
          toast.success(response?.message || "OTP verified successfully!");
          console.log("OTP verified successfully:", response);
          // Handle success (e.g., redirect to login page or show a success message)
          navig.push("/auth/login");
        },
        onError: (error) => {
          console.error("OTP verification failed:", error);
          toast.error("OTP verification failed. Please try again.");
          // Handle error (e.g., show an error message)
        },
      },
    );
    // For demonstration, we'll just close the dialog
    setOtpDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between max-w-[1280px] mx-auto w-full">
        <Link href="/">
          <span
            className={cn("text-xl font-bold text-gray-900", outfit.className)}
          >
            exo connect
          </span>
        </Link>
        <span className="text-xs text-gray-400">
          Step 2 of 3 — Choose your plan
        </span>
      </header>

      <main className="flex-1 py-16 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-3">
              ✦ Subscription
            </p>
            <h1
              className={cn(
                "text-[2rem] sm:text-4xl font-bold text-gray-900 leading-tight",
                outfit.className,
              )}
            >
              Choose your plan
            </h1>
            <p className="text-gray-500 mt-3 text-[13.5px]">
              {role === "designer"
                ? "Unlock more leads, visibility, and tools as you grow."
                : "Pick the plan that fits your practice size and needs."}
            </p>
          </div>
          {isPending ? (
            <div className="h-24 w-full flex justify-center items-center">
              Loading...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start max-w-sm mx-auto md:max-w-none">
              {data?.data?.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onSelect={() => handleSelect(plan.id.toString())}
                />
              ))}
            </div>
          )}

          <p className="text-center text-xs text-gray-400 mt-10">
            No commitment — cancel anytime. All plans include a 14-day free
            trial.
          </p>
        </div>
      </main>
      <Dialog open={otpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Your Account</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please check your email and enter the OTP from your email to
              complete your registration.
            </p>
            <div className="flex justify-center items-center">
              <InputOTP maxLength={6} value={otp} onChange={(e) => setOtp(e)}>
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          <DialogFooter>
            <Button
              size="lg"
              onClick={handleVerifyOtp}
              disabled={isVerifyingOtp || isRegistering}
            >
              Verify Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
