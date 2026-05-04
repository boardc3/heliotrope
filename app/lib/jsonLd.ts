import { ADDRESS, PROPERTY, SHORT_ADDRESS, SITE_NAME } from "../data/property";

export function listingJsonLd(siteUrl: string) {
  const images = [
    `${siteUrl}/img/exterior/ext-02-1920.jpg`,
    `${siteUrl}/img/great-room/gr-01-1920.jpg`,
    `${siteUrl}/img/kitchen/kt-03-1920.jpg`,
    `${siteUrl}/img/adu/adu-01-1920.jpg`,
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        "@id": `${siteUrl}/#listing`,
        name: `${ADDRESS} showcase`,
        headline: "A reimagined Corona del Mar duplex one block from village dining.",
        description:
          "A cinematic showcase for 437 Heliotrope Avenue, a two-residence Corona del Mar property positioned for refined coastal living, income flexibility, and walkable village access.",
        datePosted: "2026-05-03",
        image: images,
        url: siteUrl,
        about: { "@id": `${siteUrl}/#residence` },
      },
      {
        "@type": "SingleFamilyResidence",
        "@id": `${siteUrl}/#residence`,
        name: SHORT_ADDRESS,
        numberOfBedrooms: PROPERTY.bedrooms,
        numberOfBathroomsTotal: PROPERTY.bathrooms,
        floorSize: { "@type": "QuantitativeValue", value: PROPERTY.livingArea, unitText: "SQFT" },
        lotSize: { "@type": "QuantitativeValue", value: PROPERTY.lotAcres, unitText: "AC" },
        amenityFeature: ["Duplex", "Unit B", "Village walkability", "Coastal proximity", "Aerial context"].map((name) => ({
          "@type": "LocationFeatureSpecification",
          name,
          value: true,
        })),
        address: { "@id": `${siteUrl}/#place` },
        photo: images.map((url) => ({ "@type": "ImageObject", url })),
      },
      {
        "@type": "Place",
        "@id": `${siteUrl}/#place`,
        name: ADDRESS,
        address: {
          "@type": "PostalAddress",
          streetAddress: PROPERTY.street,
          addressLocality: PROPERTY.city,
          addressRegion: PROPERTY.region,
          postalCode: PROPERTY.postalCode,
          addressCountry: "US",
        },
        geo: { "@type": "GeoCoordinates", latitude: PROPERTY.coords[1], longitude: PROPERTY.coords[0] },
        hasMap: `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: SITE_NAME,
        url: siteUrl,
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        name: `${SHORT_ADDRESS} property showcase`,
        url: siteUrl,
        isPartOf: { "@id": `${siteUrl}/#website` },
        primaryImageOfPage: { "@type": "ImageObject", url: images[0] },
        breadcrumb: { "@id": `${siteUrl}/#breadcrumbs` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Newport Beach", item: "https://www.newportbeachca.gov/" },
          { "@type": "ListItem", position: 2, name: "Corona del Mar", item: siteUrl },
          { "@type": "ListItem", position: 3, name: SHORT_ADDRESS, item: siteUrl },
        ],
      },
    ],
  };
}
