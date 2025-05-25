import { HTMLAttributes, ReactNode } from "react"

interface CenterProps extends HTMLAttributes<HTMLDivElement> {

}
const Center = ({ children, className }: CenterProps) => {
    return (
        <div className={cn("flex items-center justify-center", className)}>
            {children}
        </div>
    )
}
export default Center