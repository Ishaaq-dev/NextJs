import { fetchCustomersPages } from '@/app/lib/data';
import Table from '@/app/ui/customers/table';
import { Metadata } from 'next';
import Pagination from '@/app/ui/invoices/pagination';


export const metadata: Metadata = {
  title: 'Customers'
};
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCustomersPages(query);

    return (
      <div className='w-full'>
        {/* <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
        </div> */}
        {/* <Search placeholder="Search customers..." /> */}
        <Table  query={query} currentPage={currentPage}/>
        <div className="mt-5 flex w-full justify-center"> 
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    )
  }