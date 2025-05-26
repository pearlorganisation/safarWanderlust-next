import { ImageResponse } from 'next/og'

export const alt = 'About Itinerary'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }) {
    const id = params.id
    
    try {
        const res = await fetch(`https://65.2.122.145.nip.io/user/itineraries/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });
        console.log(`[OG IMAGE GEN SIMPLIFIED 1] API status for ${id}: ${res.status}`);

        if (!res.ok) {
            console.error(`[OG IMAGE GEN SIMPLIFIED 1] API fetch failed for ${id}: ${res.status}`);
            throw new Error(`API failed (status: ${res.status})`);
        }

        const post = await res.json();
        const project = post?.data;

        if (!project) {
            console.error(`[OG IMAGE GEN SIMPLIFIED 1] No project data (post.data) for ${id}.`);
            throw new Error('Project data missing.');
        }
        console.log(`[OG IMAGE GEN SIMPLIFIED 1] Project data for ${id}:`, JSON.stringify(project, null, 2));


        const imageUrl =  project?.view_images[0];
        console.log(`[OG IMAGE GEN SIMPLIFIED 1] Extracted imageUrl for ${id}: ${imageUrl}`);

        if (!imageUrl) {
            console.error(`[OG IMAGE GEN SIMPLIFIED 1] imageUrl is MISSING for ${id}! Will show text fallback.`);
            return new ImageResponse(
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'blue', color: 'white', fontSize: 30 }}>
                    Image URL not found for {project?.title || 'project'}.
                </div>,
                { ...size }
            );
        }

        console.log(`[OG IMAGE GEN SIMPLIFIED 1] Attempting to render image with src: ${imageUrl}`);
        return new ImageResponse(
            (
                <div style={{  
                    width: '100%',
                    height: '100%',
                    display: 'flex',  
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'lightgray',  
                }}>
                    <img
                        src={imageUrl}
                        alt="Project"  
                        width={size.width - 40} 
                        height={size.height - 40}
                        style={{
                            objectFit: 'contain',  
                        }}
                    />
                </div>
            ),
            {
                ...size,
             }
        );

    } catch (error) {
        console.error(`[OG IMAGE GEN SIMPLIFIED 1] CATCH BLOCK for ${slug}:`, error.message, error.stack);
        return new ImageResponse(
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'red', color: 'white', fontSize: 30, padding: 20, textAlign: 'center' }}>
                ERROR generating image for {id}: {error.message}
            </div>,
            { ...size }
        );
    }
}