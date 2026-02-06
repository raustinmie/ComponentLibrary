"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
const submitContactData = (apiPath, payload) => {
	return fetch(apiPath, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	}).then(async (response) => {
		if (response.ok) return;
		let errorMessage = "Failed to send message.";
		try {
			const data = await response.json();
			if (data && typeof data.error === "string") {
				errorMessage = data.error;
			}
		} catch (_a) {
			// Ignore JSON parsing errors and fall back to the generic message.
		}
		throw new Error(errorMessage);
	});
};
export default function ContactFormV2({
	showToast = false,
	submitText = "Submit",
	toastMessage = "Thanks for reaching out!",
	useCaptcha = false,
	captchaSiteKey,
	toEmail,
	apiPath = "/api/contact",
	smtpHost,
	smtpPort,
	smtpUser,
	smtpPass,
	smtpSecure,
}) {
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
	});
	const [startTime, setStartTime] = useState(0);
	const [captchaToken, setCaptchaToken] = useState(null);
	const [captchaError, setCaptchaError] = useState(null);
	const captchaRef = useRef(null);
	const [submissionError, setSubmissionError] = useState(null);
	useEffect(() => {
		setStartTime(Date.now());
	}, []);
	useEffect(() => {
		if (useCaptcha && !captchaSiteKey) {
			console.warn(
				"Captcha usage requires a site key. Provide NEXT_PUBLIC_RECAPTCHA_SITE_KEY via props.",
			);
		}
	}, [useCaptcha, captchaSiteKey]);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) =>
			Object.assign(Object.assign({}, prev), { [name]: value }),
		);
	};
	const handleCaptchaChange = (token) => {
		setCaptchaToken(token);
		setCaptchaError(token ? null : "Please complete the captcha.");
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSubmitting) return;
		const timeElapsed = Date.now() - startTime;
		if (timeElapsed < 5000) {
			console.warn("Spam blocked: submitted too fast.");
			return;
		}
		if (formData.website) {
			console.warn("Spam blocked: honeypot filled.");
			return;
		}
		if (useCaptcha && !captchaToken) {
			setCaptchaError("Please complete the captcha before submitting.");
			return;
		}
		const safeMessage =
			formData.message.length > maxMessageLength
				? formData.message.slice(0, maxMessageLength) +
					"\n\n[Message truncated]"
				: formData.message;
		const submissionData = Object.assign(Object.assign({}, formData), {
			message: safeMessage + `\n\nFrom: ${formData.email}`,
			toEmail,
			smtpHost,
			smtpPort,
			smtpUser,
			smtpPass,
			smtpSecure,
			captchaToken: useCaptcha ? captchaToken : undefined,
		});
		if (!captchaSiteKey && useCaptcha) {
			console.warn("Captcha is enabled but no site key provided.");
		}
		setIsSubmitting(true);
		setToast({ show: false });
		setSubmissionError(null);
		submitContactData(apiPath, submissionData)
			.then(() => {
				var _a;
				setToast({ show: true });
				setFormData({
					name: "",
					email: "",
					phone: "",
					message: "",
					website: "",
				});
				setStartTime(Date.now());
				if (useCaptcha) {
					(_a = captchaRef.current) === null || _a === void 0
						? void 0
						: _a.reset();
					setCaptchaToken(null);
					setCaptchaError(null);
				}
				setTimeout(() => setToast({ show: false }), toastDuration);
			})
			.catch((error) => {
				console.error("ContactFormV2 submission error:", error);
				const message =
					error instanceof Error && error.message
						? error.message
						: "Something went wrong. Please try again.";
				setSubmissionError(message);
				setToast({ show: true });
				setTimeout(() => setToast({ show: false }), toastDuration);
			})
			.finally(() => setIsSubmitting(false));
	};
	return _jsxs("form", {
		className: "cs-form",
		onSubmit: handleSubmit,
		children: [
			_jsxs("label", {
				className: "cs-label",
				children: [
					"Name",
					_jsx("input", {
						className: "cs-input cs-name",
						type: "text",
						name: "name",
						placeholder: "Name",
						value: formData.name,
						onChange: handleChange,
						required: true,
					}),
				],
			}),
			_jsxs("label", {
				className: "cs-label cs-email",
				children: [
					"Email",
					_jsx("input", {
						className: "cs-input",
						type: "email",
						name: "email",
						placeholder: "Email",
						value: formData.email,
						onChange: handleChange,
						required: true,
					}),
				],
			}),
			_jsxs("label", {
				className: "cs-label cs-phone",
				children: [
					"Phone",
					_jsx("input", {
						className: "cs-input",
						type: "tel",
						name: "phone",
						placeholder: "Phone",
						value: formData.phone,
						onChange: handleChange,
						required: true,
					}),
				],
			}),
			_jsxs("label", {
				className: "cs-label",
				children: [
					"Message",
					_jsx("textarea", {
						className: "cs-input cs-textarea",
						name: "message",
						placeholder: "Write message...",
						value: formData.message,
						onChange: handleChange,
						required: true,
						maxLength: 2000,
					}),
				],
			}),
			_jsx("input", {
				type: "text",
				name: "website",
				tabIndex: -1,
				autoComplete: "off",
				value: formData.website,
				onChange: handleChange,
				style: { display: "none" },
			}),
			useCaptcha &&
				captchaSiteKey &&
				_jsxs("div", {
					className: "cs-captcha",
					children: [
						_jsx(ReCAPTCHA, {
							sitekey: captchaSiteKey,
							onChange: handleCaptchaChange,
							ref: (instance) => {
								captchaRef.current = instance;
							},
						}),
						captchaError &&
							_jsx("p", {
								className: "cs-captcha-error",
								children: captchaError,
							}),
					],
				}),
			submissionError &&
				_jsx("p", { className: "cs-error", children: submissionError }),
			_jsx("button", {
				className: "cs-button-solid cs-submit",
				type: "submit",
				disabled:
					isSubmitting || (useCaptcha && (!captchaToken || !captchaSiteKey)),
				children: isSubmitting ? "Submitting..." : submitText,
			}),
			(toast.show || showToast) &&
				_jsx("div", { className: "toast", children: toastMessage }),
		],
	});
}
