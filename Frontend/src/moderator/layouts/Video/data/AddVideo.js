import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddVideo() {

	const [ID, setID] = useState('');
	const [video, setVideo] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [periodName, setPeriodName] = useState([]);
	const navigate = useNavigate();
	const baseUrl = `http://localhost:8080/api/videos/upload-video`;

	const handleSubmit = (e) => {
		e.preventDefault();
		const videos = { ID, video, title, description, periodName };
		fetch(baseUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
			},
			body: JSON.stringify(videos)
		})
			.then((res) => {
				toast.success('Thêm Thành Công!');
				navigate('/moderator/video');
			})
			.catch((err) => {
				console.log(err.message);
			});
			console.log(videos);
	};
	

	return (
		<form className="add-container" onSubmit={handleSubmit}>
			<div className="add-form">
				<div className="form-title">
					<h2>Add New User</h2>
				</div>
				<div className="form-body">
					<div className="form-group">
						<TextField
						fullWidth id="filled-basic" label="ID" variant="filled" value={ID} disabled />
					</div>
					<div className="form-group">
						<TextField
						fullWidth
							id="filled-basic"
							label="Video"
							variant="filled"
							value={video}
							onChange={(e) => setVideo(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<TextField
						fullWidth
							id="filled-basic"
							label="Title"
							variant="filled"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<TextField
						fullWidth
							id="filled-basic"
							label="Description"
							variant="filled"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<TextField
						fullWidth
							id="filled-basic"
							label="PeriodName"
							variant="filled"
							value={periodName}
							onChange={(e) => setPeriodName(e.target.value.split(','))}
							required
						/>
					</div>
					<div className="form-group">
						<div className="save-btn">
							<Button variant="contained" color="success" type="submit">
								Save
							</Button>
						</div>
						<div className="cancel-btn">
							<Link to="/dashboard">
								<Button variant="contained" color="error">
									Cancel
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</form>
    )
}

export default AddVideo;


