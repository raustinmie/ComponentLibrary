import Head from "next/head";
import { canonicalUrl, ogImagePath } from "@/constants";
import {
	WithContext,
	WebSite,
	Organization,
	Article,
	WebPage,
	Service,
	Blog,
} from "schema-dts";

type JsonLdType =
	| WithContext<WebSite>
	| WithContext<Organization>
	| WithContext<Article>
	| WithContext<WebPage>
	| WithContext<Blog>
	| WithContext<Service>;

interface SeoProps {
	title: string;
	description: string;
	canonicalUrlPath?: string;
	ogType?: string;
	twitterCard?: string;
	noIndex?: boolean; // Set to true for cart, search, login, thank you, or dashboard pages.
	jsonLd?: JsonLdType | JsonLdType[];
}

export default function GenericSeo({
	title,
	description,
	canonicalUrlPath,
	ogType = "website",
	twitterCard = "summary_large_image",
	noIndex = false,
	jsonLd,
}: SeoProps) {
	return (
		<Head>
			{/* Primary Meta Tags */}
			<title key="seo-title">{title}</title>
			<meta key="seo-description" name="description" content={description} />

			{noIndex && <meta name="robots" content="noindex,nofollow" />}

			{/* Canonical */}
			{!noIndex && (
				<link
					key="canonical-url"
					rel="canonical"
					href={`${canonicalUrl}${canonicalUrlPath}`}
				/>
			)}

			{/* Open Graph */}
			{!noIndex && (
				<>
					<meta key="og-title" property="og:title" content={title} />
					<meta
						key="og-description"
						property="og:description"
						content={description}
					/>
					<meta key="og-type" property="og:type" content={ogType} />
					<meta
						key="og-url"
						property="og:url"
						content={`${canonicalUrl}${canonicalUrlPath}`}
					/>
					<meta key="og-image" property="og:image" content={ogImagePath} />
					{/* Twitter */}
					<meta key="twitter-card" name="twitter:card" content={twitterCard} />
					<meta key="twitter-title" name="twitter:title" content={title} />
					<meta
						key="twitter-description"
						name="twitter:description"
						content={description}
					/>
					{ogImagePath && (
						<meta
							key="twitter-image"
							name="twitter:image"
							content={ogImagePath}
						/>
					)}
					{/* Structured Data (JSON-LD) */}
					{jsonLd &&
						(Array.isArray(jsonLd) ? (
							jsonLd.map((data, i) => (
								<script
									key={i}
									type="application/ld+json"
									dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
								/>
							))
						) : (
							<script
								type="application/ld+json"
								dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
							/>
						))}
				</>
			)}
		</Head>
	);
}
