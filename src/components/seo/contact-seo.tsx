import GenericSeo from "./generic-seo";
import { companyName, canonicalUrl } from "@/constants";

interface ContactSeoProps {
	description: string;
}
export default function ContactSeo({ description }: ContactSeoProps) {
	return (
		<GenericSeo
			title={`Contact | ${companyName}`}
			description={description}
			jsonLd={{
				"@context": "https://schema.org",
				"@type": "ContactPage",
				name: `Contact ${companyName}`,
				url: `${canonicalUrl}`,
				description: `${description}`,
			}}
		/>
	);
}
