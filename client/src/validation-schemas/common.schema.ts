import z from "zod";

export const imageSchema = z.object({

})

export type ImageSchema = z.infer<typeof imageSchema>