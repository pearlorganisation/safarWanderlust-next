import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../.../../../../../redux/thunks/fetchReviews';
import ReviewCard from './components/ReviewCard';
import ReviewSkeleton from './components/ReviewSkeleton';
import ReviewHeader from './components/ReviewHeader';

// CSS for hiding scrollbars
const styles = `
  .reviews-scrollbar-hide {
    scrollbar-width: none;  /* Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
  }
  
  .reviews-scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */x
  }
`;

const ReviewSection = ({ page = 'home', itineraryId = null }) => {
  const reviewContainerRef = useRef(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef(null);


    // Setup intersection observer
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const target = entries[0];
          if (target.isIntersecting && !isLoading && hasMore) {
            setPageNum(prev => prev + 1);
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1
        }
      );
  
      if (loadMoreRef.current) {
        observer.observe(loadMoreRef.current);
      }
  
      return () => observer.disconnect();
    }, [isLoading, hasMore]);

    const loadReviews = useCallback(async (currentPage) => {
      try {
        const params = {
          page: currentPage,
          ...(page === 'home' && { isLandingPage: true }),
          ...(page === 'itinerary' && { itineraryId })
        };
  
        const result = await dispatch(
          fetchReviews(params.page, params.isLandingPage, params.itineraryId)
        );
        
        if (!result.success || result.reviews?.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error loading reviews:', error);
        setHasMore(false);
      }
    }, [dispatch, page, itineraryId]);
  
    // Load more reviews when page changes
    useEffect(() => {
      if (pageNum > 1) {
        loadReviews(pageNum);
      }
    }, [pageNum, loadReviews]);

      // Initial load
  useEffect(() => {
    setIsLoading(true);
    loadReviews(1).finally(() => setIsLoading(false));
  }, [loadReviews]);

  const reviews = useSelector((state) => {
    if (page === 'home') {
      return state.global.landingPageReviews || [];
    } else if (page === 'itinerary' && itineraryId) {
      return state.global[`itineraryReviews_${itineraryId}`] || [];
    }
    return [];
  });

  if (isLoading) {
    return (
      <div className="bg-white py-6 md:py-8">
        <div className="p-4 text-left md:p-8">
          <div className="mb-4 md:mb-6">
            <div className="h-8 w-48 bg-gray-100 rounded animate-pulse mb-3" />
            {page === 'home' && (
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="h-6 w-6 bg-gray-100 rounded animate-pulse"
                    />
                  ))}
                </div>
                <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
              </div>
            )}
          </div>

          <div className="relative h-[calc(100vh-200px)] md:h-auto">
            <div className="flex flex-col md:flex-row items-stretch md:space-x-6 space-y-4 md:space-y-0 
              md:overflow-x-auto md:no-scrollbar max-h-full overflow-y-auto md:overflow-y-visible
              px-1 md:px-2 pb-6 md:pb-4 pt-2">
              {[...Array(3)].map((_, index) => (
                <ReviewSkeleton key={index} page={page} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <>
      <style>{styles}</style>
      <div className="bg-white py-4 md:py-8">
        <div className="px-4 md:px-8">
          <ReviewHeader page={page} />
          
          <div className="relative">
            <div
              ref={reviewContainerRef}
              className="flex flex-row items-stretch 
                space-x-3 md:space-x-6 
                overflow-x-auto reviews-scrollbar-hide
                px-1 md:px-2 
                pb-6 md:pb-4 
                pt-2
                snap-x snap-mandatory"
            >
              {reviews.map((review, index) => (
                <ReviewCard 
                  key={review.id || index} 
                  review={review} 
                  page={page} 
                />
              ))}
              
              {/* Loading trigger element */}
              {hasMore && (
                <div 
                  ref={loadMoreRef}
                  className="w-1 flex-shrink-0"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default ReviewSection;