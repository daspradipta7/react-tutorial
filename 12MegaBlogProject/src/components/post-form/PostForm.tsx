import React, { useCallback, useEffect, useId } from 'react'
import Input from '../Input'
import RTE from '../RTE'
import Select from '../Select'
import Button from '../Button'
import { useForm, useWatch } from 'react-hook-form'
import PostStorageService from '../../appwrite/storage/PostStorageService'
import { articleStatus } from '../../config/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PostService from '../../appwrite/database/PostService'
import type { Post } from '../../types/post'

function PostForm({ post }: { post?: Post }) {
    const { handleSubmit, register, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || articleStatus.PUBLISHED,
            image: [],
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.user)

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await PostStorageService.uploadPostFile( data.image): null

            if (file && post.featuredImage) {
                await PostStorageService.deletePostFileById(post.featuredImage)
            }

            const updatedPost = await PostService.updatePost(post.$id, {
                title: data.title,
                content: data.content,
                status: data.status,
                featuredImage: file ? file.$id : post.featuredImage,
            })

            if (updatedPost) {
                navigate(`/posts/${post.$id}`)
            }

        } else {
            const file = data.image[0] ? await PostStorageService.uploadPostFile(data.image) : null
            const featuredImage = file ? file.$id: ""

            const post = await PostService.createPost({
                title: data.title,
                content: data.content,
                status: data.status,
                featuredImage: featuredImage,
                createdAt: new Date().toISOString(),
                userId: userData.$id
            })

            if (post) {
               navigate(`/posts/${post.$id}`)
            }
        }
    }

    const slugTransforms = useCallback((value: string) => {
        if (value && typeof value === "string") {
           return value
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "") // 1. Remove all special characters except spaces and hyphens
            .replace(/\s+/g, "-")          // 2. Replace one or more spaces with a single hyphen
            .replace(/-+/g, "-")           // 3. Prevent multiple consecutive hyphens (---)
            .replace(/^-+|-+$/g, "");
        }

        return ""
    },[])

    const watchedTitle = useWatch({
        control,
        name: "title",
    });

    useEffect(() => {
        if (watchedTitle) {
            setValue("slug", slugTransforms(watchedTitle), { shouldValidate: true });
        }
    }, [watchedTitle, setValue, slugTransforms]);

    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='flex flex-wrap w-full'>
                <div className='w-2/3 py-4 px-4'>
                    <div className='flex flex-col'>
                        <div className='w-full'>
                            <Input 
                                label="Title :"
                                placeholder="Title"
                                className="w-full"
                                {...register("title", {
                                    required: true,
                                    validate: { matchPattern: (value) => /^[a-z\d\-_\s]+$/i.test(value) }
                                })}
                            />
                            <Input 
                                label="Slug"
                                placeholder="slug"
                                clasName="w-full"
                                {...register("slug",{
                                    required: true,
                                    validate: { matchPattern: (value) => /^[a-z\d\-_\s]+$/i.test(value) }
                                })}
                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setValue("slug", slugTransforms(e.target.value), { shouldValidate: true })
                                }}
                            />
                            <RTE 
                                name="content"
                                control={control}
                                lable="Content"
                                defaultValue={getValues('content')}
                                
                            />
                        </div>
                    </div>
                </div>
                <div className='w-1/3'>
                    <div className='flex flex-col'>
                        <div className='flex flex-col'>
                            <Input 
                                type="file"
                                placeholder = ''
                                label="Featured Image :"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {...register('image', { required: !post })}
                            />
                            {post && (
                                <img 
                                    src={PostStorageService.getFilePreview(post?.featuredImage || "")}
                                    alt={post.title}
                                    className="rounded-lg"
                                />
                            )}
                        </div>
                        <Select 
                            options={Object.values(articleStatus).map((status) => ({
                                value: status,
                                label: status,
                            }))}
                            label="Status"
                            className = 'mb-4 w-full'
                            id={useId()}
                        />
                         <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                            {post ? "Update" : "Submit"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PostForm