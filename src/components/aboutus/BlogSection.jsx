import React from 'react';
import { motion } from 'framer-motion';
import { dummyBlogs } from '@/utils/db';
import CommonSectionTitle from '../common/CommonSectionTitle';
import CommonBlogCard from '../common/CommonBlogCard';
import { Link } from 'react-router-dom';
import useGetCmsData from '@/hooks/useGetCmsData';

const BlogSection = () => {

    const { data } = useGetCmsData('/blogs')
    console.log(data)
    const blogs = data?.projects;
    return (
        <div className='container py-6 xl:py-[150px]'>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <CommonSectionTitle className='text-center' text="Our Recent Blogs" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 xl:mt-[60px]"
            >
                {blogs?.slice(0, 3).map((blog) => (
                    <CommonBlogCard
                        key={blog.id}
                        img={blog.image}
                        title={blog.title}
                        desc={blog.description}
                        authorImg={blog.authorImg || blog.admin_avatar}
                        authorName={blog.admin_name}
                        date={blog.readable_time}
                        id={blog.id}
                    />
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='flex justify-center mt-5'
            >
                <Link to="">
                    <button className='cursor-pointer text-[#EE3131] text-2xl font-semibold text-center'>
                        See All
                    </button></Link>
            </motion.div>

        </div>
    );
};

export default BlogSection;
