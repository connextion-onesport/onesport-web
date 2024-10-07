import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {Skeleton} from '../ui/skeleton';

interface VenueBreadcrumbProps {
  name: string | undefined;
}

export default function VenueBreadcrumb({name = 'OneSport'}: VenueBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="flex-nowrap">
        <BreadcrumbItem className="whitespace-nowrap">
          <BreadcrumbLink asChild>
            <Link href="/">Beranda</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="whitespace-nowrap">
          <BreadcrumbLink asChild>
            <Link href="/venues">Sewa Lapangan</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="line-clamp-1">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function VenueBreadcrumbSkeleton() {
  return <Skeleton className="h-6 w-3/4 md:w-1/2 lg:w-1/3" />;
}
