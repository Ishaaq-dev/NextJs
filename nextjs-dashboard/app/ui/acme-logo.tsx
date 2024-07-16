import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { auth } from "@/auth"

export default async function AcmeLogo() {
  const session = await auth();
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <AcademicCapIcon className="h-12 w-12" />
      <p className="text-[44px]">{session?.user?.name}</p>
    </div>
  );
}
