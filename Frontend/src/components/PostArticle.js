
import React, { useEffect, useState } from 'react';
import './PostArticles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PostArticle() {
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [showTags, setShowTags] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContextChange = (event) => {
    setContext(event.target.value);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFile(event.target.files[0]);
  };

  const handleTagChange = (e) => {
    const selectedOptions = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setTags(selectedOptions);
  };
  const toggleTags = () => {
    setShowTags(!showTags);
  };
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
    console.log(localStorage.getItem('role'))
    
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('data', JSON.stringify({ title, context, tagNames: tags }));
    formData.append('file', file);

    // Retrieve the access token from localStorage
    const accessToken = localStorage.getItem('accessToken');

    fetch('http://localhost:8080/api/articles', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
        {userRole === 'MEMBER' && (
        toast.success('Bài viết đã được gửi cho quản trị viên! Vui lòng đợi xét duyệt!')
        )}
        {userRole === 'MODERATOR' && (
          toast.success('Bài viết đã được đăng!')
        )}
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

  return (
    <form className='postarticle' onSubmit={handleSubmit}>
      <div className='articles-content'>
        <h2 className='articles-title'>Đăng bài viết</h2>
        <div>
          <label htmlFor="title">Tiêu đề:</label>
          <br />
          <input type="text" id="title" value={title} onChange={handleTitleChange} style={{ width: "1000px" }} />
        </div>
        <div>
          <label htmlFor="context"  >Nội dung bài viết:</label>
          <br />
          <textarea id="context" value={context} onChange={handleContextChange} style={{ height: "400px", width: "1000px" }} />
        </div>
        <div>
          <label htmlFor="file">Hình ảnh minh họa:</label>
          <br />
          <div className='image-btnTag'>
            <div style={{ display: 'flex', width: '100%' }}>
              <label class="custom-file-upload" htmlFor="file">
                Chọn ảnh
              </label>
              <input type="file" id="file" onChange={handleFileChange} />
              <p style={{ width: '300px', marginLeft: '10px', marginBottom: '0px', marginTop: '7px' }}>
                {selectedFile ? selectedFile.name : 'Không có ảnh nào được chọn'}
              </p>
            </div>
            <div className='btnTag-containter'>
              <button type="button" onClick={toggleTags} className='btnTag'>
                Thể loại
              </button>
              {showTags && (
                <select multiple id="tags" value={tags} onChange={handleTagChange}>
                  <option value="tag1">Kinh Tế</option>
                  <option value="tag2">Xã Hội</option>
                  <option value="tag3">Lịch Sử</option>
                  <option value="tag4">Đời Sống</option>
                  <option value="tag5">Văn Hóa</option>
                  <option value="tag6">Nghệ Thuật</option>
                  <option value="tag7">Chính Trị</option>
                  <option value="tag8">Khác</option>
                </select>
              )}
            </div>
          </div>

        </div>

        <button className='buttonpost' type="submit" >Đăng</button>
      </div>
    </form>
  );
}



export default PostArticle;
