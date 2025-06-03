
import Image from 'next/image';
import Link from 'next/link';

interface ContentSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  backgroundColor?: string;
}

export default function ContentSection({
  title,
  description,
  buttonText,
  buttonHref,
  imageSrc,
  imageAlt,
  imagePosition = 'right',
  backgroundColor = 'bg-flat-surface'
}: ContentSectionProps) {
  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
          imagePosition === 'left' ? 'lg:grid-flow-col-dense' : ''
        }`}>
          {/* Content */}
          <div className={imagePosition === 'left' ? 'lg:col-start-2' : ''}>
            <h2 className="text-3xl lg:text-4xl font-bold text-flat-text-primary mb-6 flat-text-heading">
              {title}
            </h2>
            <p className="text-lg text-flat-text-secondary mb-8 leading-relaxed flat-text-body">
              {description}
            </p>
            <Link 
              href={buttonHref}
              className="inline-block bg-flat-btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-flat-btn-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {buttonText}
            </Link>
          </div>

          {/* Image */}
          <div className={`relative ${imagePosition === 'left' ? 'lg:col-start-1' : ''}`}>
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-300 rounded-full opacity-80"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full opacity-60"></div>
              <div className="absolute top-1/2 -right-6 w-4 h-4 bg-yellow-200 rounded-full opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
