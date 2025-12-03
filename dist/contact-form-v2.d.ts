import type { ContactFormProps, FormData } from "./contact-form";
export interface ContactFormV2Props extends ContactFormProps {
    useCaptcha?: boolean;
    captchaSiteKey?: string;
    toEmail: string;
    apiPath?: string;
    smtpHost: string;
    smtpPort: number | string;
    smtpUser: string;
    smtpPass: string;
    smtpSecure?: boolean;
}
export type ContactFormV2Submission = Omit<FormData, "message"> & {
    message: string;
    toEmail: string;
    smtpHost: string;
    smtpPort: number | string;
    smtpUser: string;
    smtpPass: string;
    smtpSecure?: boolean;
    captchaToken?: string | null;
};
export default function ContactFormV2({ showToast, submitText, toastMessage, useCaptcha, captchaSiteKey, toEmail, apiPath, smtpHost, smtpPort, smtpUser, smtpPass, smtpSecure, }: ContactFormV2Props): import("react/jsx-runtime").JSX.Element;
