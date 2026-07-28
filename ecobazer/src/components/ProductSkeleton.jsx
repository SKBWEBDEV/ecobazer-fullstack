const ProductSkeleton = () => {
  return (
    <div className="h-96 bg-red-500">
      
      {/* Image */}
      <div className="h-48 rounded-xl bg-gray-200 dark:bg-gray-700"></div>

      {/* Title */}
      <div className="mt-4 h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>

      {/* Description */}
      <div className="mt-2 h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>

      {/* Price */}
      <div className="mt-3 h-6 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>

      {/* Button */}
      <div className="mt-4 h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700"></div>

    </div>
  );
};

export default ProductSkeleton;