export interface ContactFormProps {
    showToast?: boolean;
    submitText?: string;
    toastMessage?: string;
}
export type FormData = {
    name: string;
    email: string;
    phone: string;
    message: string;
    website: string;
};
export default function ContactForm({ showToast, submitText, toastMessage, }: ContactFormProps): import("react/jsx-runtime").JSX.Element;
