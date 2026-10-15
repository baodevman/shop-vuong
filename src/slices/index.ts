import dynamic from 'next/dynamic';

export const components = {
  hero_banner: dynamic(() => import('./HeroBanner')),
  featured_collection: dynamic(() => import('./FeaturedCollection')),
  lookbook: dynamic(() => import('./Lookbook')),
  brand_story: dynamic(() => import('./BrandStory')),
};
