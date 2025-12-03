import nodemailer from "nodemailer";
import type { ContactFormV2Submission } from "../../contact-form-v2";

type RequestLike = {
    method?: string;
    body?: unknown;
};

type ResponseLike = {
    status: (statusCode: number) => ResponseLike;
    json: (payload: unknown) => void;
};

type SubmissionBody = ContactFormV2Submission & {
    toEmail: string;
    smtpHost: string;
    smtpPort: number | string;
    smtpUser: string;
    smtpPass: string;
    smtpSecure?: boolean;
};

const REQUIRED_FIELDS: Array<keyof SubmissionBody> = [
    "name",
    "email",
    "message",
    "toEmail",
    "smtpHost",
    "smtpPort",
    "smtpUser",
    "smtpPass",
];

const isEmpty = (value: unknown): boolean => {
    if (typeof value === "string") {
        return value.trim().length === 0;
    }
    return value === null || value === undefined;
};

const parsePort = (port: number | string): number | null => {
    if (typeof port === "number") {
        return Number.isFinite(port) ? port : null;
    }
    const parsed = Number.parseInt(port, 10);
    return Number.isFinite(parsed) ? parsed : null;
};

const createMessage = (body: SubmissionBody): string => {
    return [
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        body.phone ? `Phone: ${body.phone}` : null,
        "",
        body.message,
    ]
        .filter(Boolean)
        .join("\n");
};

export default async function handler(
    req: RequestLike,
    res: ResponseLike
): Promise<void> {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method Not Allowed" });
        return;
    }

    let payload = req.body;

    if (typeof payload === "string") {
        try {
            payload = JSON.parse(payload);
        } catch {
            res.status(400).json({ error: "Invalid JSON body" });
            return;
        }
    }

    const body = payload as SubmissionBody | undefined;

    if (!body) {
        res.status(400).json({ error: "Missing body" });
        return;
    }

    for (const field of REQUIRED_FIELDS) {
        if (isEmpty(body[field])) {
            res.status(400).json({ error: `Missing field: ${field}` });
            return;
        }
    }

    const smtpPort = parsePort(body.smtpPort);

    if (!smtpPort) {
        res.status(400).json({ error: "Invalid SMTP port" });
        return;
    }

    try {
        const transporter = nodemailer.createTransport({
            host: body.smtpHost,
            port: smtpPort,
            secure:
                typeof body.smtpSecure === "boolean"
                    ? body.smtpSecure
                    : smtpPort === 465,
            auth: {
                user: body.smtpUser,
                pass: body.smtpPass,
            },
        });

        await transporter.sendMail({
            from: body.smtpUser,
            to: body.toEmail,
            replyTo: body.email,
            subject: `New contact form submission from ${body.name}`,
            text: createMessage(body),
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Contact API error", error);
        res.status(500).json({ error: "Failed to send message" });
    }
}
