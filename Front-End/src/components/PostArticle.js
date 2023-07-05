// // // import { Editor } from "react-draft-wysiwyg";
// // // import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// // // import React, { useState } from 'react';
// // // import { EditorState } from 'draft-js';
// // // import { Editor } from 'react-draft-wysiwyg';
// // import Comments from '../comments/Comments';
// // import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// // import React, { Component, useState } from 'react';
// // import { CKEditor } from '@ckeditor/ckeditor5-react';
// // import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// // import Nav from 'react-bootstrap/Nav';
// // import { Link, useLocation } from 'react-router-dom';
// // import CommentBox from './CommentBox';



// // // export default function PostArticle() {
// // //     const [editorState, setEditorState] = useState(
// // //         () => EditorState.createEmpty(),
// // //       );

// // //       const [Article, setArticle] = useState({
// // //         fullName:'',
// // //         mail:'',
// // //         context:'',
// // //         photo:'',
// // //         creatDate:'',
// // //         articleID:''
// // //       });
// // //       function uploadImageCallBack(file) {
// // //         return new Promise(
// // //           (resolve, reject) => {
// // //             const xhr = new XMLHttpRequest();
// // //             xhr.open('POST', 'https://api.imgur.com/3/image');
// // //             xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
// // //             const data = new FormData();
// // //             data.append('image', file);
// // //             xhr.send(data);
// // //             xhr.addEventListener('load', () => {
// // //               const response = JSON.parse(xhr.responseText);
// // //               resolve(response);
// // //             });
// // //             xhr.addEventListener('error', () => {
// // //               const error = JSON.parse(xhr.responseText);
// // //               reject(error);
// // //             });
// // //           }
// // //         );
// // //       }
// // //     return (
// // //         <div >
// // //             <header className='headerPost'>
// // //         Viết bài
// // //       </header>
// // //         <Editor
// // //             //   toolbarClassName="toolbarClassName"
// // //             //   wrapperClassName="wrapperClassName"
// // //             //   editorClassName="editorClassName"
// // //             //   wrapperStyle={{ width: "auto", border: "1px solid black" }}
// // //             editorState={editorState}
// // //             onEditorStateChange={setEditorState}
// // //             wrapperClassName="wrapper-class"
// // //             editorClassName="editor-class"
// // //             toolbarClassName="toolbar-class"
// // //             // toolbar={{
// // //             //   inline: { inDropdown: true },
// // //             //   list: { inDropdown: true },
// // //             //   textAlign: { inDropdown: true },
// // //             //   link: { inDropdown: true },
// // //             //   history: { inDropdown: true },
// // //             //   image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
// // //             // }}

// // //         />

// // //         <div>
// // //             <button type='submit' className='btn btn-primary'>Đăng</button>
// // //         </div>
// // //        <br />
// // //        <div>
// // //         <Comments
// // //           currentUserId="1" />


// // //       </div>
// // //         </div>
// // //     );
// // // }


// // class PostArticle extends Component {
// //   constructor(props) {
// //       super(props);
// //       this.state = {
// //           notes: [],
// //           currentNote: ""
// //   }

// // }



// // componentDidMount() {
// //   // Retrieve notes from local storage
// //   let storedNotes = localStorage.getItem("notes");
// //   if (storedNotes) {
// //       this.setState({ notes: JSON.parse(storedNotes) });
// //   }
// // }

// // handleEditorChange = (event, editor) => {
// //   this.setState({ currentNote: editor.getData() });
// // }

// // handleSaveNote = () => {
// //   // Add the current note to the notes array
// //   let newNotes = [...this.state.notes, this.state.currentNote];
// //   this.setState({ notes: newNotes });

// //   // Save the notes array to local storage
// //   localStorage.setItem("notes", JSON.stringify(newNotes));

// //   // Clear the current note
// //   this.setState({ currentNote: "" });
// // }

// // render() {
// //   return (
// //     <div>
// //       <div >
// //              <header className='headerPost'>
// //          Viết bài
// //        </header>
// //        </div>
// //         {/* <h2>Viết bài</h2> */}
// //         <CKEditor
// //             editor={ ClassicEditor }
// //             data={this.state.currentNote}
// //             onChange={ this.handleEditorChange }

// //         />

// //         <button onClick={this.handleSaveNote}>Đăng</button>
// //         <Link style={{color:'black', textDecoration:'none'}} to="/baivietdadang"><Nav.Link href="#baivietdadang">Xem bài viết đã đăng</Nav.Link></Link>
// //         <h3></h3>
// //         {/* <div >
// //             {this.state.notes.map((note, index) => {
// //                 return <div key={index} className="note" dangerouslySetInnerHTML={{__html: note}} />
// //             })}
// //         </div> */}
// //         <div>
// //         <CommentBox />
// //         </div>
// //         <div>
// //          <Comments
// //            currentUserId="1" />


// //        </div>
// //     </div>

// // );

// // }
// // }

// // export default PostArticle;

// import LoginPopup from './auth/LoginPopup';
// import React, { useState, useEffect, useContext, useRef } from 'react';
// import axios from 'axios';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import Nav from "react-bootstrap/Nav";
// import { Link, useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import Login from './auth/Login';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
// // import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount';


// const ArticleCreationForm = (props) => {

//   const [content, setContent] = useState('');
//   const editorRef = useRef(null);
//   const handleEditorChange = (event, editor) => {
//     const data = editor.getData();
//     setContent(data);
//   };

//   // useEffect(() => {
//   //   if (editorRef.current) {
//   //     const editor = editorRef.current.editor;

//   //     // Get the WordCount plugin instance
//   //     const wordCountPlugin = editor.plugins.get('WordCount');

//   //     // Set the character limit
//   //     wordCountPlugin.limit = 100;

//   //     // Update the character count on editor input
//   //     editor.model.document.on('change:data', () => {
//   //       const characterCount = editor.plugins.get('WordCount').getCharacterCount();
//   //       console.log('Character count:', characterCount);
//   //     });
//   //   }
//   // }, []);


//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const articleData = {
//       content: content
//     };
//     // Perform the article submission logic here
//   };

//   if (!props.isAuthenticated) {
//     return React.createElement('div', null, 'Please log in to create an article.');
//   }

//   return (
//     // React.createElement('div', null,
//     //   React.createElement('h1', null, 'Create Article'),
//     //   React.createElement('form', { onSubmit: handleSubmit },
//     //     React.createElement(CKEditor, {
//     //       editor: ClassicEditor,
//     //       data: content,
//     //       onChange: handleEditorChange
//     //     }),
//     //     React.createElement('button', { type: 'submit' }, 'Submit')
//     //   )
//     // )
//     <div>
//        {/* <div ref={editorRef}>
//         <textarea name="editorData"></textarea>
//       </div> */}
//       <h1>Create Article</h1>
//       <form onSubmit={handleSubmit}>
//         <CKEditor
//           editor={ClassicEditor}
//           data={content}
//           onChange={handleEditorChange}
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };
// // const Login = ({ setIsAuthenticated }) => {
// //   const [mail, setMail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [fullname, setFullname] = useState('');
// //   const [roleName, setroleName] = useState(null);
// //   const contentStyle = { background: '#ffffff' };
// //   const overlayStyle = { background: 'rgba(0,0,10,0.5)' };




// //   const [user, setUser] = useState([]);
// //   const login = useGoogleLogin({
// //     onSuccess: (codeResponse) => setUser(codeResponse),
// //     onError: (error) => console.log('Login Failed:', error)
// //   });
// //   const navigate = useNavigate();

// //   // Registration
// //   const handleRegistration = async (event) => {
// //     event.preventDefault();

// //     try {
// //       const response = await axios.post(`http://localhost:8080/api/auth/signup`, {
// //         mail,
// //         password,
// //         fullname,
// //         roleName
// //       });
// //       toast.success('Register successful!');
// //       console.log('Registration successful:', response.data);

// //     } catch (error) {
// //       console.error('Error during registration:', error);
// //       toast.error('Register failed!');
// //     }
// //   };
// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     try {


// //       const response = await axios.post(`http://localhost:8080/api/auth/login`, { mail, password });
// //       const { roleName } = response.data; // Assuming the response contains the user's role

// //       // Save the user's role and any other necessary data to state or storage
// //       // localStorage.setItem('role', role);
// //       // set the state of the user
// //       setUser(response.data)
// //       // store the user in localStorage
// //       localStorage.setItem('user', response.data)
// //       console.log(response.data)
// //       // Redirect to the appropriate route based on the user's role
// //       if (roleName === 'ADMIN') {
// //         navigate("/");
// //       } else if (roleName === "MODERATOR") {
// //         navigate('/video');
// //       } else {
// //         navigate('/postarticle');
// //       }
// //       toast.success('Login successful!');
// //       setIsAuthenticated(true);
// //     } catch (error) {
// //       console.error('Error during login:', error);
// //       // Handle login error
// //       toast.error('Login failed!' + error.message);
// //     }
// //   };
// //   // const handleLogin = () => {
// //   //   // Perform login logic


// //   //   setIsAuthenticated(true);
// //   // };
// //   return (
// //     <div>
// //       <h1>please login to post articles</h1>
// //       <Popup
// //       trigger={<button style={{ backgroundColor: '#FFC701', color: 'black', padding: '10px 30px', borderRadius: '25px', fontWeight: 'bold' }} className="button"> login </button>}
// //       {...{ contentStyle, overlayStyle }}
// //       modal
// //       nested
// //     ><img style={{
// //       resizeMode: 'contain',
// //       height: 100,
// //       width: 200,
// //     }} src="LogoSuViet.jpg"></img>
// //       <h1> Đăng nhập vào Sử Việt </h1>

// //       <div className="login-popup">
// //         <form onSubmit={handleLogin}>
// //           <input type="mail" placeholder="Mail" value={mail} onChange={(e) => setMail(e.target.value)} />
// //           <br />
// //           <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
// //           <br />

// //           <br />
// //           <button style={{ backgroundColor: '#FFC701', color: 'black', padding: '10px 30px', borderRadius: '25px', fontWeight: 'bold' }} type="submit">Đăng nhập</button>
// //         </form>

// //         {close => (
// //           <div className="modal">
// //             <button className="close" onClick={close}>
// //               &times;
// //             </button>
// //             <div className="content">

// //               <button
// //                 className="button"
// //                 onClick={() => {
// //                   console.log('modal closed ');
// //                   close();
// //                 }}
// //               >
// //                 close modal
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {/* google login */}
// //         <div>
// //           or
// //           <br />
// //           <br />
// //           {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
// //           <Link to="/ggUser"><Nav.Link href="#ggUser">
// //             <button onClick={() => login()}>Sign in with Google 🚀 </button></Nav.Link></Link>
// //         </div>
// //         <br />
// //         {/*sign up */}
// //         <Popup
// //           trigger={<button className="button"> Đăng ký </button>}
// //           {...{ contentStyle, overlayStyle }}
// //           modal
// //           nested
// //         >
// //           <h1>Đăng ký
// //           </h1>
// //           <form onSubmit={handleRegistration}>
// //             <input
// //               type="mail"
// //               placeholder="Mail"
// //               value={mail}
// //               onChange={(e) => setMail(e.target.value)}
// //             />
// //             <br />
// //             <br />
// //             <input
// //               type="password"
// //               placeholder="Password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //             />
// //             <br />
// //             <br />
// //             <input
// //               type="fullname"
// //               placeholder="fullname"
// //               value={fullname}
// //               onChange={(e) => setFullname(e.target.value)}
// //             />
// //             <br />
// //             <br />
// //             <button type="submit">Register</button>
// //           </form>
// //         </Popup>

// //       </div>

// //     </Popup>
// //     </div>
// //   );
// // };
// const PostArticle = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   useEffect(() => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (accessToken) {
//       setIsAuthenticated(true);
//       //   setTimeout(() => {
//       //     document.location.reload();
//       //   }, 3000);

//     }

//     else {
//       setIsAuthenticated(false);
//     }
//   }, [setIsAuthenticated]);

//   return (
//     <div>
//       {isAuthenticated ? (
//         <ArticleCreationForm isAuthenticated={isAuthenticated} />
//       ) : (
//         // <Login setIsAuthenticated={setIsAuthenticated} />
//         <div>please login

//         </div>
//       )}

//     </div>
//   );
// };

// export default PostArticle;

// // import axios from 'axios';
// // import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
// // import { PendingActions } from '@ckeditor/ckeditor5-core';

// // let isDirty = false;

// // function PostArticle() {
// //   ClassicEditor.create(document.querySelector('#editor'), {
// //     plugins: [
// //       PendingActions,

// //       // ... other plugins
// //     ]
// //   })
// //     .then(editor => {
// //       window.editor = editor;

// //       handleStatusChanges(editor);
// //       handleSaveButton(editor);
// //       handleBeforeunload(editor);
// //     })
// //     .catch(err => {
// //       console.error(err.stack);
// //     });
// // }

// // // Handle clicking the "Save" button by sending the data to the backend API.
// // function handleSaveButton(editor) {
// //   const saveButton = document.querySelector('#save');
// //   const pendingActions = editor.plugins.get('PendingActions');

// //   saveButton.addEventListener('click', evt => {
// //     const data = editor.getData();

// //     // Register the action of saving the data as a "pending action".
// //     const action = pendingActions.add('Saving changes');

// //     evt.preventDefault();

// //     // Save the data to the backend API.
// //     axios
// //       .post('/api/save', { data }) // Replace '/api/save' with your actual API endpoint
// //       .then(response => {
// //         pendingActions.remove(action);

// //         if (data === editor.getData()) {
// //           isDirty = false;
// //         }

// //         updateStatus(editor);
// //       })
// //       .catch(error => {
// //         console.error('Error saving data:', error);
// //       });
// //   });
// // }

// // // Listen to new changes (to enable the "Save" button) and to
// // // pending actions (to show the spinner animation when the editor is busy).
// // function handleStatusChanges(editor) {
// //   editor.plugins.get('PendingActions').on('change:hasAny', () => updateStatus(editor));

// //   editor.model.document.on('change:data', () => {
// //     isDirty = true;
// //     updateStatus(editor);
// //   });
// // }

// // // If the user tries to leave the page before the data is saved, ask
// // // them whether they are sure they want to proceed.
// // function handleBeforeunload(editor) {
// //   const pendingActions = editor.plugins.get('PendingActions');

// //   window.addEventListener('beforeunload', evt => {
// //     if (pendingActions.hasAny) {
// //       evt.preventDefault();
// //     }
// //   });
// // }

// // function updateStatus(editor) {
// //   const saveButton = document.querySelector('#save');

// //   if (isDirty) {
// //     saveButton.classList.add('active');
// //   } else {
// //     saveButton.classList.remove('active');
// //   }

// //   if (editor.plugins.get('PendingActions').hasAny) {
// //     saveButton.classList.add('saving');
// //   } else {
// //     saveButton.classList.remove('saving');
// //   }
// // }

// // export default PostArticle ;


import axios from 'axios';
import React, { useState, useEffect, useContext, useRef } from 'react';

const PostArticle = () => {

  
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [file, setFile] = useState([]);
  const [tagNames, setTagNames] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFile(files.slice(0, 5)); // Limit to maximum 5 images
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const accessToken = localStorage.getItem('accessToken');
      
      const config = {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    };
      // Prepare form data for sending to the API
      const formData = new FormData();
      formData.append('title', title);
      formData.append('context', context);
      formData.append('tags', tagNames);
      file.forEach((file, index) => {
        formData.append(`image${index + 1}`, file);
      });

      // Make an API request to save the article
    const response = await axios.post('http://localhost:8080/api/articles', formData, config);

    // Handle the response, e.g., display a success message
    console.log(response.data);

    const {articleID} = response.data;
    localStorage.setItem('articleID', articleID);


    // Clear the form inputs and images
    setTitle('');
    setContext('');
    setTagNames('');
    setFile([]);

    console.log('success');
  } catch (err) {
    // Handle error response from the API
    setError('An error occurred while saving the article.');
    console.error(err);
  }

  setIsSubmitting(false);
};

  return (
    <div>
      <h2>Post an Article</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={200}
          placeholder="Article Title (max 200)"
          required
        />
        <br />
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Write your article here"
          required
        ></textarea>
        <br />

        <input
          type="text"
          value={tagNames}
          onChange={(e) => setTagNames(e.target.value)}
          maxLength={30}
          placeholder="Tags "
        />
        <br />
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
        <br />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostArticle;

// const PostArticle = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   useEffect(() => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (accessToken) {
//       setIsAuthenticated(true);
//       //   setTimeout(() => {
//       //     document.location.reload();
//       //   },10000000);

//     }

//     else {
//       setIsAuthenticated(false);
//     }
//   }, [setIsAuthenticated]);

//   return (
//     <div>
//       {isAuthenticated ? (
//         <ArticleForm isAuthenticated={isAuthenticated} />
//       ) : (
        
//         // <Login setIsAuthenticated={setIsAuthenticated} />
//         <div>please login

//         </div>
//       )}

//     </div>
//   );
// };


