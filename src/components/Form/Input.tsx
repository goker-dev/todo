import React, {useEffect, useRef} from "react";
import {useFormContext} from "react-hook-form";
import {Label} from "./Label";
import styles from './Form.module.scss'

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    name: string;
    label?: string;
    info?: string | React.ReactElement;
    placeholder?: string;
    icon?: React.ReactNode;
    type?: string;
    autoFocus?: boolean;
    autocomplete?: string;
}

export const Input = ({
                          type = "text",
                          className,
                          name,
                          label,
                          placeholder = " ",
                          icon,
                          autoFocus,
                          onKeyUp,
                          onKeyDown,
                          onChange,
                          autocomplete = "on",
                          disabled,
                          ...props
                      }: Props) => {
    const {
        register,
        formState: {errors},
    } = useFormContext() || {};
    const error = errors[name];
    // const value = rest.value || watch(name) || undefined;
    const ref = useRef<any>(null);
    // const innerProps = { ref, ...inputProps };

    useEffect(() => {
        if (autoFocus && ref && ref.current) ref.current.focus();
    }, [autoFocus, ref]);

    const iconClasses = !!icon && `pr-10`;

    return (
        <React.Fragment>
            {label && (
                <Label
                    className="font-semibold"
                    htmlFor={name}
                >{label}</Label>
            )}
            <div className="formItem">
                <input
                    {...props}
                    type={type}
                    placeholder={placeholder}
                    className={`${styles.input} ${className} ${iconClasses}`}
                    {...(onKeyDown ? {onKeyDown: onKeyDown} : {})}
                    {...(onKeyUp ? {onKeyUp: onKeyUp} : {})}
                    {...(onChange ? {onChange: onChange} : {})}
                    {...(name ? register(name) : {})}
                    autoComplete={autocomplete}
                    disabled={disabled}
                />
                <div className="icon">
                    {icon}
                </div>
            </div>
            {error && (
                <p className="formItemError">{String(error.message)}</p>
            )}
        </React.Fragment>
    );
};
