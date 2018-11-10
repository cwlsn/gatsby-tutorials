function Base({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              description
              language
              locale
              title
              twitterHandle
              siteUrl
            }
          }
          gatsbyIcon: file(relativePath: { eq: "images/gatsby-icon.png" }) {
            childImageSharp {
              fluid(maxWidth: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          tutorials: allTutorialsYaml {
            edges {
              node {
                title
              }
            }
          }
        }
      `}
      render={data => (
        <>
          <SiteMetadata site={data.site.siteMetadata} />

          <Header icon={data.gatsbyIcon} count={data.tutorials.edges.length} />

          {children}

          <Footer />

          {/* <StructuredData site={data.site.siteMetadata} /> */}
        </>
      )}
    />
  )
}

/*
 *
 * Global styles & preloaded static assets
 *
 */

import '../styles/index.css'

/*
 *
 * Metadata
 *
 */

import siteImage from '../images/placeholder.jpg'

function SiteMetadata({ site }) {
  return (
    <Helmet>
      {/* HTML language */}
      <html itemScope itemType="http://schema.org/WebPage" lang={site.language} />

      {/* Title comes first (meta charset and viewport are automatically included) */}
      <title itemProp="name" lang={site.language}>
        {site.title}
      </title>

      {/* Search engine */}
      <meta name="description" content={site.description} />
      <meta name="image" content={site.siteUrl + siteImage} />
      <link rel="canonical" href={site.siteUrl} />

      {/* Preconnect to external data sources */}
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />

      {/* Schema.org for Google */}
      <meta itemProp="name" content={site.title} />
      <meta itemProp="description" content={site.description} />
      <meta itemProp="image" content={site.siteUrl + siteImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={site.title} />
      <meta name="twitter:description" content={site.description} />
      <meta name="twitter:image" content={site.siteUrl + siteImage} />

      {/* Open Graph general (Facebook, Pinterest, Slack & Google+) */}
      <meta property="og:title" content={site.title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={site.siteUrl} />
      <meta property="og:image" content={site.siteUrl + siteImage} />
      <meta property="og:description" content={site.description} />
      <meta property="og:site_name" content={site.title} />
      <meta property="og:locale" content={site.locale} />

      {/* Non-essential, but required for analytics */}
      {site.facebookAppId && (
        <meta property="fb:app_id" content={site.facebookAppId} />
      )}
      {site.twitterHandle && (
        <meta name="twitter:site" content={site.twitterHandle} />
      )}
    </Helmet>
  )
}

/*
 *
 * Structured Data
 *
 */

function StructuredData({ site }) {
  const structuredData = `{
    "@context": "http://schema.org",
    "@type": "Person",
    "email": "mailto:email@website.com",
    "image": "${site.siteUrl + siteImage.replace(`js/../`, ``)}",
    "jobTitle": "What they do",
    "name": "Their name",
    "url": "${site.siteUrl}",
    "sameAs": [
      "https://www.facebook.com/clientname",
      "https://twitter.com/clientname",
      "https://www.youtube.com/channel/clientchannel"
    ]
  }`

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: structuredData }}
    />
  )
}

/*
 *
 * Imports & Exports
 *
 */

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Header from '../sections/Header'
import Footer from '../sections/Footer'

export default Base