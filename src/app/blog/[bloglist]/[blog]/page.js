import React from "react";
import apiClient from "@/api/client";
import BlogContent from "@/components/blogContent/BlogContent";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const blogid = params?.blog;
  const { Data: data } = await apiClient.get(`/blog/blogbyid/${blogid}`);

  return {
    title: data?.mtitle,
    description: data?.mdesc,
  };
}

const BlogPost = ({ params }) => {
  const blogid = params?.blog;

  return (
    <div className={styles.container}>
      <BlogContent blogid={blogid} />
      <div style={{ marginTop: "20px" }}></div>
    </div>
  );
};

export default BlogPost;
