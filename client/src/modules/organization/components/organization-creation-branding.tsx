import { useForm, UseFormReturn } from "react-hook-form";
import { organizationBrandingSchema, OrganizationInput } from "../schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Palette, Mail, Image as ImageIcon } from "lucide-react";
import ImageUpload from "@/modules/file-upload/components/image-upload";
import { copyText } from "@/lib/helpers";

export default function OrganizationCreationBranding({
  form: defaultForm,
  prevStep,
  nextStep,
  onSubmit,
}: {
  form: UseFormReturn<OrganizationInput>,
  prevStep?: () => void,
  nextStep: () => void,
  onSubmit?: (values: any) => void
}) {
  const defaultValues = useMemo(() => defaultForm.getValues(), [defaultForm]);

  const form = useForm({
    resolver: zodResolver(organizationBrandingSchema),
    defaultValues: {
      branding: {
        logo: defaultValues.branding?.logo || { private: false, key: "" },
        darkLogo: defaultValues.branding?.darkLogo || { private: false, key: "" },
        favicon: defaultValues.branding?.favicon || { private: false, key: "" },
        banner: defaultValues.branding?.banner || { private: false, key: "" },
        colors: defaultValues.branding?.colors || {
          primary: "#1E3A8A",
          secondary: "#0D9488",
          accent: "#F59E0B",
          background: "#FFFFFF",
          darkBackground: "#0F172A",
        },
        emailFooterText: defaultValues.branding?.emailFooterText || "",
        supportEmail: defaultValues.branding?.supportEmail || "",
        supportPhone: defaultValues.branding?.supportPhone || "",
      }
    }
  });

  function handleFormSubmit(values: any) {
    defaultForm.setValue("branding", values.branding);
    if (onSubmit) {
      onSubmit(values);
    } else {
      nextStep();
    }
  }

  return (
    <Form {...form}>
      <div onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 bg-muted text-xs font-mono font-medium">
              2
            </span>
            <span className="text-xs font-medium text-foreground">Branding Assets & Color System</span>
          </div>
          <Badge variant="outline" className="font-mono text-[10px]">
            Active Stage
          </Badge>
        </div>
        <button onClick={copyText(defaultForm.getValues())}>copy</button>
        <div className="space-y-12">
          {/* Section: Support Routing */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground tracking-tight">
              <Mail className="w-3.5 h-3.5 text-muted-foreground" />
              Support & Footer Routing
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="branding.supportEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground">Support Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="support@example.com" className="shadow-none h-9 text-xs" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="branding.supportPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground">Support Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+1-800-555-0199" className="shadow-none h-9 text-xs font-mono" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="branding.emailFooterText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground">Email Footer Copyright Text</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="© 2026 Company. All rights reserved." className="shadow-none h-9 text-xs" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Section: Color Palette */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground tracking-tight">
              <Palette className="w-3.5 h-3.5 text-muted-foreground" />
              Theme Colors (Hex Codes)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-3">
              {(["primary", "secondary", "accent", "background", "darkBackground"] as const).map((colorKey) => (
                <FormField
                  key={colorKey}
                  control={form.control}
                  name={`branding.colors.${colorKey}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] text-muted-foreground capitalize">{colorKey}</FormLabel>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <input
                            type="color"
                            value={field.value || "#000000"}
                            onChange={field.onChange}
                            className="w-8 h-9 border border-input bg-transparent cursor-pointer p-0.5"
                          />
                        </FormControl>
                        <Input {...field} className="shadow-none h-9 text-xs font-mono uppercase" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground tracking-tight">
              <ImageIcon className="w-3.5 h-3.5 text-muted-foreground" />
              Branding Assets (Logo, Banner, Favicon)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImageUpload
                fieldLabel="Logo"
                fieldName="branding.logo"
                formControl={form.control}
              />

              <ImageUpload
                fieldLabel="Dark Logo"
                fieldName="branding.darkLogo"
                formControl={form.control}
              />

              <ImageUpload
                fieldLabel="Favicon"
                fieldName="branding.favicon"
                formControl={form.control}
              />

              <ImageUpload
                fieldLabel="Banner"
                fieldName="branding.banner"
                formControl={form.control}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t border-border/60">
          <Button
            disabled={defaultForm.formState.isSubmitting}
            variant="outline"
            onClick={prevStep}
            className="shadow-none h-9 text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            onClick={form.handleSubmit(handleFormSubmit)}
            className="shadow-none h-9 text-xs font-medium"
          >
            Continue <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>
      </div>
    </Form>
  );
}