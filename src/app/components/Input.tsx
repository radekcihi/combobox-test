import clsx from "clsx";
import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { cn } from "../lib/utils";
import { CrossCircledIcon } from "@radix-ui/react-icons"
import Spinner from "./Spinner";
import type { InputHTMLAttributes } from "react";

export interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError | { message: string };
    icon?: {
        type: "trash" | "loading"
    }
    onDelete?: () => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, id, className, icon, onDelete, ...props }, ref) => {
        return (
            <label htmlFor={id} className=" text-sm font-medium text-gray-700">
                {label}
                <div className="relative">

                    <input
                        id={id}
                        className={cn(
                            clsx(
                                " h-10 w-full rounded-md border overflow-ellipsis border-gray-200 bg-white px-3 py-2 text-sm  placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 ",
                                error ? "ring-2 ring-red-500" : "focus:ring-offset-2 focus:ring-gray-950",
                            ),
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    <div className={clsx("absolute inset-y-0 end-0 flex items-center p-2  ",
                        icon?.type === "trash" ? "hover:bg-gray-400 cursor-pointer rounded-lg " : null)}>
                        {icon?.type === "trash" ? <CrossCircledIcon className="w-6 h-6 z-50" onClick={onDelete} /> : null}
                        {icon?.type === "loading" ? <Spinner /> : null}
                    </div>

                </div>
                {error ? <div className="text-red-500 p-1">{error.message}</div> : null}
            </label >
        );
    }
)

Input.displayName = "Input";

export default Input;
