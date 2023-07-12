import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditSite({ data }) {
	const historicalSiteID = useParams();
	const pr = historicalSiteID?.historicalSiteID;
	const baseUrl = `http://localhost:8080/api/historicalSites/update-historicalSite/`;

	const locate = useLocation();
	const props = locate.state;
	const [photo, setPhoto] = useState(null);
    const [historicalSiteName, setHistoricalSiteName] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	// const [images, setImages] = useState([]);
	const navigate = useNavigate();
	const [oldPhoto, setOldPhoto] = useState('');


	useEffect(() => {
		setOldPhoto(props.photo);
		setHistoricalSiteName(props.historicalSiteName);
        setLocation(props.locate)
		setDescription(props.description);
	},[]
	)

	// const handleVideoChange = (e) => {
	// 	const file = e.target.files[0];
	// 	setVideoFile(file);
	//   };
	
	const handleSubmit = (e) => {
		e.preventDefault();
		// const sites = { ID, photo, historicalSiteName, locate, description, images};
		// fetch(baseUrl + pr, {
		// 	method: 'PUT',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
		// 	},
		// 	body: JSON.stringify(sites)
		// })
		// 	.then((res) => {
		// 		// alert('Update successfully!');
				
		// 		toast.success('Cập nhật thành công!');
		// 		navigate('/moderator/video');
		// 	})
		// 	.catch((err) => {
		// 		console.log(err.message);
		// 	});
		  const accessToken = localStorage.getItem('accessToken');
		  const formData = new FormData();
		  formData.append('location', location);
		  formData.append('description', description);
		  formData.append('historicalSiteName', historicalSiteName);
		  if (photo) { // If a file has been selected, add it to the form data
			formData.append("photo", photo);
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
				navigate('/moderator/site');
			  } else {
				toast.error('Cập Nhật Thất Bại');
				
			  }
			})
			.catch(error => {
			  console.error(error);
			  alert('An error occurred while uploading the post. Please try again later.')
			});
		}

	return (
		<div className='item'>
		<form className="edit-container" onSubmit={handleSubmit}>
			<div className="edit-form">
				<div className="form-title">
					<h2>Cập Nhật Di Tích</h2>
				</div>
				<div className="form-body">
					{/* <div className="form-group">
						<label>Choose Video File</label>
						<input type="file" onChange={handleVideoChange} accept="video/*" />
					</div> */}
					<div >
					<label htmlFor="photo">Ảnh của Di Tích:</label>
					<img src={oldPhoto} alt="Old photo" style={{height:"100px", width: "100px", overflow:"auto" }} />
					<br />
					</div>
					<div className="form-group">
					<input type="file" id="photo" onChange={(e) => setPhoto(e.target.files[0])} />
					<br />

						{/* <TextField
							fullWidth
							id="filled-basic"
							label="Hình Ảnh"
							variant="outlined"
							value={photo}
							onChange={(e) => setPhoto(e.target.value)}
						/> */}
					</div>
					<div className="form-group">
						<TextField
							fullWidth
							id="filled-basic"
							label="Tên Di TÍch"
							variant="outlined"
							value={historicalSiteName}
							onChange={(e) => setHistoricalSiteName(e.target.value)}
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
							onChange={(e) => setLocation(e.target.value)}
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
							onChange={(e) => setDescription(e.target.value)}
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
							<Link to="/moderator/character">
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
