import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditSite({ data }) {
	const historicalSiteID = useParams();
	const pr = historicalSiteID.historicalSiteID;
	const baseUrl = `http://localhost:8080/api/historicalSites/update-historicalSite/`;

	const location = useLocation();
	const props = location.state;
	const [ID, setID] = useState('');
	const [photo, setPhoto] = useState('');
    const [historicalSiteName, setHistoricalSiteName] = useState('');
	const [locate, setLocate] = useState('');
	const [description, setDescription] = useState('');
	const [images, setImages] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		setID(props.videoID);
		setPhoto(props.photo);
		setHistoricalSiteName(props.historicalSiteName);
        setLocate(props.locate)
		setDescription(props.description);
		setImages(props.images)
	},[]
	)

	// const handleVideoChange = (e) => {
	// 	const file = e.target.files[0];
	// 	setVideoFile(file);
	//   };
	
	const handleSubmit = (e) => {
		e.preventDefault();
		const sites = { ID, photo, historicalSiteName, locate, description, images};
		fetch(baseUrl + pr, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
			},
			body: JSON.stringify(sites)
		})
			.then((res) => {
				// alert('Update successfully!');
				toast.success('Cập nhật thành công!');
				navigate('/moderator/video');
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return (
		<div className='item'>
		<form className="edit-container" onSubmit={handleSubmit}>
			<div className="edit-form">
				<div className="form-title">
					<h2>Cập Nhật Video</h2>
				</div>
				<div className="form-body">
					<div className="form-group">
						<TextField
							fullWidth id="filled-basic" label="ID" variant="filled" value={ID} disabled />
					</div>
					{/* <div className="form-group">
						<label>Choose Video File</label>
						<input type="file" onChange={handleVideoChange} accept="video/*" />
					</div> */}
					<div className="form-group">
						<TextField
							fullWidth
							id="filled-basic"
							label="Hình Ảnh"
							variant="outlined"
							value={photo}
							onChange={(e) => setPhoto(e.target.value)}
						/>
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
                    <div className="form-group">
						<TextField
						fullWidth
							id="filled-basic"
							label="Hình Ảnh"
							variant="outlined"
							value={images}
							onChange={(e) => setImages(e.target.value.split(','))}
							required
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
