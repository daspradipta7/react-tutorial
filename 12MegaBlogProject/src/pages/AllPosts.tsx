import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import type { Post } from '../types/post'
import PostService from '../appwrite/database/PostService'

function AllPosts() {
    const [allPosts, setAllPosts] = useState<Post[]>([])

    useEffect(() => {
        const fetchPosts = async () => {
                try {
                    const postLists = await PostService.listPosts() as unknown as Post[]
                    
                    if (postLists) {
                        setAllPosts(postLists)
                    }
                } catch (error) {
                    console.error("Failed to fetch post details:", error)
                }
            }
    
        fetchPosts()
    }, [])
  return (
    <Container>
        {allPosts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
                <PostCard id={post?.$id || null} title={post.title} featuredImage={post.featuredImage} />
            </div>
        ))}
    </Container>
  )
}

export default AllPosts