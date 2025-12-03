"use client";
import { useEffect, useState, useRef, ChangeEvent, FormEvent } from "react";
import ReCAPTCHA from "react-google-recaptcha";
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

const submitContactData = (
	apiPath: string,
	payload: ContactFormV2Submission
) => {
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
		} catch {
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
}: ContactFormV2Props) {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		phone: "",
		message: "",
		website: "",
	});
	const maxMessageLength = 2000;
	const toastDuration = 5000;
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [toast, setToast] = useState<{ show: boolean }>({
		show: false,
	});
	const [startTime, setStartTime] = useState<number>(0);
	const [captchaToken, setCaptchaToken] = useState<string | null>(null);
	const [captchaError, setCaptchaError] = useState<string | null>(null);
	const captchaRef = useRef<ReCAPTCHA | null>(null);
	const [submissionError, setSubmissionError] = useState<string | null>(null);

	useEffect(() => {
		setStartTime(Date.now());
		if (!smtpHost || !smtpUser || !smtpPass) {
			console.warn("ContactFormV2 is missing SMTP configuration props.");
		}
	}, []);

	useEffect(() => {
		if (useCaptcha && !captchaSiteKey) {
			console.warn(
				"Captcha usage requires a site key. Provide NEXT_PUBLIC_RECAPTCHA_SITE_KEY via props."
			);
		}
	}, [useCaptcha, captchaSiteKey]);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleCaptchaChange = (token: string | null) => {
		setCaptchaToken(token);
		setCaptchaError(token ? null : "Please complete the captcha.");
	};

	const handleSubmit = (e: FormEvent) => {
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

		const submissionData: ContactFormV2Submission = {
			...formData,
			message: safeMessage + `\n\nFrom: ${formData.email}`,
			toEmail,
			smtpHost,
			smtpPort,
			smtpUser,
			smtpPass,
			smtpSecure,
			captchaToken: useCaptcha ? captchaToken : undefined,
		};

		if (!captchaSiteKey && useCaptcha) {
			console.warn("Captcha is enabled but no site key provided.");
		}

		setIsSubmitting(true);
		setToast({ show: false });
		setSubmissionError(null);

		submitContactData(apiPath, submissionData)
			.then(() => {
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
					captchaRef.current?.reset();
					setCaptchaToken(null);
					setCaptchaError(null);
				}
				setTimeout(() => setToast({ show: false }), toastDuration);
			})
			.catch((error: unknown) => {
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

	return (
		<form className="cs-form" onSubmit={handleSubmit}>
			<label className="cs-label">
				Name
				<input
					className="cs-input cs-name"
					type="text"
					name="name"
					placeholder="Name"
					value={formData.name}
					onChange={handleChange}
					required
				/>
			</label>
			<label className="cs-label cs-email">
				Email
				<input
					className="cs-input"
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
			</label>
			<label className="cs-label cs-phone">
				Phone
				<input
					className="cs-input"
					type="tel"
					name="phone"
					placeholder="Phone"
					value={formData.phone}
					onChange={handleChange}
					required
				/>
			</label>
			<label className="cs-label">
				Message
				<textarea
					className="cs-input cs-textarea"
					name="message"
					placeholder="Write message..."
					value={formData.message}
					onChange={handleChange}
					required
					maxLength={2000}
				/>
			</label>
			{/* Honeypot */}
			<input
				type="text"
				name="website"
				tabIndex={-1}
				autoComplete="off"
				value={formData.website}
				onChange={handleChange}
				style={{ display: "none" }}
			/>
			{useCaptcha && captchaSiteKey && (
				<div className="cs-captcha">
					<ReCAPTCHA
						sitekey={captchaSiteKey}
						onChange={handleCaptchaChange}
						ref={(instance: ReCAPTCHA | null) => {
							captchaRef.current = instance;
						}}
					/>
					{captchaError && <p className="cs-captcha-error">{captchaError}</p>}
				</div>
			)}
			{submissionError && <p className="cs-error">{submissionError}</p>}
			<button
				className="cs-button-solid cs-submit"
				type="submit"
				disabled={
					isSubmitting || (useCaptcha && (!captchaToken || !captchaSiteKey))
				}
			>
				{isSubmitting ? "Submitting..." : submitText}
			</button>
			{(toast.show || showToast) && <div className="toast">{toastMessage}</div>}
		</form>
	);
}
