import { fetchCustomerById, fetchCustomers } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/customers/breadcrumbs';
import Form from '@/app/ui/customers/edit-form';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Customer'
};

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    if (!id) {
        notFound();
    }
    const customer = await fetchCustomerById(id);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Customers', href: '/dashboard/customers'},
                    {
                        label: 'Edit Customer',
                        href: `/dashboard/customers/${id}/edit`,
                        active: true,
                    }
                ]}
            />
            <Form customer={customer} />
        </main>
    )
}
