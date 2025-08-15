import React from "react";
import Slideshow from "@/components/slideshow";
import styles from "@/styles/playground.module.css";
import BigCartelWidget from "@/components/big-cartel-widget";
import InstagramFeed from "@/components/instagram-feed";

export async function getStaticProps() {
	try {
		const res = await fetch(
			"https://harborviewwebdesign.bigcartel.com/products.json"
		);

		if (!res.ok) {
			console.error("Failed to fetch products. Status:", res.status);
			return { props: { products: [] }, revalidate: 3600 };
		}

		const text = await res.text();
		console.log("Response from Big Cartel:", text);
		if (!text || text.trim() === "") {
			console.warn("Empty response from Big Cartel");
			return { props: { products: [] }, revalidate: 3600 };
		}

		let products = [];
		try {
			products = JSON.parse(text);
		} catch (jsonError) {
			console.error("Invalid JSON from Big Cartel:", jsonError);
			return { props: { products: [] }, revalidate: 3600 };
		}

		return {
			props: { products },
			revalidate: 3600,
		};
	} catch (error) {
		console.error("Error fetching products:", error);
		return { props: { products: [] }, revalidate: 3600 };
	}
}
