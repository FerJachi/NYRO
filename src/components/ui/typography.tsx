import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import React from "react"

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      "label-xl": "text-xl font-medium leading-none tracking-tight",
      "label-lg": "text-lg font-medium leading-none tracking-tight",
      "label-md": "text-base font-medium leading-none tracking-tight",
      "label-sm": "text-sm font-medium leading-none tracking-tight",
      "label-xs": "text-xs font-medium leading-none tracking-tight",
      "paragraph-xl": "text-xl leading-7 font-light",
      "paragraph-lg": "text-lg leading-7 font-light",
      "paragraph-md": "text-base leading-7 font-light",
      "paragraph-sm": "text-sm leading-6 font-light",
      "paragraph-xs": "text-xs leading-5 font-light",
      "subheading-md": "text-base font-semibold uppercase tracking-[0.2em]",
      "subheading-sm": "text-sm font-semibold uppercase tracking-[0.22em]",
      "subheading-xs": "text-xs font-semibold uppercase tracking-[0.28em]",
      "subheading-2xs": "text-[10px] font-semibold uppercase tracking-[0.32em]",
      "doc-label": "text-xs font-semibold uppercase tracking-[0.3em]",
      "doc-paragraph": "text-sm leading-6 font-light text-white/70",
    },
  },
  defaultVariants: {
    variant: "paragraph-md",
  },
})

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, ...props }, ref) => {
    const tagMap: Record<string, string> = {
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h4",
      h5: "h5",
      h6: "h6",
      "label-xl": "span",
      "label-lg": "span",
      "label-md": "span",
      "label-sm": "span",
      "label-xs": "span",
      "paragraph-xl": "p",
      "paragraph-lg": "p",
      "paragraph-md": "p",
      "paragraph-sm": "p",
      "paragraph-xs": "p",
      "subheading-md": "p",
      "subheading-sm": "p",
      "subheading-xs": "p",
      "subheading-2xs": "p",
      "doc-label": "span",
      "doc-paragraph": "p",
    }

    const Comp = (as || tagMap[variant ?? "paragraph-md"] || "p") as React.ElementType
    return (
      <Comp
        ref={ref}
        className={cn(typographyVariants({ variant }), className)}
        {...props}
      />
    )
  }
)

Typography.displayName = "Typography"

export { Typography, typographyVariants }
