/**
 * Common types used across the application
 * These types help maintain consistency and reduce duplication
 */

// Base page props for dynamic routes with slug parameter
export interface BasePageProps {
  params: Promise<{ slug: string }>;
}

// Extended page props that include search parameters
export interface PagePropsWithSearch {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined | null }>;
}

// Contact form data structure used across contact components
export interface ContactFormData {
  name: string;
  contact: string;
  email: string;
  howFindUs: string;
}

// Base component props that most components should extend
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Common form props pattern
export interface BaseFormProps {
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
}

// UTM tracking parameters used across the application
export interface UTMParams {
  utm_source?: string | string[] | null | undefined;
  utm_medium?: string | string[] | null | undefined;
  utm_campaign?: string | string[] | null | undefined;
}

// Generic modal props
export interface BaseModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

// Generic button props
export interface BaseButtonProps extends BaseComponentProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
