import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  schema?: Record<string, any> | Record<string, any>[];
}

export function SEOHead({
  title = "Drafter - AI-Powered Prenuptial Agreements | Private & Affordable",
  description = "Draft your prenup in 10 minutes with AI-powered legal technology. Private, secure, and attorney-ready for free. Protect your future with Drafter.",
  ogImage = "/og-image.png",
  ogType = "website",
  canonical,
  schema,
}: SEOHeadProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags helper
    const updateOrCreateMeta = (property: string, content: string, isOG: boolean = false) => {
      const attribute = isOG ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update meta description
    updateOrCreateMeta('description', description);
    updateOrCreateMeta('robots', 'index, follow');

    // Open Graph tags
    updateOrCreateMeta('og:title', title, true);
    updateOrCreateMeta('og:description', description, true);
    updateOrCreateMeta('og:image', ogImage, true);
    updateOrCreateMeta('og:type', ogType, true);
    updateOrCreateMeta('og:url', window.location.href, true);
    updateOrCreateMeta('og:site_name', 'Drafter', true);

    // Canonical link
    const ensureCanonicalLink = (href: string) => {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };
    const canonicalHref =
      canonical ||
      `${window.location.origin}${window.location.pathname}`.replace(/\/+$/, '') ||
      window.location.href;
    ensureCanonicalLink(canonicalHref);

    // Twitter Card tags
    updateOrCreateMeta('twitter:card', 'summary_large_image');
    updateOrCreateMeta('twitter:title', title);
    updateOrCreateMeta('twitter:description', description);
    updateOrCreateMeta('twitter:image', ogImage);

    // Manage schema.org JSON-LD - always remove old, then add new if provided
    const schemaId = 'schema-org-json';
    
    // Always remove any existing schema script first to avoid stale data
    const existingSchemaScript = document.getElementById(schemaId);
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }
    
    // Add new schema if provided
    if (schema) {
      const schemaScript = document.createElement('script');
      schemaScript.id = schemaId;
      schemaScript.type = 'application/ld+json';
      
      // Handle both single schema and array of schemas
      const schemaData = Array.isArray(schema) ? schema : [schema];
      schemaScript.textContent = JSON.stringify(schemaData);
      
      document.head.appendChild(schemaScript);
    }

    // Cleanup function - remove schema on unmount
    return () => {
      const schemaScript = document.getElementById(schemaId);
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [title, description, ogImage, ogType, schema, canonical]);

  return null;
}
