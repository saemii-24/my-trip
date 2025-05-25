import { HTMLAttributes } from "react";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
    type: string;
}

export default function Input({ className, type, ...props }: InputProps) {
    // return <input className={cn('', className)} {...props} />
    return <input className={(className)} type={'text'} {...props} />
}