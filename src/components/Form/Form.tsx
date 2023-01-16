import {
    HTMLProps, useRef,
    useState,
} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {AnyObjectSchema} from "yup";
import {ApiError} from "../../types/ApiError";
// import useDeepCompareEffect from "use-deep-compare-effect";
// import { ApiError } from "rest";

import styles from './Form.module.scss'


type Props = {
    onSubmit?: SubmitHandler<{ [x: string]: any }>;
    defaultValues?: any;
    schema: AnyObjectSchema;
    onChange?: SubmitHandler<{ [x: string]: any }>;
    /**
     * Trigger of onSubmit function call on every input change
     */
    submitOnChange?: boolean;
    /**
     * Submit by the enter key to submit the Form default:true
     */
    submitByEnter?: boolean;
    resetOnSubmit?: boolean;
} & HTMLProps<HTMLFormElement>;

export const Form = ({
                         className,
                         defaultValues = {},
                         children,
                         schema,
                         onSubmit = () => null,
                         onChange,
                         submitOnChange = false,
                         submitByEnter = true,
                         resetOnSubmit = false,
                     }: Props) => {
    const ref = useRef<HTMLFormElement>(null);
    const [initialized, setInitialized] = useState(false);
    const [loading, setLoading] = useState(false);

    const methods = useForm<any>({
        resolver: yupResolver(schema),
        defaultValues,
        reValidateMode: "onChange",
    });

    // useDeepCompareEffect(() => {
    //   if (!initialized) {
    //     setInitialized(true);
    //   } else if (defaultValues) {
    //     setInitialized(true);
    //     methods.reset(defaultValues);
    //   }
    // }, [defaultValues]);

    const handleSubmit = async (data: any) => {
        try {
            setLoading(true);
            await onSubmit(data);
            if (resetOnSubmit) {
                methods.reset(defaultValues);
            }
        } catch (e: any) {
            let err = e as ApiError;
            console.error(err.status, err.statusText, {err});

            if (err.body)
                if (typeof err.body.details === "string") {
                    methods.setError("_generic", {
                        type: "generic",
                        // @ts-ignore
                        message: err.body.message,
                        // @ts-ignore
                        details: err.body.details,
                    });
                } else if (err.body.details) {
                    Object.entries(err.body.details).forEach(([key, val]) => {
                        let name = key.split(".").pop() || key;

                        console.log(
                            "methods.getFieldState(name)",
                            methods.getFieldState(name)
                        );
                        let isAnElement = !!ref?.current?.querySelector(`[name=${name}]`)
                        console.log(isAnElement)
                        if (isAnElement)
                            methods.setError(name, {
                                type: "manual",
                                // @ts-ignore
                                message: val?.message,
                            });
                        else
                            methods.setError(name, {
                                type: "generic",
                                // @ts-ignore
                                message: val?.message,
                            });
                    });
                }
        }
        setLoading(false);
    };

    const handleFormChange = () => {
        const watch = {...methods.watch()};
        if (onChange) onChange(watch);
        if (submitOnChange) {
            methods.handleSubmit(handleSubmit)();
        }
    };

    // @ts-ignore
    return (
        <FormProvider
            {...methods}
            // @ts-ignore
            submitOnChange={submitOnChange}
            defaultValues={defaultValues}
            handleFormChange={handleFormChange}
        >
            <form
                ref={ref}
                onKeyDown={(e) =>
                    !submitByEnter && e.key === "Enter" && e.preventDefault()
                }
                className={`${styles.form} ${className} ${loading ? "loading" : ""}`}
                onSubmit={methods.handleSubmit(handleSubmit)}
                onChange={handleFormChange}
            >
                {children}
                <ul className="error">
                    {Object.entries(methods?.formState?.errors)?.map(
                        ([k, v]) =>
                            v?.type === "generic" && (
                                // @ts-ignore
                                <li data-details={v?.details}>{`${v?.message}`}</li>
                            )
                    )}
                </ul>
            </form>
        </FormProvider>
    );
};
