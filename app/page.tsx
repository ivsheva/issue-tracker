import Pagination from "./components/pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <div>
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={Number(searchParams.page)}
      />
    </div>
  );
}
