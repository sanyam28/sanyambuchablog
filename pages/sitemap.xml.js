import dbConnect from "../middleware/mongoose";
import Blog from "../models/Blog";

function generateSiteMap(blogs) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
          <loc>${process.env.NEXT_BASE_PUBLIC_URL}</loc>
          <lastmod>2023-12-25T14:52:10.968Z</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
        </url>
<url>
          <loc>${process.env.NEXT_BASE_PUBLIC_URL}/blogs</loc>
          <lastmod>2023-12-25T14:52:10.968Z</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
        </url>
  ${blogs
        .map((blog) => {
            return `
        <url>
          <loc>${`${process.env.NEXT_BASE_PUBLIC_URL}/blogs/${blog.slug}`}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
        </url>
      `;
        })
        .join('')}
</urlset>
 `;
}
function SiteMap() {}

export async function getServerSideProps({ res }) {
  await dbConnect();
  const rawblogs = await Blog.find().select('slug');
  const blogs = JSON.parse(JSON.stringify(rawblogs))

  const sitemap = generateSiteMap(blogs);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;

