"use client";
import React, { useState } from 'react';
import {motion} from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCarousel } from '@/hooks/useCarousel';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetCoursesQuery } from '@/state/api';
import CourseCardSearch from '@/components/CourseCardSearch';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const LoadingSkeleton = () => {
    return (
        <div className="loading-skeleton">
            <div className="loading-skeleton__hero">
                <div className="loading-skeleton__hero-content">
                    <Skeleton className="loading-skeleton__title" />
                    <Skeleton className="loading-skeleton__subtitle" />
                    <Skeleton className="loading-skeleton__subtitle-secondary" />
                    <Skeleton className="loading-skeleton__button" />
                </div>
                <Skeleton className="loading-skeleton__hero-image" />
            </div>
            <div className="loading-skeleton__featured">
                <Skeleton className="loading-skeleton__featured-title" />
                <Skeleton className="loading-skeleton__featured-description" />

                <div className="loading-skeleton__tags">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="loading-skeleton__tag" />
                    ))}
                </div>
                <div className="loading-skeleton__courses">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} className="loading-skeleton__course-card" />
                    ))}
                </div>
            </div>
        </div>
        
        
    );
};

const Landing = () => {
    
    const router = useRouter();
    const currentImage = useCarousel({totalImages: 3}); // Custom hook to handle carousel logic
    const images = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"];
    const [selectedCategory, setSelectedCategory] = useState("all");
    console.log("SELECTED CATEGORY:", selectedCategory);

const {
    data: courses,
    isLoading,
    isError
} = useGetCoursesQuery({
    category: selectedCategory
});
    // const {data: courses, isLoading, isError} = useGetCoursesQuery({});
    console.log("LANDING COURSES:", courses);
console.log("LANDING LOADING:", isLoading);
console.log("LANDING ERROR:", isError);

    const handleCourseClick = (courseId: string) => {
        // router.push(`/search=${courseId}`);
        router.push(`/search?id=${courseId}`);
    };

    if(isLoading){
        return <LoadingSkeleton />
    }

  return (
    <motion.div 
        initial={{ opacity: 0}} 
        animate={{ opacity: 1}}
        transition={{ duration: 0.5 }}
        className="landing">
            <motion.div 
                initial={{ y: 20,opacity: 0}} 
                animate={{ y: 0, opacity: 1}}
                transition={{ duration: 0.5 }}
                className="landing__hero"
                >
                    <div className="landing__hero-content">
                        <h1 className="landing__title">Courses</h1>
                        <p className="landing__description">
                            Explore a wide range of courses and enhance your skills with our comprehensive learning platform.
                        </p>
                    </div>
                    <div className="landing__cta">
                        <Link href="/search">
                            <div className="landing__cta-button">Search for Courses</div>
                        </Link>
                    </div>
                    <div className="landing__hero-images">
                        {images.map((src, index) => (
                        <Image 
                            key={index} 
                            src={src} 
                            alt={`Hero Banner ${index + 1}`} 
                            fill 
                            priority = {index === currentImage} 
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                            className={`landing__hero-image ${
                                index === currentImage ? 'landing__hero-image--active' : ''
                            }`}
                        />
                    ))}
                    </div>
            </motion.div>
            
            <motion.div
                initial={{ y: 20,opacity: 0}} 
                whileInView={{ y: 0, opacity: 1}}
                animate={{ y: 0, opacity: 1}}
                transition={{ duration: 0.5 }} 
                viewport={{ amount: 0.3, once: true }}
                className="landing__featured"
            >
                <h2 className="landing__featured-title">Featured Courses</h2>
                <p className="landing__featured-description">
                    Discover our most popular courses and advance your career with our expert-led training programs.
                </p>
                {/* <div className="landing__tags">
                    {[
                        "web development",
                        "enterprise IT",
                        "react nextjs",
                        "javascript",
                        "backend development",
                    ].map((tag, index) => (
                        <span key={index} className="landing__tag">
                            {tag}
                        </span>
                    ))}
                </div> */}

                {/* <div className="landing__tags">
    {[
        { label: "All", value: "all" },
        { label: "Web Development", value: "Web Development" },
        { label: "Data Science", value: "Data Science" },
        { label: "Artificial Intelligence", value: "Artificial Intelligence" },
        { label: "Computer Science", value: "Computer Science" },
        { label: "Mobile Development", value: "Mobile Development" },
    ].map((category) => (
        <button
            key={category.value}
            type="button"
            onClick={() => {
                console.log("CATEGORY CLICKED:", category.value);
                setSelectedCategory(category.value)
            }}
            className={`landing__tag ${
                selectedCategory === category.value
                    ? "landing__tag--active"
                    : ""
            }`}
        >
            {category.label}
        </button>
    ))}
</div> */}
                <div className="landing__tags">
    {[
        { label: "All", value: "all" },
        { label: "Web Development", value: "Web Development" },
        { label: "Data Science", value: "Data Science" },
        { label: "Artificial Intelligence", value: "Artificial Intelligence" },
        { label: "Computer Science", value: "Computer Science" },
        { label: "Mobile Development", value: "Mobile Development" },
    ].map((category) => (
        <button
            key={category.value}
            type="button"
            onClick={() => {
                console.log("CATEGORY CLICKED:", category.value);
                setSelectedCategory(category.value);
            }}
            style={{
                cursor: "pointer",
                pointerEvents: "auto",
                position: "relative",
                zIndex: 10,
            }}
            className={`landing__tag ${
                selectedCategory === category.value
                    ? "landing__tag--active"
                    : ""
            }`}
        >
            {category.label}
        </button>
    ))}
</div>
                {/* <div className="landing__courses">
                    {courses && courses.slice(0,4).map((course, index)=>(
                        <motion.div 
                            key = {course.courseId} 
                            initial={{ y: 50, opacity: 0}}
                            whileInView={{ y: 0, opacity: 1}}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ amount: 0.3, once: true }}
                            className="landing__course-card"
                        >
                            <CourseCardSearch course = {course} onClick={()=>handleCourseClick}/>
                        </motion.div>
                    ))}
                </div> */}
                 <div className="landing__courses">
    {courses?.slice(0, 4).map((course, index) => (
        <motion.div
            key={course.courseId}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ amount: 0.3, once: true }}
            className="landing__course-card"
        >
            <CourseCardSearch
                course={course}
                onClick={() => handleCourseClick(course.courseId)}
            />
        </motion.div>
    ))}
</div>
            </motion.div>
        </motion.div>
    )
}

export default Landing