import Loader from "@/app/components/common/Loader";

export default function AdminLoading() {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="gap-4 mb-4">
            <Loader />
          </div>
        </div>
      </div>
    </>
  );
}
