import ItineraryPage from "@/components/User/itineraryPage/ItineraryPage";

export async function generateMetadata({
    params
}) {
    const res = await fetch(`https://65.2.122.145.nip.io/user/itineraries/${params?.id}`);
    const projectData = await res.json(); // Renamed to avoid conflict with 'project' variable name if you declare one later
    // console.log("the res is", projectData);
    const title = projectData?.data?.title ?? 'Project Preview';
    const description = projectData?.data?.description ?? "Explore this project";
    const pageUrl = `https://safarwanderlust.com/itinerary/${params.id}`; // The canonical URL of THIS page
    const ogImageUrl = `${pageUrl}/opengraph-image`; // The URL for the OG image itself

    return {
        title,
        openGraph: {
            title,
            description,
            type: 'website', // or 'article' if more appropriate
            locale: 'en_US',
            url: pageUrl,  
            images: [{
                    url: ogImageUrl,  
                    width: 1200,
                    height: 630,
                    alt: title,
                   
                },
        
            ],
            
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            // site: "@yourTwitterHandle", // Optional
            // creator: "@authorTwitterHandle", // Optional
            images: [ogImageUrl], // Correct: points to the image generation route
        },
       
    };
}



export default function page({ id }) {
    return <div>
        <ItineraryPage />
        {/* <Itinerary (admin)/> */ } 
    </div>
    // return 
}