import type { ContactFormProps, FormData } from "./contact-form";
export interface ContactFormV2Props extends ContactFormProps {
    useCaptcha?: boolean;
    captchaSiteKey?: string;
    onSubmit?: (data: ContactFormV2Submission) => Promise<void> | void;
}
export type ContactFormV2Submission = FormData & {
    message: string;
    captchaToken?: string | null;
};
export default function ContactFormV2({ showToast, submitText, toastMessage, useCaptcha, captchaSiteKey, onSubmit, }: ContactFormV2Props): import("react/jsx-runtime").JSX.Element;
