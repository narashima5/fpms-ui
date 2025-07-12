import clsx from 'clsx';
import styles from './LoginInput.module.css';
import { useId, useState, type ReactNode } from 'react';

export interface LoginInputProps {
    type?: 'text' | 'email' | 'password' | 'number';
    name: string;
    inputId?: string;
    showError?: boolean;
    error?: string;
    value: string;
    label: ReactNode;
    handleBlur?: (e: React.FocusEvent<unknown, Element>) => void;
    handleChange?: (e: React.ChangeEvent<Element>) => void;
    iconName?: string; // bootstrap icons
    showPasswordToggle?: boolean; // Enable password visibility toggle
}

export default function LoginInput({
     type = 'text', 
     inputId, 
     name,
     showError = false,
     error,
     value,
     iconName,
     label = '',
     handleBlur,
     handleChange,
     showPasswordToggle = false,
     }: LoginInputProps) {
    const internalID = useId();
    const [showPassword, setShowPassword] = useState(false);
    
    
    // Determine the actual input type
    const inputType = showPasswordToggle && type === 'password' 
        ? (showPassword ? 'text' : 'password') 
        : type;
    
    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    return (
        <div className={`relative ${styles.floatingInputGroup}`}>
            {!!iconName && <i className={`bi bi-${iconName} absolute text-xl`}></i>}
            <input 
                type={inputType} 
                name={name} 
                id={inputId || internalID} 
                placeholder="" 
                className={clsx(
                    'w-full',
                    styles.input,
                    showError && styles.error
                )} 
                onBlur={handleBlur} 
                onChange={handleChange} 
                value={value} 
            />
            <label htmlFor={inputId || internalID} className="absolute bg-white">{label}</label>
            
            {/* Password toggle button */}
            {/* {showPasswordToggle && type === 'password' && (
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    style={{ zIndex: 10 }}
                >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} text-lg`}></i>
                </button>
            )} */}
            
            {showError && <div className="w-full h-10 text-red-600">{error}</div>}
        </div>
    )
}