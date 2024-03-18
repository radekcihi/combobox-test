"use client"
import React, { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { getUniversities } from "../actions/form";
import { FieldError } from "react-hook-form";
import Input from "./Input";
import clsx from "clsx";

export interface ComboBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError | { message: string };
    handleChange?: (value: string) => void;
}

const ComboBox: React.FC<ComboBoxProps> = ({ label, error, id, className, handleChange, disabled, placeholder }) => {
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(true);
    const debouncedQuery = useDebounce(value);
    const {
        data,
        isLoading,
        isError
    } = useQuery({
        queryKey: [id, debouncedQuery], queryFn: async () => {
            const data = await getUniversities({ university: debouncedQuery });
            return data;
        },
        enabled: !disabled
    });

    const handleInput = (value: string) => {
        if (handleChange) {
            handleChange(value)
        }

        setValue(value)
    }
    //if height is less then 250px make flex-col-reverse otherwise flex-col
    const isSmallScreen = window.innerHeight < 400;
    return (
        <div className={clsx(
            "flex flex-col w-full",
            isSmallScreen ? "flex-col-reverse" : "flex-col"

        )}
        >
            <Input
                label={label}
                value={value}
                disabled={disabled}
                placeholder={placeholder}
                onChange={(e) => {
                    handleInput(e.target.value)
                    setOpen(true);
                }}
                icon={!isLoading && value.length > 0 ? { type: "trash" } : isLoading ? { type: "loading" } : undefined}
                onDelete={() => {
                    handleInput("")
                }}

                onClick={() => setOpen(true)}

            />

            {!disabled && open && !isLoading ? <ul className="h-44 overflow-auto ">
                {data?.map((item) => {
                    return (
                        <li key={item.name} onBlur={() => {
                            setOpen(false);
                        }} className=" h-10  w-52  rounded-md cursor-pointer border truncate border-gray-200 bg-white px-3 py-2 text-sm  placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 hover:bg-gray-200 text-nowrap overflow-ellipsis"
                            onClick={() => {
                                console.log(item.name)
                                handleInput(item.name)
                                setOpen(false)
                            }}> {item.name}</li>
                    )
                })}
            </ul> : null
            }

            {error ? <div className="text-red-500 p-1">{error.message}</div> : null}
            {isError ? <div className="text-red-500 p-1">Něco se pokazilo</div> : null}

        </div >
    )
}

export default ComboBox;