import Image from 'next/image';
import styles from './WhyChooseUs.module.css';

const FeaturesSection = () => {
    return (
        <section className={styles.featuresSection} aria-labelledby="features-heading">
            <div className={styles.container}>
                <header className={styles.sectionHeader}>
                    <h2 id="features-heading" className={styles.mainTitle}>
                        Why Choose Our Platform
                    </h2>
                    <p className={styles.subtitle}>
                        Discover the key features that make us the preferred choice for professionals worldwide
                    </p>
                </header>

                <div className={styles.cardsContainer}>
                    <article className={styles.card} itemScope itemType="https://schema.org/Service">
                        <div className={styles.cardImageWrapper}>
                            <Image
                                src="https://i.ibb.co/JR8qpTLf/Ellipse-6.png"
                                alt="Curated experiences illustration"
                                width={221}
                                height={221}
                                className={styles.cardImage}
                                priority
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <h3 itemProp="name" className={styles.cardTitle}>
                                Curated Experiences
                            </h3>
                            <p itemProp="description" className={styles.cardDescription}>
                                Handpicked trips designed for professional growth and meaningful collaboration opportunities.
                            </p>
                        </div>
                    </article>

                    <article className={styles.card} itemScope itemType="https://schema.org/Service">
                        <div className={styles.cardImageWrapper}>
                            <Image
                                src="https://i.ibb.co/CpcDq7Hj/Ellipse-5.png"
                                alt="Global community network illustration"
                                width={221}
                                height={221}
                                className={styles.cardImage}
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <h3 itemProp="name" className={styles.cardTitle}>
                                Global Community
                            </h3>
                            <p itemProp="description" className={styles.cardDescription}>
                                Collaborate with a diverse network of entrepreneurs, freelancers, and corporate leaders worldwide.
                            </p>
                        </div>
                    </article>

                    <article className={styles.card} itemScope itemType="https://schema.org/Service">
                        <div className={styles.cardImageWrapper}>
                            <Image
                                src="https://i.ibb.co/DHnvpgRb/Ellipse-7.png"
                                alt="Authentic networking opportunities illustration"
                                width={221}
                                height={221}
                                className={styles.cardImage}
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <h3 itemProp="name" className={styles.cardTitle}>
                                Authentic Networking
                            </h3>
                            <p itemProp="description" className={styles.cardDescription}>
                                Build real, lasting professional relationships through shared experiences and genuine connections.
                            </p>
                        </div>
                    </article>

                    <div className={styles.backgroundElement} aria-hidden="true">
                        <Image
                            src="https://i.ibb.co/XrfQgW33/Elements.png"
                            alt=""
                            width={400}
                            height={300}
                            className={styles.backgroundImage}
                        />
                    </div>
                </div>

                {/* Animated background elements */}
                <div className={styles.floatingElements} aria-hidden="true">
                    <div className={`${styles.floatingDot} ${styles.dot1}`}></div>
                    <div className={`${styles.floatingDot} ${styles.dot2}`}></div>
                    <div className={`${styles.floatingDot} ${styles.dot3}`}></div>
                    <div className={`${styles.floatingDot} ${styles.dot4}`}></div>
                </div>
            </div>
        </section>
    );
};
const FeaturesSection2 = () => {
    return (
        <section className={styles.featuresSection} aria-labelledby="features-heading">
            <div className={styles.container}>
                <header className={styles.sectionHeader}>
                    <h2 id="features-heading" className={styles.mainTitle}>
                        Why Choose Our Platform
                    </h2>
                    <p className={styles.subtitle}>
                        Discover the key features that make us the preferred choice for professionals worldwide
                    </p>
                </header>

                <div className={styles.cardsContainer}>
                    <article className={styles.card} itemScope itemType="https://schema.org/Service">
                        <div className={styles.cardImageWrapper}>
                            <Image
                                src="/discovery/d555.png"
                                alt="Curated experiences illustration"
                                width={500}
                                height={500}
                                className={styles.cardImage}
                                priority
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <h3 itemProp="name" className={styles.cardTitle}>

                                Freelancers and Consultants
                            </h3>
                            <p itemProp="description" className={styles.cardDescription}>

                                Collaborate on projects and reach untapped markets. </p>
                        </div>
                    </article>
                    <article className={styles.card} itemScope itemType="https://schema.org/Service">
                        <div className={styles.cardImageWrapper}>
                            <Image
                                src="/discovery/d5.png"
                                alt="Global community network illustration"
                                width={500}
                                height={500}
                                className={styles.cardImage}
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <h3 itemProp="name" className={styles.cardTitle}>
                                Entrepreneurs and Business Owners
                            </h3>
                            <p itemProp="description" className={styles.cardDescription}>
                                Expand networks and explore new partnerships. </p>
                        </div>
                    </article>

                    <article className={styles.card} itemScope itemType="https://schema.org/Service">
                        <div className={styles.cardImageWrapper}>
                            <Image
                                src="/discovery/d5555.png"
                                alt="Authentic networking opportunities illustration"
                                width={500}
                                height={500}
                                className={styles.cardImage}
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <h3 itemProp="name" className={styles.cardTitle}>
                                Corporate Professionals
                            </h3>
                            <p itemProp="description" className={styles.cardDescription}>
                                Build strategic alliances and gain insights into emerging trends. </p>
                        </div>
                    </article>

                    <div className={styles.backgroundElement} aria-hidden="true">
                        <Image
                            src="https://i.ibb.co/XrfQgW33/Elements.png"
                            alt=""
                            width={400}
                            height={300}
                            className={styles.backgroundImage}
                        />
                    </div>
                </div>

                {/* Animated background elements */}
                <div className={styles.floatingElements} aria-hidden="true">
                    <div className={`${styles.floatingDot} ${styles.dot1}`}></div>
                    <div className={`${styles.floatingDot} ${styles.dot2}`}></div>
                    <div className={`${styles.floatingDot} ${styles.dot3}`}></div>
                    <div className={`${styles.floatingDot} ${styles.dot4}`}></div>
                </div>
            </div>
        </section>
    );
};

export { FeaturesSection2 };

export default FeaturesSection;