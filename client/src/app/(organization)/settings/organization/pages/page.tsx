"use client"
import { ErrorState } from "@/components/ui/error"
import { ComponentLoader } from "@/components/ui/loader"
import useFetch from "@/hooks/useFetch"
import { buildToastMessage } from "@/lib/catchAsync";
import { BlueprintModernLanding } from "@/modules/company-pages/config/templates/blueprint-modern";
import { resolvePageMarkup } from "@/modules/company-pages/helpers/formatter";
import api from "@/network/client";
import { StudioEditor } from '@grapesjs/studio-sdk/react';
import '@grapesjs/studio-sdk/style';
import { useMemo } from "react";
import { toast } from "sonner";

export default function Page() {
  const { isLoading, data, error, mutate } = useFetch("/api/v1/organization/pages")
  const resolvedPages = useMemo(function () {
    if (data?.data) {
      return data.data.map(({ page, html }: { page: string, html: string }) => (page === "landing"
        ? ({
          name: "landing",
          component: BlueprintModernLanding.component
        })
        : {
          name: page,
          component: html
        }))
    }
  }, [isLoading, data])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <ComponentLoader />
      </div>
    )
  }

  if (error || data?.code !== 200) {
    return (
      <div className="flex items-center justify-center">
        <ErrorState
          title={data?.message || "Dashboard Sync Error"}
          description="The database cluster returned an invalid schema or network failure."
          reset={() => mutate()}
        />
      </div>
    )
  }

  const savePages = async function ({ editor }: any) {
    try {
      const pages = editor.Pages.getAll();
      const output = pages.map((page: any) => resolvePageMarkup(editor, page));
      console.log(output)
      const response = await api.post("/api/v1/organization/pages", {
        body: {
          pages: output
        }
      })
      console.log(response)
    } catch (error) {
      toast.error(buildToastMessage(error))
    }
  };

  return (
    <div className="bg-red-200 grow">
      <StudioEditor
        options={{
          licenseKey: "YOUR_LICENSE_KEY",
          storage: {
            type: "self",
            autosaveChanges: 10000,
            onSave: savePages,
            onLoad: async function () {
              return {
                project: {
                  pages: resolvedPages
                }
              }
            }
          },
          assets: {
            storageType: "self",
          },
          pages: {
            add: false
          },
          project: {
            type: 'web',
            default: {
              custom: {
                globalPageSettings: {
                  title: 'Global title',
                  description: 'Global description',
                  customCodeHead: `
              <meta name="meta-global" content="Global meta"/>
              <link href="https://cdn.jsdelivr.net/npm/reset-css@5.0.2/reset.min.css" rel="stylesheet">
              <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
              <script>console.log('[GLOBAL]: Custom HTML head');</script>
              <style>.title { font-size: 5rem; }</style>
            `,
                  customCodeBody: '',
                }
              },
            },
          }
        }}
      />
    </div>
  )
}