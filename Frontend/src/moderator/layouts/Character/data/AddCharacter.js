// import { Button, TextField } from '@mui/material';
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// function AddCharacter() {

// 	const [ID, setID] = useState('');
// 	const [image, setImage] = useState('');
// 	const [characterName, setCharacterName] = useState('');
//     const [estate, setEstate] = useState('');
// 	const [description, setDescription] = useState('');
//     const [story, setStory] = useState('');
// 	const [periodName, setPeriodName] = useState('');
// 	const navigate = useNavigate();
// 	const baseUrl = `http://localhost:8080/api/character/upload`;

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		const characters = { ID, image, characterName, estate, description, story, periodName };
// 		fetch(baseUrl, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
// 			},
// 			body: JSON.stringify(characters)
// 		})
// 			.then((res) => {
// 				toast.success('Thêm Thành Công!');
// 				navigate('/moderator/character');
// 			})
// 			.catch((err) => {
// 				console.log(err.message);
// 			});
// 			console.log(characters);
// 	};

// 	const handleCharacterChange = (event) => {
// 		setImage(event.target.files[0]);
// 	  };

// 	return (
// 		<div className='item'>
// 		<form className="add-container" onSubmit={handleSubmit}>
// 			<div className="add-form">
// 				<div className="form-title">
// 					<h2>Tạo Mới Nhân Vật</h2>
// 				</div>
// 				<div className="form-body">
//                 <div className="form-group">
// 						<TextField
// 							fullWidth id="filled-basic" label="ID" variant="filled" value={ID} disabled />
// 					</div>
// 					<div className="form-group"> 
// 						<label>Choose Video File</label>
// 						<input type="file" onChange={handleCharacterChange} />
// 					</div> 
// 					{/* <div className="form-group">
// 						<TextField
// 							fullWidth
// 							id="filled-basic"
// 							label="Hình Ảnh"
// 							variant="outlined"
// 							value={image}
// 							onChange={(e) => setImage(e.target.value)}
// 						/>
// 					</div> */}
// 					<div className="form-group">
// 						<TextField
// 							fullWidth
// 							id="filled-basic"
// 							label="Tên Nhân Vật"
// 							variant="outlined"
// 							value={characterName}
// 							onChange={(e) => setCharacterName(e.target.value)}
// 							required
// 						/>
// 					</div>
//                     <div className="form-group">
// 						<TextField
// 							fullWidth
// 							id="filled-basic"
// 							label="Địa Vị"
// 							variant="outlined"
// 							value={estate}
// 							onChange={(e) => setEstate(e.target.value)}
// 						/>
// 					</div>
// 					<div className="form-group">
// 						<TextField
// 							fullWidth
// 							id="filled-basic"
// 							label="Mô Tả"
// 							variant="outlined"
// 							value={description}
// 							onChange={(e) => setDescription(e.target.value)}
// 							required
// 							multiline
// 							rows={10}
// 						/>
// 					</div>
//                     <div className="form-group">
// 						<TextField
// 						fullWidth
// 							id="filled-basic"
// 							label="Thời Kì"
// 							variant="outlined"
// 							value={periodName}
// 							onChange={(e) => setPeriodName(e.target.value)}
// 							required
// 						/>
// 					</div>
// 					<div className="form-group">
// 						<div className="save-btn">
// 							<Button variant="contained" color="success" type="submit">
// 								Lưu
// 							</Button>
// 						</div>
// 						<div className="cancel-btn">
// 							<Link to="/moderator/character">
// 								<Button variant="contained" color="error">
// 									Hủy
// 								</Button>
// 							</Link>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</form>
//         </div>
//     )
// }

// export default AddCharacter;


import { Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './AddCharacter.css'

function AddCharacter() {

	// const [ID, setID] = useState('');
	const [image, setImage] = useState(null);
	const [characterName, setCharacterName] = useState('');
	const [estate, setEstate] = useState('');
	const [description, setDescription] = useState('');
	const [story, setStory] = useState('');
	const [periodName, setPeriodName] = useState('');
	// const [photo, setPhoto] = useState(null);
	// const [images, setImages] = useState([]);

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

	const navigate = useNavigate();
	// const baseUrl = 'http://localhost:8080/api/historicalSites/upload-historicalSite';

	const handleCharacterChange = (event) => {
		setCharacterName(event.target.value);
	}

	const handleEstateChange = (event) => {
		setEstate(event.target.value);
	}

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	}

	const handleStoryChange = (event) => {
		setStory(event.target.value);
	}

	const handlePeriodNameChange = (event) => {
		setPeriodName(event.target.value);
	}

	const handleImageChange = (event) => {
		setImage(event.target.files[0]);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const accessToken = localStorage.getItem('accessToken');
		if (!accessToken) {
			alert('Please log in to upload a post!');
			return;
		}
		const formData = new FormData();
		formData.append('characterName', characterName);
		formData.append('estate', estate);
		formData.append('description', description);
		formData.append('story', story);
		formData.append('periodName', periodName);
		formData.append('image', image);
		fetch('http://localhost:8080/api/characters/upload', {
			method: 'POST',
			headers: { 'Authorization': 'Bearer ' + accessToken },
			body: formData
		})
			.then(response => {
				if (response.ok) {
					console.log(story);
					toast.success('Thêm Thành Công')
					navigate('/moderator/character')
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
			<form className="add-container-character" onSubmit={handleSubmit}>
				<div className="add-form">
					<div className="form-title">
						<h2>Tạo mới Nhân Vật</h2>
					</div>
					<div className="form-body">
						<label htmlFor="file">Hình ảnh:</label>
						<br />
						<div style={{ display: 'flex', width: '100%' }}>
							<label class="custom-file-upload" htmlFor="file">
								Chọn ảnh
							</label>
							<input type="file" id="file" onChange={handleImageChange} />
							<p style={{ width: '300px', marginLeft: '10px', marginBottom: '0px', marginTop: '7px' }}>
								{image ? image.name : 'Không có ảnh nào được chọn'}
							</p>
						</div>
						<br />
						<div className="form-group">
							<TextField
								fullWidth
								id="filled-basic"
								label="Tên Nhân Vật"
								variant="outlined"
								value={characterName}
								onChange={handleCharacterChange}
								required
							/>
						</div>
						<div className="form-group">
							<TextField
								fullWidth
								id="filled-basic"
								label="Địa Vị"
								variant="outlined"
								value={estate}
								onChange={handleEstateChange}
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
							<TextField
								fullWidth
								id="filled-basic"
								label="Chi Tiết"
								variant="outlined"
								value={story}
								onChange={handleStoryChange}
								required
								multiline
								rows={10}
							/>
						</div>
						<div className="form-group">
							<select
								id="period-select"
								value={periodName}
								onChange={handlePeriodNameChange}
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

export default AddCharacter;





