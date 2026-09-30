import React from 'react';
import { Helmet } from 'react-helmet-async';

export const PageSEO = ({
  title,
  description = 'Ansh Singh — Full Stack MERN Developer building scalable, high-performance web applications with React, Node.js, Express, and MongoDB.',
  keywords = 'MERN Stack, React Developer, Node.js, Express, MongoDB, Portfolio, Full Stack Engineer',
  pathname = '',
}) => {
  const siteTitle = title
    ? `${title} | Ansh Singh — Full Stack MERN Developer`
    : 'Ansh Singh | Full Stack MERN Developer — Portfolio';

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {pathname && <link rel="canonical" href={`https://anshtech.dev${pathname}`} />}
    </Helmet>
  );
};

