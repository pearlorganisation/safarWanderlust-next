import React from 'react';
import ReviewTableRow from './ReviewTableRow';

const ReviewTable = ({ 
  reviews, 
  onEdit, 
  onDelete, 
  onLandingPageChange,
  isLoading
}) => {
  return (
    <div className="mt-8">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reviewer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rating
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Landing Page
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewTableRow
                key={review.id}
                review={review}
                onEdit={onEdit}
                onDelete={onDelete}
                onLandingPageChange={onLandingPageChange}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                {isLoading ? 'Loading reviews...' : 'No reviews found'}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F47521]" />
        </div>
      )}
    </div>
  );
};

export default ReviewTable;