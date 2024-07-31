import { Metadata } from 'next';
import NextImage from 'next/image';
import Link from 'next/link';
import { getHomePageContents } from '@/lib/queries/contents';
import Image from '@/components/image';
import companyLogo from '@/assets/logo.svg';
import HeroSection from './hero-section';

export const metadata: Metadata = {
  title: 'One Engage: Expert Customer Engagement Solutions for Businesses',
  description: 'Expert Customer Engagement Solutions for Businesses',
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const contents = await getHomePageContents();

  return (
    <div>
      <nav className='flex items-center justify-between px-28 py-10'>
        <NextImage src={companyLogo} alt='One Engage Logo' className='h-10 w-auto' />
        <ul className='flex items-center gap-12'>
          <li>
            <Link className='font-semibold uppercase text-primary transition-all' href='/'>
              Home
            </Link>
          </li>
          <li>
            <Link className='uppercase text-primary transition-all' href='/'>
              About Us
            </Link>
          </li>
          <li>
            <Link className='uppercase text-primary transition-all' href='/'>
              Our Services
            </Link>
          </li>
          <li>
            <Link className='uppercase text-primary transition-all' href='/'>
              Blog
            </Link>
          </li>
          <li>
            <Link className='uppercase text-primary transition-all' href='/'>
              Careers
            </Link>
          </li>
          <li>
            <Link className='uppercase text-primary transition-all' href='/'>
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>

      <HeroSection sliders={contents.sliders} />

      {contents.pageContent && (
        <section className='grid grid-cols-2 items-center bg-[#FFDF9F] px-24 py-24'>
          <div className='space-y-10'>
            <p className='text-xl font-semibold'>{contents.pageContent.title}</p>
            <p>
              Contact us today to discuss your requirements, and let's embark on a journey towards
              extraordinary customer engagement and growth.
            </p>
            <button className='flex h-10 cursor-pointer items-center rounded-3xl border border-primary bg-transparent px-8 py-2 text-primary'>
              Contact Us
              <svg
                className='ml-2'
                width='14'
                height='8'
                viewBox='0 0 14 8'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5V3.5ZM13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM1 4.5H13V3.5H1V4.5Z'
                  fill='currentColor'
                />
              </svg>
            </button>
          </div>
          <div className='flex items-center justify-center'>
            <Image className='h-[25rem] w-auto' image={contents.pageContent.image} />
          </div>
        </section>
      )}

      <section className='grid grid-cols-2 bg-white px-24 py-24'>
        <div className='space-y-10'>
          <h2 className='text-4xl font-extrabold text-primary'>Who We Are</h2>
          <p className='text-xl font-semibold'>
            We are a leading business process outsourcing company with a passion for delivering
            exceptional customer engagement solutions.
          </p>
          <p>
            Contact us today to discuss your requirements, and let's embark on a journey towards
            extraordinary customer engagement and growth.
          </p>
          <button className='flex h-10 items-center rounded-3xl border border-primary bg-transparent px-8 py-2 text-primary'>
            Contact Us
            <svg
              className='ml-2'
              width='14'
              height='8'
              viewBox='0 0 14 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5V3.5ZM13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM1 4.5H13V3.5H1V4.5Z'
                fill='currentColor'
              />
            </svg>
          </button>
        </div>
      </section>

      <section className='grid grid-cols-2 bg-primary px-24 py-24 text-primary-foreground'>
        <h2 className='col-span-2 mb-12 text-center text-4xl font-extrabold'>What We Offer</h2>
        <div className='space-y-10'>
          <p className='text-xl font-semibold'>
            We are a leading business process outsourcing company with a passion for delivering
            exceptional customer engagement solutions.
          </p>
          <p>
            Contact us today to discuss your requirements, and let's embark on a journey towards
            extraordinary customer engagement and growth.
          </p>
          <button className='flex h-10 items-center rounded-3xl border border-primary bg-transparent px-8 py-2 text-primary'>
            Contact Us
            <svg
              className='ml-2'
              width='14'
              height='8'
              viewBox='0 0 14 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5V3.5ZM13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM1 4.5H13V3.5H1V4.5Z'
                fill='currentColor'
              />
            </svg>
          </button>
        </div>
        <div></div>
      </section>
    </div>
  );
}
