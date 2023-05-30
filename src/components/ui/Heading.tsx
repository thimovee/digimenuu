import { HTMLAttributes, forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
const headingVariants = cva(
    "text-black text-center lg:text-left font-extrabold leading-tight tracking-tigther",
    {
        variants: {
            size: {
                default: "text-4xl md:text-5xl large:text-6xl",
                xs: "text-lg md:text-xl lg:text-2xl",
                sm: "text-2xl md:text-3xl lg:text-4xl",
                lg: "text-5xl md:text-6xl lg:text-7xl",

            },
        },
        defaultVariants: {
            size: "default"
        },
    }
)

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> { }

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(({
    className, size, children, ...props
}, ref) => {
    return (
        <h1 ref={ref} {...props} className={cn(
            headingVariants({ size, className }))}>
            {children}
        </h1>
    )
})

Heading.displayName = "Large heading"
export default Heading