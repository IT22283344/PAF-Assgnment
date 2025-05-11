import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import UserLike from "./UserLike";
import CommentModal from "./CommentModal";

const PostItem = ({ post, onDelete }) => {
  const [showComments, setShowComments] = useState(false);

  const postDate = new Date(post.timestamp).toLocaleDateString();
  const postTime = new Date(post.timestamp).toLocaleTimeString();

  return (
    <div className="card mb-4 shadow-sm rounded-3">
      <div className="card-header d-flex justify-content-between align-items-center bg-light">
        <h5 className="mb-0">{post.user.username}</h5>
        <div className="dropdown">
          <i
            className="bi bi-three-dots-vertical"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></i>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item text-danger"
                onClick={() => onDelete(post.id)}
                style={{ cursor: "pointer" }}
              >
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
      <img
        alt="post"
        className="card-img-top img-fluid"
        src={post.imageUrl}
        style={{
          maxHeight: "500px",
          objectFit: "cover",
          borderRadius: "1px",
          marginRight: "5px",
        }}
      />
      <div className="card-body">
        <p>{post.content}</p>
        <p className="text-muted small">
          Posted on: {postDate} at {postTime}
        </p>
        <div className="d-flex justify-content-start align-items-center">
          <UserLike postId={post.id} />
          <i
            className="bi bi-chat px-3 text-secondary"
            onClick={() => setShowComments((prev) => !prev)}
            style={{ cursor: "pointer", fontSize: "1.5rem" }}
          ></i>
        </div>

        {/* Inline Comment Section */}
        {showComments && (
          <div className="comment-box border-top pt-3 position-relative">
            {/* Close button */}
            <button
              className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-2"
              onClick={() => setShowComments(false)}
            >
              ✕
            </button>

            <CommentModal postId={post.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;







//           </ul>
//         </div>
//       </div>
//       <img
//         alt="post"
//         className="card-img-top img-fluid"
//         src={post.imageUrl}
//         style={{
//           maxHeight: "500px",
//           objectFit: "cover",
//           borderRadius: "1px",
//           marginRight: "5px",
//         }}
//       />   
//       <div className="card-body">
//         <p>{post.content}</p>
//         <p className="text-muted small">
//           Posted on: {postDate} at {postTime}
//         </p>
//         <div className="d-flex justify-content-start align-items-center">
//           <UserLike postId={post.id} />
//           <i
//             className="bi bi-chat px-3 text-secondary"
//             onClick={() => setShowComments((prev) => !prev)}
//             style={{ cursor: "pointer", fontSize: "1.5rem" }}
//           ></i>
//         </div>

//         {/* Inline Comment Section */}
//         {showComments && (
//           <div className="comment-box border-top pt-3 position-relative">
//             {/* Close button */}
//             <button
//               className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-2"
//               onClick={() => setShowComments(false)}
//             >
//               ✕
//             </button>

//             <CommentModal postId={post.id} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
