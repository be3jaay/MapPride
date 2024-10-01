import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import BlogModal from '@/Components/Modal/Forms/BlogModal';
import { CommentBlogModal } from '@/Components/Modal/Forms/CommentBlogModal';
import { GoCommentDiscussion } from 'react-icons/go';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PrimaryButton from '@/Components/PrimaryButton';
import { useDateFormat } from '../../../core/hooks';

export default function CommunityThread({ auth }) {
  const user = auth.user;
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState({});
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get('/api/blogs');
      const result = response.data.data;
      setBlogs(result);
      result.forEach(blog => fetchComments(blog.id));
    };
    fetchBlogs();
  }, []);

  const fetchComments = async blogId => {
    try {
      const response = await axios.get(`/api/blogs/${blogId}/comments`);
      if (Array.isArray(response.data)) {
        setComments(prevComments => ({
          ...prevComments,
          [blogId]: response.data,
        }));
      } else {
        console.error('Expected an array of comments, but got:', response.data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openCommentModal = blogId => {
    setSelectedBlogId(blogId);
    setCommentModalOpen(true);
    fetchComments(blogId);
  };

  const { getFormattedDate } = useDateFormat();

  const formattedDate = dateString => {
    return getFormattedDate(dateString);
  };

  return (
    <AuthenticatedLayout user={user}>
      <div className="w-full bg-indigo-50 h-full">
        <header className="w-full px-[20rem] border-b border-indigo-700 bg-indigo-50">
          <div className="w-full  py-8 sm:py-12 ">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-indigo-700 sm:text-3xl">Community Discussion</h1>
                <p className="mt-1.5 text-sm text-gray-500">Connect with other users by creating a discussion</p>
              </div>
              <div className="flex items-center gap-4">
                <BlogModal auth={auth} user={user} />
              </div>
            </div>
          </div>
        </header>
        <section className="px-[20rem] mt-12 h-auto">
          {blogs.map((item, index) => (
            <article
              key={index}
              className="bg-white overflow-hidden rounded-lg shadow transition hover:shadow-lg p-6 mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="avatar ">
                  <div className="w-10 rounded-full">
                    <img src={`/storage/${item.icon}`} alt="No image" className="h-auto w-full" />
                  </div>
                </div>
                <div>
                  <p className="text-indigo-700 font-bold">Posted by: {item.username}</p>
                  <p className="text-gray-700">{formattedDate(item.created_at)}</p>
                </div>
              </div>
              <img src={`/storage/${item.image}`} alt="No image" className="h-auto w-full rounded-md" />

              <div className="bg-gray-100 p-4 sm:p-6 ">
                <h3 className="mt-0.5 text-lg text-gray-900">{item.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 mb-2">{item.description}</p>
                <hr className="py-2" />

                <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                  <div className="flex items-center gap-1 text-gray-700 ">
                    <GoCommentDiscussion />
                    <p className="text-xs">{comments[item.id] ? comments[item.id].length : 0} comments</p>
                  </div>
                  <span className="hidden sm:block" aria-hidden="true">
                    &middot;
                  </span>
                </div>

                {comments[item.id] && comments[item.id].length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-md font-semibold mb-2">Comments:</h4>
                    {comments[item.id].map((comment, commentIndex) => (
                      <div
                        key={commentIndex}
                        className="p-3 rounded-md mb-2 w-full flex items-center justify-start gap-3"
                      >
                        <div className=" ">
                          <div className="avatar ">
                            <div className="w-10 rounded-full">
                              <img src={`/storage/${comment.icon}`} alt="No image" className="h-auto w-full" />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start justify-start gap-2 flex-col">
                          <p className="text-sm font-bold">{comment.username}</p>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="w-full items-end justify-end flex">
                  <PrimaryButton className="py-3 px-6 mt-6 " onClick={() => openCommentModal(item.id)}>
                    {' '}
                    Add Comment
                  </PrimaryButton>
                </div>
              </div>
            </article>
          ))}
        </section>
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-5 right-20 z-50 p-4 bg-indigo-700 text-white rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7m0 0l7 7m-7-7H6" />
            </svg>
          </button>
        )}
      </div>
      <Head title="Community-Thread" />
      <CommentBlogModal
        isOpen={isCommentModalOpen}
        onClose={() => setCommentModalOpen(false)}
        blogId={selectedBlogId}
        auth={auth}
      />
    </AuthenticatedLayout>
  );
}