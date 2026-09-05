import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { buildToastMessage } from "@/lib/catchAsync";
import { ENV } from "@/config/envVars";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const stripePromise = (stripeKeyId?: string) => loadStripe(stripeKeyId || ENV.STRIPE_PUBLISHABLE_KEY!);

interface CreateStripeOrderProps {
  order: {
    clientSecret: string | null,
    stripeKeyId: string
  };
  triggerOnLoad?: boolean;
  onSuccess?: () => void;
  onClose?: () => void;
}

export default function CreateStripeOrder({
  order: {
    clientSecret,
    stripeKeyId
  },
  triggerOnLoad = false,
  onClose,
}: CreateStripeOrderProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (clientSecret && triggerOnLoad) {
      setIsOpen(true);
    }
  }, [clientSecret, triggerOnLoad]);

  const handleOpen = function () {
    if (!clientSecret) {
      toast.error(buildToastMessage(new Error("Missing Stripe client secret")));
      return;
    }
    setIsOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && typeof onClose === "function") {
      onClose();
    }
  };

  if (!clientSecret) {
    return null;
  }

  return (
    <>
      <Button
        type="button"
        className={cn("rounded-none shadow-none min-w-[140px]", triggerOnLoad && "hidden")}
        onClick={handleOpen}
      >
        Pay Now
      </Button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="!max-w-5xl w-full max-h-[90vh] overflow-y-auto !p-0 border border-border rounded-none shadow-none">
          <DialogClose className="absolute top-4 right-4 z-100 text-secondary">
            <X />
          </DialogClose>
          <EmbeddedCheckoutProvider
            stripe={stripePromise(stripeKeyId)}
            options={{ clientSecret }}
          >
            <div className="p-4 bg-white">
            <EmbeddedCheckout />
            </div>
          </EmbeddedCheckoutProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}