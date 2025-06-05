import React from 'react';
import ItineraryPage from './HelperComponent'; // Assuming HelperComponent exists
import Head from 'next/head';
import Script from 'next/script';

// generateMetadata will handle basic title, description, canonical, and OG tags
export async function generateMetadata({ params }) {
    const id = await params?.id;

    if (!id) {
        return {
            title: 'Project Preview',
            description: 'Explore this project',
        };
    }

    let projectApiResponse;
    try {
        // Fetch data for title, description, etc.
        const res = await fetch(`https://65.2.122.145.nip.io/user/itineraries/${id}`);
        if (!res.ok) {
            console.error(`Metadata: Failed to fetch itinerary data for ID ${id}: ${res.status} ${res.statusText}`);
            return {
                title: 'Itinerary Not Found',
                description: 'The requested itinerary could not be found or there was an error.',
                robots: { index: false, follow: false }
            };
        }
        projectApiResponse = await res.json();
    } catch (error) {
        console.error(`Metadata: Network or parsing error for ID ${id}:`, error);
        return {
            title: 'Error Loading Itinerary',
            description: 'There was an error loading the itinerary details.',
            robots: { index: false, follow: false }
        };
    }

    const projectData = projectApiResponse?.data;
    const title = projectData?.title ?? 'Project Preview';
    const description = projectData?.shortDescription ?? "Explore this project";
    const baseUrl = 'https://safarwanderlust.com'; // Use your production base URL
    const pageUrl = `${baseUrl}/itinerary/${id}`;

    return {
        title,
        description,
        alternates: {
            canonical: pageUrl,
        },
          
    };
}


// Your page component will now render the JSON-LD script
const PageComponent = async ({ params }) => {
    const id = await params?.id;

    if(!id)
         return;
    let itineraryDataForJsonLd = null; // Data specifically for JSON-LD

    // Default values for JSON-LD if fetch fails or ID is missing
    let jsonLdTitle = 'Project Preview';
    let jsonLdDescription = 'Explore this project';
    const baseUrl = 'https://safarwanderlust.com';
    let jsonLdPageUrl = id ? `${baseUrl}/itinerary/${id}` : baseUrl;

    if (id) {
        try {

            const res = await fetch(`https://65.2.122.145.nip.io/user/itineraries/${id}`);
            if (res.ok) {
                const apiResponse = await res.json();
                itineraryDataForJsonLd = apiResponse?.data;
                if (itineraryDataForJsonLd) {
                    jsonLdTitle = itineraryDataForJsonLd.title ?? jsonLdTitle;
                    jsonLdDescription = itineraryDataForJsonLd.shortDescription ?? jsonLdDescription;
                    // pageUrl is already constructed based on id
                }
            } else {
                console.error(`PageComponent: Failed to fetch itinerary data for ID ${id}: ${res.status}`);
                // Use default values or specific error values for JSON-LD
                jsonLdTitle = 'Itinerary Not Found';
                jsonLdDescription = 'The requested itinerary could not be found.';
            }
        } catch (error) {
            console.error(`PageComponent: Network or parsing error for ID ${id}:`, error);
            jsonLdTitle = 'Error Loading Itinerary';
            jsonLdDescription = 'Error loading details for JSON-LD.';
        }
    }

    // Construct the JSON-LD object using data fetched/derived in this component
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage", // Or more specific type like "TouristTrip"
        "name": jsonLdTitle,
        "url": jsonLdPageUrl,
        "description": jsonLdDescription,
        "publisher": {
            "@type": "Organization",
            "name": "Safar Wanderlust",
            "url": "https://www.safarwanderlust.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://safarwanderlust.com/assets/safar_wanderlust_bag_icon-DOgRAhLv.webp"
            }
        }
    };

    return (
        <div>



            <ItineraryPage ldData={structuredData}  />
        </div>
    );
}

export default PageComponent;