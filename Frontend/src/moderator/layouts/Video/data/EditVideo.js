import { Description } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function EditVideo({ data }) {
	const videoID = useParams();
	const pr = videoID.videoID;
	const baseUrl = `http://localhost:8080/api/videos/update-video/`;
	useEffect(() => {
		fetch(baseUrl + pr)
			.then((response) => response.json())
			.then((data) => {
				setID(data.videoID);
				setVideo(data.video);
				setTitle(data.title);
				setDescription(data.description);
			})
			.catch((error) => console.log(error.message));
	}, [videoID]);
	console.log(data);
	const [ID, setID] = useState('');
	const [video, setVideo] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const videos = { ID, video, title, description};
		fetch(baseUrl + pr, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(videos)
		})
			.then((res) => {
				alert('Update successfully!');
				navigate('/moderator/video');
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	return (
		<form className="edit-container" onSubmit={handleSubmit}>
			<div className="edit-form">
				<div className="form-title">
					<h2>Edit Video</h2>
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
						<div className="update-btn">
							<Button variant="contained" color="success" type="submit">
								Update
							</Button>
						</div>
						<div className="cancel-btn">
							<Link to="/moderator/video">
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

export default EditVideo;
