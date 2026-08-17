import { useForm, UseFormReturn } from "react-hook-form";
import { organizationGeneralInformationSchema, OrganizationInput } from "../schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { ArrowRight, Globe, FileText, Plus, X } from "lucide-react";

export default function OrganizationCreationGeneralInformation({
  form: defaultForm,
  nextStep
}: {
  form: UseFormReturn<OrganizationInput>,
  nextStep: () => void
}) {
  const defaultValues = useMemo(() => defaultForm.getValues(), []);

  const form = useForm({
    resolver: zodResolver(organizationGeneralInformationSchema),
    defaultValues: {
      name: defaultValues.name,
      meta: {
        title: defaultValues.meta?.title || "",
        description: defaultValues.meta?.description || "",
        keywords: defaultValues.meta?.keywords || [],
        ogImage: defaultValues.meta?.ogImage || "",
        ogTitle: defaultValues.meta?.ogTitle || "",
        ogDescription: defaultValues.meta?.ogDescription || "",
        twitterCardType: defaultValues.meta?.twitterCardType || "summary_large_image",
        twitterHandle: defaultValues.meta?.twitterHandle || "",
        canonicalUrl: defaultValues.meta?.canonicalUrl || "",
        noIndex: defaultValues.meta?.noIndex ?? false,
      }
    }
  });

  const [keywordInput, setKeywordInput] = useState("");
  const currentKeywords = form.watch("meta.keywords") || [];

  const addKeyword = () => {
    const trimmed = keywordInput.trim();
    if (trimmed && !currentKeywords.includes(trimmed)) {
      form.setValue("meta.keywords", [...currentKeywords, trimmed], { shouldValidate: true });
      setKeywordInput("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    form.setValue(
      "meta.keywords",
      currentKeywords.filter((k: string) => k !== keywordToRemove),
      { shouldValidate: true }
    );
  };

  function onSubmit(values: any) {
    defaultForm.setValues(values)
    nextStep();
  }

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6  bg-muted text-xs font-mono font-medium">
              1
            </span>
            <span className="text-xs font-medium text-foreground">General Information & SEO Metadata</span>
          </div>
          <Badge variant="outline" className="font-mono text-[10px] ">
            Active Stage
          </Badge>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground tracking-tight">
              <Globe className="w-3.5 h-3.5 text-muted-foreground" />
              Workspace Identity
            </div>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground">Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter organization name" className="shadow-none  h-9 text-xs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground tracking-tight">
              <FileText className="w-3.5 h-3.5 text-muted-foreground" />
              SEO & Search Configurations
            </div>

            <FormField
              control={form.control}
              name="meta.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground">Meta Title (Max 70 chars)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Portal page title" className="shadow-none  h-9 text-xs" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="meta.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground">Meta Description (Max 160 chars)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Brief description for search engines" className="shadow-none  text-xs resize-none" rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="meta.canonicalUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground">Canonical URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://example.com" className="shadow-none  h-9 text-xs font-mono" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel className="text-xs text-muted-foreground">Keywords Array</FormLabel>
                <div className="flex gap-2">
                  <Input 
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addKeyword();
                      }
                    }}
                    placeholder="Add a keyword" 
                    className="shadow-none  h-9 text-xs" 
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addKeyword}
                    className="shadow-none  h-9 text-xs shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  {currentKeywords.map((keyword: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className=" font-normal text-[10px] shadow-none px-2 py-1 flex items-center gap-1.5">
                      {keyword}
                      <button 
                        type="button" 
                        onClick={() => removeKeyword(keyword)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <FormMessage>{form.formState.errors.meta?.keywords?.message}</FormMessage>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="meta.ogTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground">Open Graph Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Social share title" className="shadow-none  h-9 text-xs" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="meta.twitterHandle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground">Twitter Handle</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="@handle" className="shadow-none  h-9 text-xs font-mono" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="meta.ogDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground">Open Graph Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Social share summary" className="shadow-none  text-xs resize-none" rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center pt-2">
              <FormField
                control={form.control}
                name="meta.ogImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground">Open Graph Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://assets.com/image.jpg" className="shadow-none  h-9 text-xs font-mono" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="meta.noIndex"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between  border p-3 bg-muted/20">
                    <div className="space-y-0.5">
                      <FormLabel className="text-xs text-foreground font-medium">Prevent Indexing</FormLabel>
                      <div className="text-[10px] text-muted-foreground">Set robots noindex tag</div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              /> */}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-border/60">
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="shadow-none  h-9 text-xs font-medium"
          >
            Continue
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>
      </div>
    </Form>
  );
}