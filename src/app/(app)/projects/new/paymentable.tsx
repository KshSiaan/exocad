import { CreditCard, FileText, FolderOpen, Wallet } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { base_api, base_url, howl } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function Paymentable({
  dataset,
}: {
  dataset: {
    title: string;
    caseNotes: string;
    serviceID: number | null;
    serviceName: string | null;
    servicePrice: string | null;
    selectedDesigner: number | null;
    selectedFiles: File[] | null;
  };
}) {
  const qcl = useQueryClient();
  const navig = useRouter();
  const [{ token }] = useCookies(["token"]);
  const { data, isPending, isError } = useQuery({
    queryKey: ["check_paymentType", dataset.servicePrice],
    queryFn: async (): Promise<{
      status: boolean;
      message: string;
      data: {
        wallet_balance: number;
        payment_type: string;
        payable_amount: number;
        wallet_applied: number;
        service_price: number;
      };
    }> => {
      return howl(
        `/dentist/check-payment-type?service_price=${dataset.servicePrice}`,
      );
    },
    enabled: !!dataset.servicePrice,
  });

  const {
    mutate: createStripeSuccessProject,
    isPending: isCreatingStripeSuccessProject,
  } = useMutation({
    mutationKey: ["creatingStripeSuccessProject"],
    mutationFn: async (formData: FormData) => {
      const res = await fetch(
        `${base_url}${base_api}/dentist/stripe-pay-success`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
          body: formData,
        },
      );
      return res.json();
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: any) => {
      qcl.invalidateQueries({ queryKey: ["projects"] });
      navig.push("/projects");
      toast.success(res.message ?? "Success!");
    },
  });

  const {
    mutate: createWalletSuccessProject,
    isPending: isCreatingWalletSuccessProject,
  } = useMutation({
    mutationKey: ["creatingWalletSuccessProject"],
    mutationFn: async (formData: FormData) => {
      const res = await fetch(
        `${base_url}${base_api}/dentist/wallet-pay-success`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
          body: formData,
        },
      );
      return res.json();
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: any) => {
      qcl.invalidateQueries({ queryKey: ["projects"] });
      navig.push("/projects");
      toast.success(res.message ?? "Success!");
    },
  });

  const { mutate: paying, isPending: isPaying } = useMutation({
    mutationKey: ["payement_intent"],
    mutationFn: (): Promise<{
      status: boolean;
      message: string;
      payment_status: string;
      data: {
        id: string;
        object: string;
        allowed_payment_method_types: any;
        amount: number;
        amount_capturable: number;
        amount_details: {
          tip: Array<any>;
        };
        amount_received: number;
        application: any;
        application_fee_amount: any;
        automatic_payment_methods: any;
        canceled_at: any;
        cancellation_reason: any;
        capture_method: string;
        client_secret: string;
        confirmation_method: string;
        created: number;
        currency: string;
        customer: any;
        customer_account: any;
        description: any;
        excluded_payment_method_types: any;
        last_payment_error: any;
        latest_charge: string;
        livemode: boolean;
        managed_payments: {
          enabled: boolean;
        };
        metadata: {
          user_id: string;
        };
        next_action: any;
        on_behalf_of: any;
        payment_method: string;
        payment_method_configuration_details: any;
        payment_method_options: {
          card: {
            installments: any;
            mandate_options: any;
            network: any;
            request_three_d_secure: string;
          };
        };
        payment_method_types: Array<string>;
        processing: any;
        receipt_email: any;
        review: any;
        setup_future_usage: any;
        shared_payment_granted_token: any;
        shipping: any;
        source: any;
        statement_descriptor: any;
        statement_descriptor_suffix: any;
        status: string;
        transfer_data: any;
        transfer_group: any;
      };
    }> => {
      return howl(`/dentist/payment-intent`, {
        method: "POST",
        body: {
          amount: dataset.servicePrice,
          payment_method_types: "card",
        },
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      const formData = new FormData();
      formData.append("payment_intent_id", res.data.id);
      formData.append("project_title", dataset.title);
      formData.append("project_description", dataset.caseNotes);
      formData.append(
        "designer_id",
        dataset.selectedDesigner?.toString() ?? "",
      );
      formData.append("service_name", dataset.serviceName ?? "");
      formData.append("service_id", dataset.serviceID?.toString() ?? "");
      formData.append("service_price", dataset.servicePrice ?? "");
      if (Number(data?.data?.wallet_balance) > 0) {
        formData.append("payment_type", "partial_pay");
        formData.append(
          "wallet_applied",
          Number(data?.data?.wallet_applied).toString(),
        );
      } else {
        formData.append("payment_type", "stripe_pay");
      }
      for (let i = 0; i < (dataset.selectedFiles?.length ?? 0); i++) {
        const file = dataset.selectedFiles![i];
        formData.append(`dentist_scan_files[${i}]`, file);
      }

      createStripeSuccessProject(formData);
    },
  });

  const handleSubmit = async () => {
    if (!data?.data) {
      toast.error("Payment data is not available.");
      return;
    }

    if (data.data.payment_type === "card_pay") {
      paying();
    } else {
      const formData = new FormData();
      formData.append("project_title", dataset.title);
      formData.append("project_description", dataset.caseNotes);
      formData.append(
        "designer_id",
        dataset.selectedDesigner?.toString() ?? "",
      );
      formData.append("service_name", dataset.serviceName ?? "");
      formData.append("service_id", dataset.serviceID?.toString() ?? "");
      formData.append("service_price", dataset.servicePrice ?? "");
      formData.append("payment_type", "wallet_pay");
      for (let i = 0; i < (dataset.selectedFiles?.length ?? 0); i++) {
        const file = dataset.selectedFiles![i];
        formData.append(`dentist_scan_files[${i}]`, file);
      }
      createWalletSuccessProject(formData);
    }
  };

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16">
        <Spinner />
        <p className="text-sm text-muted-foreground">Calculating payment...</p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="font-medium">Unable to calculate payment.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Please refresh and try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  const payment = data.data;

  const paymentConfig = {
    wallet_pay: {
      badge: "Wallet",
      title: "Wallet Payment",
      description: "Your wallet balance covers the full payment.",
      button: "Pay from Wallet",
    },
    card_pay: {
      badge: "Card",
      title: "Card Payment",
      description:
        "Your wallet balance is insufficient. Continue with card payment.",
      button: "Continue to Card",
    },
    mixed_pay: {
      badge: "Wallet + Card",
      title: "Split Payment",
      description:
        "Your wallet balance will be used first. The remaining amount will be charged to your card.",
      button: "Continue to Payment",
    },
  } as const;

  const current = paymentConfig[
    payment.payment_type as keyof typeof paymentConfig
  ] ?? {
    badge: "Payment",
    title: "Payment",
    description: "",
    button: "Continue",
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Payment Summary</h2>
        <p className="text-muted-foreground mt-1">
          Review your project before completing payment.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="flex items-start gap-3">
            <FolderOpen className="size-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Project Title</p>
              <p className="font-medium">
                {dataset.title || "Untitled Project"}
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex items-start gap-3">
            <CreditCard className="size-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Service</p>
              <p className="font-medium">
                {dataset.serviceName ?? "Unknown Service"}
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex items-start gap-3">
            <FileText className="size-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Uploaded Files</p>
              <p className="font-medium">
                {dataset.selectedFiles?.length ?? 0}{" "}
                {dataset.selectedFiles?.length === 1 ? "file" : "files"}
              </p>
            </div>
          </div>

          {dataset.caseNotes?.trim() && (
            <>
              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-2">Case Notes</p>

                <div className="rounded-lg bg-muted p-4 text-sm leading-relaxed">
                  {dataset.caseNotes}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Payment Details</CardTitle>

          <Badge>{current.badge}</Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service Price</span>
            <span className="font-medium">
              ${payment.service_price.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Wallet Balance</span>
            <span className="font-medium">
              ${payment.wallet_balance.toFixed(2)}
            </span>
          </div>

          {payment.wallet_applied > 0 && (
            <div className="flex justify-between text-green-600 font-medium">
              <span>Wallet Applied</span>
              <span>-${payment.wallet_applied.toFixed(2)}</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between text-lg font-semibold">
            <span>Amount to Pay</span>

            <span>${payment.payable_amount.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20">
        <CardContent className="py-6">
          <div className="flex gap-4">
            <Wallet className="size-10 text-primary shrink-0" />

            <div>
              <h3 className="font-semibold">{current.title}</h3>

              <p className="text-sm text-muted-foreground mt-1">
                {current.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        className="w-full h-12 text-base"
        onClick={handleSubmit}
        disabled={
          isPaying ||
          isCreatingStripeSuccessProject ||
          isCreatingWalletSuccessProject
        }
      >
        {current.button}
      </Button>
    </div>
  );
}
