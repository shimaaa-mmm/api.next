// import { useState } from 'react';
// import CategoryButtons from '../components/CategoryButtons/CategoryButtons';
// import posts from '../data/posts';

// export default function PostList() {
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   const counts = {
//     all: posts.length,
//     article: posts.filter(post => post.type === 'article').length,
//     video: posts.filter(post => post.type === 'video').length,
//     podcast: posts.filter(post => post.type === 'podcast').length,
//   };

//   const filteredPosts =
//     selectedCategory === 'all'
//       ? posts
//       : posts.filter(post => post.type === selectedCategory);

//   return (
//     <div>
//       <CategoryButtons onSelect={setSelectedCategory} counts={counts} />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" dir="rtl">
//         {filteredPosts.map(post => (
//           <div key={post.id} className="bg-white p-4 rounded shadow">
//             <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded" />
//             <h2 className="mt-2 text-lg font-semibold">{post.title}</h2>
//             <p className="text-sm text-gray-600">{post.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
