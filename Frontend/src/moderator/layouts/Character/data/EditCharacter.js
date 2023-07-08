import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditVideo({ data, page }) {
	const characterID = useParams();
	const pr = characterID.characterID;
	const baseUrl = `http://localhost:8080/api/character/edit/`;

	const location = useLocation();
	const props = location.state;
	const [ID, setID] = useState('');
    const [image, setImage] = useState('');
	const [characterName, setCharacterName] = useState('');
	const [description, setDescription] = useState('');
    const [periodName, setPeriodName] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		setID(props.characterID);
        setImage(props.image);
		setCharacterName(props.characterName);
		setDescription(props.description);
        setPeriodName(props.periodName)
	},[]
	)

	// const handleVideoChange = (e) => {
	// 	const file = e.target.files[0];
	// 	setVideoFile(file);
	//   };
	
	const handleSubmit = (e) => {
		e.preventDefault();
		const characters = { ID, image, characterName, description, periodName };
		fetch(baseUrl + pr, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
			},
			body: JSON.stringify(characters)
		})
			.then((res) => {
				// alert('Update successfully!');
				toast.success('Cập nhật thành công!');
				navigate('/moderator/character');
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return (
		<form className="edit-container" onSubmit={handleSubmit}>
			<div className="edit-form">
				<div className="form-title">
					<h2>Edit Character</h2>
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
							label="Image"
							variant="filled"
							value={image}
							onChange={(e) => setImage(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<TextField
							fullWidth
							id="filled-basic"
							label="CharacterName"
							variant="filled"
							value={characterName}
							onChange={(e) => setCharacterName(e.target.value)}
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
							onChange={(e) => setPeriodName(e.target.value)}
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
