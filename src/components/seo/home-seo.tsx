import GenericSeo from "./generic-seo";
import { companyName, canonicalUrl } from "@/constants";

interface HomeSeoProps {
	description: string;
}
export default function HomeSeo({ description }: HomeSeoProps) {
	return (
		<GenericSeo
			title={`Home | ${companyName}`}
			description={description}
			jsonLd={{
				"@context": "https://schema.org",
				"@type": "WebSite",
				name: `${companyName}`,
				url: `${canonicalUrl}`,
				description: `${description}`,
			}}
		/>
	);
}
