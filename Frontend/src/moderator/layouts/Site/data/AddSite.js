import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { v4 as uuidv4 } from 'uuid';

function AddSite() {

	// const [ID, setID] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	const [historicalSiteName, setHistoricalSiteName] = useState('');
	const [photo, setPhoto] = useState(null);
	// const [images, setImages] = useState([]);
	const navigate = useNavigate();
	// const baseUrl = 'http://localhost:8080/api/historicalSites/upload-historicalSite';

	const handleLocationChange = (event) => {
		setLocation(event.target.value);
	}

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	}

	const handleHistoricalSiteNameChange = (event) => {
		setHistoricalSiteName(event.target.value);
	}

	const handlePhotoChange = (event) => {
		setPhoto(event.target.files[0]);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const accessToken = localStorage.getItem('accessToken');
		if (!accessToken) {
			alert('Please log in to upload a post!');
			return;
		}
		const formData = new FormData();
		formData.append('location', location);
		formData.append('description', description);
		formData.append('historicalSiteName', historicalSiteName);
		formData.append('photo', photo);
		fetch('http://localhost:8080/api/historicalSites/upload-historicalSite', {
			method: 'POST',
			headers: { 'Authorization': 'Bearer ' + accessToken },
			body: formData
		})
			.then(response => {
				if (response.ok) {
					toast.success('Thêm Thành Công')
					navigate('/moderator/site')
				} else {
					toast.error('Thêm Thất Bại')

				}
			})
			.catch(error => {
				console.error(error);
				alert('An error occurred while uploading the post. Please try again later.')
			});
	}
	return (
		<div className='item'>
			<form className="add-container" onSubmit={handleSubmit}>
				<div className="add-form">
					<div className="form-title">
						<h2>Tạo mới Di Tích</h2>
					</div>
					<div className="form-body">
						<label htmlFor="photo">Photo:</label>
						<input type="file" id="photo" onChange={handlePhotoChange} />
						<br />
						<div className="form-group">
							<TextField
								fullWidth
								id="filled-basic"
								label="Tên Di TÍch"
								variant="outlined"
								value={historicalSiteName}
								onChange={handleHistoricalSiteNameChange}
								required
							/>
						</div>
						<div className="form-group">
							<TextField
								fullWidth
								id="filled-basic"
								label="Vị Trí"
								variant="outlined"
								value={location}
								onChange={handleLocationChange}
								required
							/>
						</div>
						<div className="form-group">
							<TextField
								fullWidth
								id="filled-basic"
								label="Mô Tả"
								variant="outlined"
								value={description}
								onChange={handleDescriptionChange}
								required
								multiline
								rows={10}
							/>
						</div>
						<div className="form-group">
							<div className="save-btn">
								<Button variant="contained" color="success" type="submit">
									Lưu
								</Button>
							</div>
							<div className="cancel-btn">
								<Link to="/moderator/site">
									<Button variant="contained" color="error">
										Hủy
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

export default AddSite;


