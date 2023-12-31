import { Skeleton } from "./ui/skeleton";

interface skeletonProps {
  noOfSuggestions: number;
}

const SugesstionsSkeleton: React.FC<skeletonProps> = ({ noOfSuggestions }) => {
  return (
    <>
      {Array(noOfSuggestions).fill(
        <Skeleton className="w-28 py-4 rounded mr-3 mt-2.5 inline-flex" />
      )}
    </>
  );
};

const CategoriesSkeleton: React.FC<skeletonProps> = ({ noOfSuggestions }) => {
  return (
    <>
      {Array(noOfSuggestions).fill(
        <Skeleton className="w-full py-6 rounded mr-3 mt-2.5" />
      )}
    </>
  );
};

const ProductsSkeleton: React.FC<skeletonProps> = ({ noOfSuggestions }) => {
  return (
    <div className="space-y-3 px-2">
      {Array(noOfSuggestions).fill(
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Skeleton className="w-11 p-6 rounded " />
          <div className="w-full flex flex-col justify-between">
            <Skeleton className="w-full p-1.5 rounded " />
            <Skeleton className="w-1/2 p-3 rounded " />
          </div>
        </div>
      )}
    </div>
  );
};

const BrandsSkeleton: React.FC<skeletonProps> = ({ noOfSuggestions }) => {
  return (
    <div className="flex justify-between w-full col-span-full">
      {Array(noOfSuggestions).fill(
        <Skeleton className="w-14 p-10 rounded-lg " />
      )}
    </div>
  );
};

const SingleDoctorSkelton: React.FC<skeletonProps> = ({ noOfSuggestions }) => {
  return (
    <>
      {Array(noOfSuggestions).fill(
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Skeleton className="h-56 p-7  rounded-sm w-1/3" />
          <div className="w-full flex flex-col justify-between">
            <div className="flex flex-col space-y-3">
              <Skeleton className="w-full p-5 rounded-sm " />
              <Skeleton className="w-1/3 p-3 rounded-sm " />
            </div>
            <Skeleton className="w-1/3 p-6 rounded-sm " />
            <Skeleton className="w-1/3 p-3 rounded-sm " />
          </div>
        </div>
      )}
    </>
  );
};

const RadioGroupSkeleton: React.FC<skeletonProps> = ({ noOfSuggestions }) => {
  return (
    <>
      {Array(noOfSuggestions).fill(
        <div className="flex space-x-2 rtl:space-x-reverse items-center mb-2">
          <Skeleton className=" p-4   w-3 h-3 rounded-full" />

          <Skeleton className="w-3/4 p-3 rounded-md " />
        </div>
      )}
    </>
  );
};

export {
  SugesstionsSkeleton,
  ProductsSkeleton,
  BrandsSkeleton,
  SingleDoctorSkelton,
  RadioGroupSkeleton,
  CategoriesSkeleton,
};
