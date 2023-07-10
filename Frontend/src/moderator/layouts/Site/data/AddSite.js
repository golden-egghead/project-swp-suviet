import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { v4 as uuidv4 } from 'uuid';

function AddSite() {

	const [ID, setID] = useState('');
	const [photo, setPhoto] = useState('');
	const [historicalSiteName, setHistoricalSiteName] = useState('');
	const [locate, setLocate] = useState('');
	const [description, setDescription] = useState('');
	// const [images, setImages] = useState([]);
	const navigate = useNavigate();
	const baseUrl = 'http://localhost:8080/api/historicalSites/upload-historicalSite';

	const handleSubmit = (e) => {
		e.preventDefault();
		const sites = { ID, photo, historicalSiteName, locate, description };
		fetch(baseUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
			},
			body: JSON.stringify(sites)
		})
			.then((res) => {
				toast.success('Thêm Thành Công!');
				navigate('/moderator/site');
			})
			.catch((err) => {
				console.log(err.message);
			});
		console.log(sites);
	};

	// function generateFileName(file) {
	// 	const extension = file.name.split('.').pop();
	// 	const randomName = uuidv4();
	// 	return `${randomName}.${extension}`;
	//   }

	  const handleSiteChange = (event) => {
		const file = event.target.files[0];
		setPhoto(file);
	  };
	  

	return (
		<div className='item'>
			<form className="add-container" onSubmit={handleSubmit}>
				<div className="add-form">
					<div className="form-title">
						<h2>Tạo mới Di Tích</h2>
					</div>
					<div className="form-body">
						<div className="form-group">
							<TextField
								fullWidth id="filled-basic" label="ID" variant="filled" value={ID} disabled />
						</div>
						<div className="form-group">
							<label>Choose Video File</label>
							<input type="file" onChange={handleSiteChange} accept="site/*" multiple/>
						</div>
						<div className="form-group">
							<img src={photo} alt="Selected Image" />
						</div>
						{/* <div className="form-group">
						<TextField
							fullWidth
							id="filled-basic"
							label="Hình Ảnh"
							variant="outlined"
							value={photo}
							onChange={(e) => setPhoto(e.target.value)}
						/>
					</div> */}
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
								value={locate}
								onChange={(e) => setLocate(e.target.value)}
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
						{/* <div className="form-group">
						<TextField
						fullWidth
							id="filled-basic"
							label="Hình Ảnh"
							variant="outlined"
							value={images}
							onChange={(e) => setImages(e.target.value.split(','))}
							required
						/>
					</div> */}
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


