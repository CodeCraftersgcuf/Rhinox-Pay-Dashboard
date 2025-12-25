import React from "react"

interface props {
    children: React.ReactNode;
    handleFunction?: () => void;
}

const Button: React.FC<props> = ({ children,handleFunction }) => {
    return (
        <div onClick={
            handleFunction ? handleFunction : () => { }
        } className="flex items-center w-fit gap-2 py-2 px-4 bg-[#FF0000] rounded-md shadow-md hover:bg-[#ff000099] transition duration-200 ease-in-out text-white cursor-pointer">
            {children}
        </div>
    )
}

export default Button