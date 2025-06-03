import Link from 'next/link';

interface ContentSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  videoUrl: string;
  videoTitle: string;
  imagePosition?: 'left' | 'right';
  backgroundColor?: string;
}

export default function ContentSection({
  title,
  description,
  buttonText,
  buttonHref,
  videoUrl,
  videoTitle,
  imagePosition = 'right',
  backgroundColor = 'bg-flat-surface'
}: ContentSectionProps) {
  // Convert YouTube URL to embed format
  const getEmbedUrl = (url: string) => {
    const videoId = url.split('youtu.be/')[1] || url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

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

          {/* YouTube Video */}
          <div className={`relative ${imagePosition === 'left' ? 'lg:col-start-1' : ''}`}>
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={getEmbedUrl(videoUrl)}
                title={videoTitle}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
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


import Image from 'next/image';
interface ContentSectionProps2 {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  backgroundColor?: string;
}

export function ContentSection2({
  title,
  description,
  buttonText,
  buttonHref,
  imageSrc,
  imageAlt,
  imagePosition = 'right',
  backgroundColor = 'bg-flat-surface'
}: ContentSectionProps2) {
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
            <div className="relative rounded-2xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={600}
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
