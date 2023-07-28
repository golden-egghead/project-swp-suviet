import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditSite({ data }) {
	const articleID = useParams();
	const pr = articleID?.articleID;
	const baseUrl = `http://localhost:8080/api/articles/`;

	const locate = useLocation();
	const props = locate.state;
	const [photo, setPhoto] = useState(null);
    const [file, setFile] = useState(null);
	const [title, setTitle] = useState('');
	const [context, setContext] = useState('');
	// const [images, setImages] = useState([]);
	const navigate = useNavigate();
	const [oldPhoto, setOldPhoto] = useState('');


	useEffect(() => {
		setOldPhoto(props.photo);
		setTitle(props.title);
		setContext(props.context)
	}, []
	)

	const handleSubmit = (e) => {
		e.preventDefault();
		const accessToken = localStorage.getItem('accessToken');
		const formData = new FormData();
		formData.append('photo', photo);
		formData.append('title', title);
		formData.append('context', context);
		if (photo) { // If a file has been selected, add it to the form data
			formData.append("file", file);
		}
		fetch(baseUrl + pr, {
			method: 'PUT',
			'Content-Type': 'multipart/form-data',
			headers: { 'Authorization': 'Bearer ' + accessToken },
			body: formData
		})
			.then(response => {
				if (response.ok) {
					toast.success('Cập Nhật Thành Công');
					navigate('/ownerarticles');
				} else {
					toast.error('Cập Nhật Thất Bại');

				}
			})
			.catch(error => {
				console.error(error);
				alert('An error occurred while uploading the post. Please try again later.')
			});
	}
	const handlePhotoChange = (event) => {
		setPhoto(event.target.files[0]);
	}

	return (
		<div className='item'>
			<form className="edit-container-site" onSubmit={handleSubmit}>
				<div className="edit-form">
					<div className="form-title">
						<h2>Cập Nhật Bài Viết</h2>
					</div>
					<div className="form-body">
						<div >
							<label htmlFor="photo">Ảnh của Bài Viết:</label>
							<img src={oldPhoto} style={{ height: "100px", width: "100px", overflow: "auto" }} alt='' />
							<br />
						</div>
						<br />
						<div className="form-group">
							<br />
							<div style={{ display: 'flex', width: '100%' }}>
								<label class="custom-file-upload" htmlFor="file">
									Chọn ảnh
								</label>
								<input type="file" id="file" onChange={handlePhotoChange} />
								<p style={{ width: '300px', marginLeft: '10px', marginBottom: '0px', marginTop: '7px' }}>
									{file ? file.name : 'Không có ảnh nào được chọn'}
								</p>
							</div>
						</div>
						<br />
						<div className="form-group">
							<TextField
								fullWidth
								id="filled-basic"
								label="Tiêu Đề"
								variant="outlined"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
						</div>
						<div className="form-group">
							<TextField
								fullWidth
								id="filled-basic"
								label="Nội Dung"
								variant="outlined"
								value={context}
								onChange={(e) => setContext(e.target.value)}
								required
                                multiline
								rows={10}
							/>
						</div>
						<div className="form-group">
							<div className="update-btn">
								<Button variant="contained" color="success" type="submit">
									Cập Nhật
								</Button>
							</div>
							<div className="cancel-btn">
								<Link to="/ownerarticles">
									<Button variant="contained" color="error">
										Hủy Bỏ
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}

export default EditSite;
