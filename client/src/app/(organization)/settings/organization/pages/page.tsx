// "use client"
// import { ErrorState } from "@/components/ui/error"
// import { ComponentLoader } from "@/components/ui/loader"
// import useFetch from "@/hooks/useFetch"
// import { buildToastMessage } from "@/lib/catchAsync";
// import { resolvePageMarkup } from "@/modules/company-pages/helpers/formatter";
// import api from "@/network/client";
// import { StudioEditor } from '@grapesjs/studio-sdk/react';
// import '@grapesjs/studio-sdk/style';
// import { useMemo } from "react";
// import { toast } from "sonner";

// export default function Page() {
//   const { isLoading, data, error, mutate } = useFetch("/api/v1/organization/pages")
//   const resolvedPages = useMemo(function () {
//     if (data?.data) {
//       return data.data.map(({ page, html }: { page: string, html: string }) => ({
//         name: page,
//         component: html
//       }))
//     }
//   }, [isLoading, data])

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center">
//         <ComponentLoader />
//       </div>
//     )
//   }

//   if (error || data?.code !== 200) {
//     return (
//       <div className="flex items-center justify-center">
//         <ErrorState
//           title={data?.message || "Dashboard Sync Error"}
//           description="The database cluster returned an invalid schema or network failure."
//           reset={() => mutate()}
//         />
//       </div>
//     )
//   }

//   const savePages = async function ({ editor }: any) {
//     try {
//       const pages = editor.Pages.getAll();
//       const output = pages.map((page: any) => resolvePageMarkup(editor, page));
//       const response = await api.post("/api/v1/organization/pages", {
//         body: {
//           pages: output
//         }
//       })
//       if (response.code !== 200) throw new Error(response.message);
//       toast.success(response.message || "Successfull!");
//     } catch (error) {
//       toast.error(buildToastMessage(error))
//     }
//   };

//   return (
//     <div className="bg-red-200 grow">
//       <StudioEditor
//         options={{
//           licenseKey: "52eeae3929474eb5b660ecf5a9fa7fa472de53e177244f89a04a720bbe4646c2",
//           storage: {
//             type: "self",
//             autosaveChanges: 10000,
//             onSave: savePages,
//             onLoad: async function () {
//               return {
//                 project: {
//                   pages: resolvedPages
//                 }
//               }
//             }
//           },
//           assets: {
//             storageType: "self",
//           },
//           pages: {
//             add: false
//           },
//           project: {
//             type: 'web',
//             default: {
//               custom: {
//                 globalPageSettings: {
//                   title: 'Global title',
//                   description: 'Global description',
//                   customCodeHead: `
//               <meta name="meta-global" content="Global meta"/>
//               <link href="https://cdn.jsdelivr.net/npm/reset-css@5.0.2/reset.min.css" rel="stylesheet">
//               <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
//               <script>console.log('[GLOBAL]: Custom HTML head');</script>
//               <style>.title { font-size: 5rem; }</style>
//             `,
//                   customCodeBody: '',
//                 }
//               },
//             },
//           }
//         }}
//       />
//     </div>
//   )
// }

"use client"
import { ErrorState } from "@/components/ui/error"
import { ComponentLoader } from "@/components/ui/loader"
import useFetch from "@/hooks/useFetch"
import { buildToastMessage } from "@/lib/catchAsync";
import { resolvePageMarkup } from "@/modules/company-pages/helpers/formatter";
import { Templates } from "@/modules/company-pages/templates";
import api from "@/network/client";
import { StudioEditor } from '@grapesjs/studio-sdk/react';
import '@grapesjs/studio-sdk/style';
import { useMemo, useState } from "react";
import { toast } from "sonner";
// import { Templates } from "./templates-mapping"; // Import your templates object

export default function Page() {
  const { isLoading, data, error, mutate } = useFetch("/api/v1/organization/pages")
  const [selectedStyle, setSelectedStyle] = useState<"current" | keyof typeof Templates>("Style1");

  const resolvedPages = useMemo(function () {
    if (selectedStyle === "current" && data?.data && data.data.length > 0) {
      return data.data.map(({ page, html }: { page: string, html: string }) => ({
        name: page,
        component: html
      }))
    }

    const templateSet = Templates[selectedStyle === "current" ? "Style1" : selectedStyle];
    
    return [
      { name: "landing", component: templateSet.landing },
      { name: "about", component: templateSet.about },
      { name: "contact", component: templateSet.contact },
      { name: "privacy-policy", component: templateSet["privacy-policy"] },
      { name: "terms-conditions", component: templateSet["terms-conditions"] },
    ];
  }, [isLoading, data, selectedStyle])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <ComponentLoader />
      </div>
    )
  }

  if (error || data?.code !== 200) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
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
      const response = await api.post("/api/v1/organization/pages", {
        body: {
          pages: output
        }
      })
      if (response.code !== 200) throw new Error(response.message);
      toast.success(response.message || "Successful!");
    } catch (error) {
      toast.error(buildToastMessage(error))
    }
  };

  const styleOptions: Array<{ id: "current" | keyof typeof Templates; label: string }> = [
    { id: "current", label: "Current Saved Version" },
    { id: "Style1", label: "Style 1: Modern Minimalist" },
    { id: "Style2", label: "Style 2: Creative Studio" },
    { id: "Style3", label: "Style 3: Editorial Minimal" },
  ];

  return (
    <div className="flex flex-col grow h-full">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 text-white text-sm">
        <span className="font-medium">Template Switcher:</span>
        <div className="flex gap-2">
          {styleOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedStyle(opt.id)}
              className={`px-3 py-1 rounded text-xs font-medium transition ${
                selectedStyle === opt.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-red-200 grow">
        <StudioEditor
          key={selectedStyle}
          options={{
            licenseKey: "52eeae3929474eb5b660ecf5a9fa7fa472de53e177244f89a04a720bbe4646c2",
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
                    `,
                    customCodeBody: '',
                  }
                },
              },
            }
          }}
        />
      </div>
    </div>
  )
}