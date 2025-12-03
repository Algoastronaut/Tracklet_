import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export const BentoGrid = ({
    className,
    children,
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}) => {
    return (
        <div
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-2xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 relative overflow-hidden",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/50 dark:to-blue-900/20 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
                {header}
                <div className="group-hover/bento:translate-x-2 transition duration-200">
                    {icon}
                    <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                        {title}
                    </div>
                    <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
};
