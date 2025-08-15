import { companyName, canonicalUrl } from "@/constants";
import LegalModal from "./legal-modal";

export default function TermsOfService() {
	const policy = (
		<div>
			<h1>Terms of Service</h1>
			<p>Last updated: May 14, 2025</p>

			<p>
				Welcome to {companyName} (&quot;we&quot;, &quot;us&quot;, or
				&quot;our&quot;). By accessing or using our website at {canonicalUrl}{" "}
				(the &quot;Site&quot;), you agree to comply with and be bound by these
				Terms of Service. If you do not agree with these terms, please do not
				use our Site.
			</p>

			<h2>1. Acceptance of Terms</h2>
			<p>
				By using our Site, you acknowledge that you have read, understood, and
				agree to be bound by these Terms of Service and our Privacy Policy.
			</p>

			<h2>2. Changes to Terms</h2>
			<p>
				We may update these Terms of Service from time to time. We will notify
				you of any changes by posting the new Terms on this page. Your continued
				use of the Site after any changes constitutes your acceptance of the new
				Terms.
			</p>

			<h2>3. Use of the Site</h2>
			<p>
				You agree to use the Site only for lawful purposes and in a manner that
				does not infringe on the rights of others or restrict their use and
				enjoyment of the Site.
			</p>

			<h2>4. Intellectual Property</h2>
			<p>
				All content on the Site, including text, graphics, logos, and images, is
				the property of Harborview Web Design or its licensors and is protected
				by copyright and trademark laws. You may not reproduce, distribute, or
				create derivative works without our express written permission.
			</p>

			<h2>5. Limitation of Liability</h2>
			<p>
				To the fullest extent permitted by law, we shall not be liable for any
				direct, indirect, incidental, special, consequential, or punitive
				damages arising from your use of or inability to use the Site.
			</p>

			<h2>6. Governing Law</h2>
			<p>
				These Terms shall be governed by and construed in accordance with the
				laws of the State of Washington without regard to its conflict of law
				principles.
			</p>

			<h2>7. No Guarantees</h2>
			<p>
				While we aim to keep the information on this site accurate and
				up-to-date, we make no guarantees of completeness, accuracy, or
				usefulness.
			</p>
		</div>
	);

	return (
		<div>
			<LegalModal title="Terms of Service" content={policy} />
		</div>
	);
}
