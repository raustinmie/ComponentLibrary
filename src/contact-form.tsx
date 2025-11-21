"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import emailjs from "@emailjs/browser";

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

export default function ContactForm({
	showToast = false,
	submitText = "Submit",
	toastMessage = "Thanks for reaching out!",
}: ContactFormProps) {
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

	useEffect(() => {
		setStartTime(Date.now());
	}, []);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
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

		const safeMessage =
			formData.message.length > maxMessageLength
				? formData.message.slice(0, maxMessageLength) +
				  "\n\n[Message truncated]"
				: formData.message;

		const submissionData = {
			...formData,
			message: safeMessage + `\n\nFrom: ${formData.email}`,
		};

		setIsSubmitting(true);
		setToast({ show: false });

		emailjs
			.send(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
				submissionData,
				process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
			)
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
				setTimeout(() => setToast({ show: false }), toastDuration);
			})
			.catch((error) => {
				console.error("EmailJS error:", error);
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
			<button
				className="cs-button-solid cs-submit"
				type="submit"
				disabled={isSubmitting}
			>
				{isSubmitting ? "Submitting..." : submitText}
			</button>
			{(toast.show || showToast) && <div className="toast">{toastMessage}</div>}
		</form>
	);
}
