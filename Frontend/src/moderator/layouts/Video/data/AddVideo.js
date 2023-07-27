import { Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function AddVideo() {

	const [video, setVideo] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [periodName, setPeriodName] = useState([]);
	const navigate = useNavigate();
	const baseUrl = `http://localhost:8080/api/videos/upload-video`;

	const handleSubmit = (e) => {
		e.preventDefault();
		const videos = { video, title, description, periodName };
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

	const [listPeriods, setListPeriods] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`http://localhost:8080/api/period/videos?periodName`);
				setListPeriods(response.data.data)
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, []);


	return (
		<div className='item'>
			<form className="add-container" onSubmit={handleSubmit}>
				<div className="add-form">
					<div className="form-title">
						<h2>Tạo mới Video</h2>
					</div>
					<div className="form-body">
						<div className="form-group">
							<TextField
								fullWidth
								id="filled-basic"
								label="Video"
								variant="outlined"
								value={video}
								onChange={(e) => setVideo(e.target.value)}
							/>
						</div>
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
							<select
								id="period-select"
								value={periodName}
								onChange={(e) => setPeriodName(e.target.value.split(','))}
								required
							>
								<option value="">Chọn thời kì</option>
								{listPeriods.map(period => (
									<option key={period.periodValue} value={period.periodValue}>
										{period.periodName}
									</option>
								))}
							</select>
						</div>
						<div className="form-group">
							<div className="save-btn">
								<Button variant="contained" color="success" type="submit">
									Lưu
								</Button>
							</div>
							<div className="cancel-btn">
								<Link to="/moderator/video">
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

export default AddVideo;


