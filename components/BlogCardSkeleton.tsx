
export default function BlogCardSkeleton() {
  return (
    <div className="blog-skeleton">
      <div className="skeleton-image" />
      <div className="skeleton-content">
        <div className="flex justify-between items-start mb-3">
          <div className="skeleton-line short h-6" />
          <div className="w-6 h-6 bg-gray-200 rounded-full" />
        </div>
        <div className="skeleton-line h-6 mb-2" />
        <div className="skeleton-line medium h-4 mb-4" />
        <div className="skeleton-line short h-4" />
      </div>
    </div>
  );
}
