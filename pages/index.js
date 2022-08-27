import React from 'react';
import Head from 'next/head';
import Blog from "../models/Blog";
import dbConnect from '../middleware/mongoose';
import Link from 'next/link';

const Home = ({blogs}) => {

  return (
    <div>
      <Head>
        <title>Home - Sanyam Bucha</title>
      </Head>
      <section>
        <div className="cta-banner">
          <div className="content">
            <h1 className="cta-s">Welcome</h1>
            <p className="cta-s">Awesome! market of the world. All the products ar ready to deliver all over the
              country.</p>
            <button className="cta-s button">Get Started</button>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="projects">
            <h1 className='project-heading'>Blogs</h1>
            {blogs.map((blog)=>(
              <div className="project" key={blog._id}>
              <div className="img"><img src={blog.image} alt="" />
              </div>
              <div className="project-content">
                <div className="content">
                  <div className="info">
                    <h1 className="space">{blog.title}</h1>
                    <p className="space">In frontend Next Js is used</p>
                  </div>
                  <div>
                    <Link href={`/blogs/${blog.slug}`}><button className="btn blog-btn">View Project</button></Link>
                  </div>
                </div>
              </div>
            </div>
            ))}
            
          </div>
        </div>
      </section>
    </div >
  )
}

export default Home


export async function getServerSideProps() {
  await dbConnect();
  let blogs = await Blog.find().limit(3).sort({'createdAt': 1});

  return {
    props: { blogs: JSON.parse(JSON.stringify(blogs)) }
  }
}