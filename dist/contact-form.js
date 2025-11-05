import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        website: "",
    });
    const maxMessageLength = 2000;
    const toastDuration = 5000;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({
        show: false,
        message: "",
    });
    const [startTime, setStartTime] = useState(0);
    useEffect(() => {
        setStartTime(Date.now());
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting)
            return;
        const timeElapsed = Date.now() - startTime;
        if (timeElapsed < 5000) {
            console.warn("Spam blocked: submitted too fast.");
            return;
        }
        if (formData.website) {
            console.warn("Spam blocked: honeypot filled.");
            return;
        }
        const safeMessage = formData.message.length > maxMessageLength
            ? formData.message.slice(0, maxMessageLength) +
                "\n\n[Message truncated]"
            : formData.message;
        const submissionData = Object.assign(Object.assign({}, formData), { message: safeMessage + `\n\nFrom: ${formData.email}` });
        setIsSubmitting(true);
        setToast({ show: false, message: "" });
        emailjs
            .send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, submissionData, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
            .then(() => {
            setToast({ show: true, message: "Thanks for reaching out!" });
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
                website: "",
            });
            setStartTime(Date.now());
            setTimeout(() => setToast({ show: false, message: "" }), toastDuration);
        })
            .catch((error) => {
            console.error("EmailJS error:", error);
            setToast({ show: true, message: "Error sending message, try again!" });
            setTimeout(() => setToast({ show: false, message: "" }), toastDuration);
        })
            .finally(() => setIsSubmitting(false));
    };
    return (_jsxs("form", { className: "cs-form", onSubmit: handleSubmit, children: [_jsxs("label", { className: "cs-label", children: ["Name", _jsx("input", { className: "cs-input cs-name", type: "text", name: "name", placeholder: "Name", value: formData.name, onChange: handleChange, required: true })] }), _jsxs("label", { className: "cs-label cs-email", children: ["Email", _jsx("input", { className: "cs-input", type: "email", name: "email", placeholder: "Email", value: formData.email, onChange: handleChange, required: true })] }), _jsxs("label", { className: "cs-label cs-phone", children: ["Phone", _jsx("input", { className: "cs-input", type: "tel", name: "phone", placeholder: "Phone", value: formData.phone, onChange: handleChange, required: true })] }), _jsxs("label", { className: "cs-label", children: ["Message", _jsx("textarea", { className: "cs-input cs-textarea", name: "message", placeholder: "Write message...", value: formData.message, onChange: handleChange, required: true, maxLength: 2000 })] }), _jsx("input", { type: "text", name: "website", tabIndex: -1, autoComplete: "off", value: formData.website, onChange: handleChange, style: { display: "none" } }), _jsx("button", { className: "cs-button-solid cs-submit", type: "submit", disabled: isSubmitting, children: isSubmitting ? "Submitting..." : "Submit" }), toast.show && _jsx("div", { className: "toast", children: toast.message })] }));
}
