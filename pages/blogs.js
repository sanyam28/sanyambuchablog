import React from 'react';
import Blog from "../models/Blog";
import Link from 'next/link';
import dbConnect from '../middleware/mongoose';
import Head from 'next/head';

const Blogs = ({ blogs, totalblogs }) => {
  return (
    <div>
      <Head>
        <title>Blogs - Sanyam Bucha</title>
        <meta name="description" content="Incredible Projects" />
      </Head>
      <section>
        <div className="container">
          <h1 className='project-heading'>Projects <span>({totalblogs})</span></h1>
          <div className="projects">
            {blogs?.map((blog) => (
              <div className="project" key={blog?._id}>
                <div className="img"><img src={blog?.image} alt="" />
                </div>
                <div className="project-content">
                  <div className="content">
                    <div className="info">
                      <h1 className="space">{blog?.title}</h1>
                      <p className="space">{blog?.description}</p>
                    </div>
                    <div>
                      <Link href={`/blogs/${blog?.slug}`}><button className="btn blog-btn">View Blog</button></Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
    </div>
  )
}

export default Blogs

export async function getServerSideProps() {
  let rawblogs = await fetch(`${process.env.NEXT_BASE_PUBLIC_URL}/api/getblogs`);
  const blogs = await rawblogs.json()
  // let totalblogs = blogs.blogs.length;
  let totalblogs = '5';

  return {
    props: { blogs: JSON.parse(JSON.stringify(blogs.blogs)), totalblogs }
  }
}