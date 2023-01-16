import React, {useEffect, useRef} from "react";
import {useFormContext} from "react-hook-form";
import {Label} from './Label';
import styles from './Form.module.scss'

export interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
    name: string;
    label?: string;
    placeholder?: string;
    type?: string;
    autoFocus?: boolean;
    autocomplete?: string;

    options: { label: string, value: string }[]
}

export const Select = ({
                           type = "text",
                           className,
                           name,
                           label,
                           placeholder = " ",
                           options,
                           autoFocus,
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


    return (
        <React.Fragment>
            {label && (
                <Label
                    className="font-semibold"
                    htmlFor={name}
                >{label}</Label>
            )}
            <div className="formItem">
                <select
                    {...props}
                    placeholder={placeholder}
                    className={`${styles.select} ${className}`}
                    {...(onChange ? {onChange: onChange} : {})}
                    {...(name ? register(name) : {})}
                    autoComplete={autocomplete}
                    disabled={disabled}
                >
                    {options.map((i, k) =>
                        <option key={k} value={i.value}>{i.label}</option>)}
                </select>
            </div>
            {error && (
                <p className="formItemError">{String(error.message)}</p>
            )}
        </React.Fragment>
    );
};
