"use client";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Sparkles } from "lucide-react";
import api from "@/network/client";
import { toast } from "sonner";
import { buildToastMessage } from "@/lib/catchAsync";
import AddLedgerOverview from "./add-ledger-overview";
import AddLedgerFinance from "./add-ledger-finance";
import AddLedgerLines from "./add-ledger-lines";
import AddLedgerMeta from "./add-ledger-meta";
import { ledgerCreation, LedgerCreationInput } from "../schemas/create";
import { buildLedgerRequestBody } from "../helpers";
import { LEDGER_STAGE_FIELDS } from "../config";
import useRevalidate from "@/hooks/useRevalidate";

export default function AddLedger() {
  return (
    <Dialog>
      <DialogTrigger>
        <span className={buttonVariants({ variant: "default", size: "sm" })}>
          <BookOpen className="h-4 w-4 mr-2" />
          Create Ledger
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px] p-0 rounded-none border gap-0 overflow-hidden">
        <FormContainer />
      </DialogContent>
    </Dialog>
  );
}

function FormContainer() {
  const [currentStage, setCurrentStage] = useState(0);

  const form = useForm<LedgerCreationInput>({
    resolver: zodResolver(ledgerCreation as any),
    mode: "all",
    defaultValues: {
      property: "",
      unit: "",
      tenant: "",
      lease: "",
      vendor: "",
      entryType: "Rent Charge",
      memo: "",
      finance: {
        currency: "INR",
        totalAmount: "0",
        paymentGateway: "RAZORPAY",
      },
      lines: [
        {
          accountId: "RENT",
          accountName: "Rental income",
          type: "DEBIT",
          amount: "0",
          description: "",
        },
      ],
      reference: {},
      status: "Posted",
    },
  });

  const nextStep = async () => {
    const fieldsToValidate = LEDGER_STAGE_FIELDS[currentStage];
    const isStageValid = await form.trigger(fieldsToValidate);
    if (isStageValid) {
      setCurrentStage((prev) => Math.min(prev + 1, 3));
    }
  };

  const previousStep = () => {
    setCurrentStage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div>
      <DialogHeader className="p-5 border-b bg-muted/20">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Create Ledger Entry
          </DialogTitle>
          <Badge variant="outline" className="font-mono text-[11px] rounded-none">
            Stage {currentStage + 1} of 4
          </Badge>
        </div>
        <DialogDescription className="text-xs text-muted-foreground mt-1">
          Record the entry overview, financial details, transaction lines, and final status.
        </DialogDescription>
      </DialogHeader>

      <div className="p-6 max-h-[60vh] overflow-y-auto">
        <RenderStage
          currentStage={currentStage}
          nextStep={nextStep}
          previousStep={previousStep}
          form={form as any}
        />
      </div>
    </div>
  );
}

function RenderStage({
  currentStage,
  nextStep,
  previousStep,
  form,
}: {
  currentStage: number;
  nextStep: () => void;
  previousStep: () => void;
  form: UseFormReturn<LedgerCreationInput>;
}) {
  const { update } = useRevalidate({ groupedInstant: ["/api/v1/ledger"] });

  const onSubmit = async function () {
    try {
      console.log("condition hit")
      const data: LedgerCreationInput = form.getValues();
      const payload = buildLedgerRequestBody(data);
      const response = await api.post("/api/v1/ledger/entries", {
        body: payload as any,
      });
      if (response.code !== 200) throw new Error(response.message);
      toast.success(response.message || "Successful");
      update();
    } catch (error) {
      toast.error(buildToastMessage(error));
    }
  };

  switch (currentStage) {
    case 0:
      return <AddLedgerOverview nextStep={nextStep} form={form} />;
    case 1:
      return (
        <AddLedgerFinance
          previousStep={previousStep}
          nextStep={nextStep}
          form={form}
        />
      );
    case 2:
      return (
        <AddLedgerLines
          previousStep={previousStep}
          nextStep={nextStep}
          form={form}
        />
      );
    case 3:
      return (
        <AddLedgerMeta
          previousStep={previousStep}
          form={form}
          onSubmit={onSubmit}
        />
      );
    default:
      return null;
  }
}