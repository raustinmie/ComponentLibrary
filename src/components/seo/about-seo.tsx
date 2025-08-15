import GenericSeo from "./generic-seo";
import { companyName, canonicalUrl } from "@/constants";

interface AboutSeoProps {
	description: string;
}
export default function AboutSeo({ description }: AboutSeoProps) {
	return (
		<GenericSeo
			title={`About | ${companyName}`}
			description={description}
			jsonLd={{
				"@context": "https://schema.org",
				"@type": "AboutPage",
				name: `About ${companyName}`,
				url: `${canonicalUrl}`,
				description: `${description}`,
			}}
		/>
	);
}
