export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button
            className="flex items-center justify-center h-10 px-4 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700"
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;