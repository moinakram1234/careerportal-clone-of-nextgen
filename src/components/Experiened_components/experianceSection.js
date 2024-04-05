import Head from 'next/head';
import { useEffect } from 'react';
import "aos/dist/aos.css"; // Import the AOS styles
import AOS from "aos";

export default function ExperiencedSection() {
 
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <Head>
        <title>Haidri Beverages - Our Culture</title>
        <meta name="description" content="Discover the vibrant culture at Haidri Beverages." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-4" style={{ color: 'white' }} data-aos="fade-right">Welcome to Haidri Beverages - Our Culture</h1>
        
        <section className="mb-8" data-aos="fade-up">
          <p style={{ color: 'white' }}>
            At Haidri Beverages, we embrace integrity, innovation, and teamwork in everything we do. 
            We celebrate diversity and foster an inclusive environment where everyone&apos;s voice is heard and valued. 
            We prioritize the well-being of our employees, promoting a healthy work-life balance and flexibility.
            We encourage continuous learning and growth, providing opportunities for development and advancement.
          </p>
        </section>

        <h2 className="text-2xl font-bold mb-2" style={{ color: 'white' }} data-aos="fade-up">Our Values in Action</h2>
        <section className="mb-8" data-aos="fade-up">
          <p style={{ color: 'white' }}>
            Our values are not just words on paper; they guide our actions every day. 
            We demonstrate integrity by always doing the right thing, even when it&apos;s difficult.
          </p>
          <p style={{ color: 'white' }}>
            Innovation drives us to explore new ideas and solutions, pushing the boundaries of what&apos;s possible.
          </p>
          <p style={{ color: 'white' }}>
            Teamwork is the cornerstone of our success. Together, we achieve more than we ever could alone.
          </p>
        </section>

        <section className="mb-8" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'white' }}>Community Engagement</h2>
          <p style={{ color: 'white' }}>
            Beyond our office walls, we&apos;re actively engaged in our community. 
            Through volunteer efforts and charitable initiatives, we strive to make a positive impact on the world around us.
            Through collaboration and mutual respect, we create a workplace where everyone feels valued and empowered to succeed.
          </p>
        </section>
      </main>
    </div>
  );
}
