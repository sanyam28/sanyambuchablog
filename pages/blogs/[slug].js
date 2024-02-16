import React from 'react';
import Blog from '../../models/Blog';
import connectDb from "../../middleware/mongoose";
import Head from 'next/head';

const BlogS = ({ blog }) => {

  return (
    <div>
      <Head>
        <title>{blog.title} - Sanyam Bucha</title>
        <meta name="description" content={blog.description} />
      </Head>
      <div className="blog-content">
        <h1 style={{color:"blue"}}>{blog.title}</h1>
        <div dangerouslySetInnerHTML={{__html: blog.body}}></div>
      </div>
      </div>
  )
}

export default BlogS

export async function getServerSideProps(context) {
  await connectDb();

  let blogres = await Blog.findOne({ slug: context.query.slug, is_published:true });
  let blog = JSON.parse(JSON.stringify(blogres))

  if (!blog) {
    return {
      notFound: true,
    }
  }

  return {
    props: { blog }
  }
}