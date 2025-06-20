export interface PageProps {
  params: Promise<{ slug: string }>,
  searchParams?: Promise<{ [key: string]: string | string[] | undefined | null }>;
}
export interface Notes {
  utm_source?: string| string[] | null | undefined;
  utm_medium?: string | string[] | null | undefined;
  utm_campaign?: string| string[] | null | undefined;
}