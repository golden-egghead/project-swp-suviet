import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AddItem.css';

function AddCharacter() {

	const [ID, setID] = useState('');
	const [photo, setPhoto] = useState('');
	const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [nation, setNation] = useState('');
	const [description, setDescription] = useState('');
	const [periodName, setPeriodName] = useState('');
	const navigate = useNavigate();
	const baseUrl = `http://localhost:8080/api/historicalItem/upload`;

	const handleSubmit = (e) => {
		e.preventDefault();
		const videos = { ID, photo, name, type, nation, description, periodName };
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
				navigate('/moderator/character');
			})
			.catch((err) => {
				console.log(err.message);
			});
			console.log(videos);
	};
	

	return (
        <div className='item'>
		<form className="add-container" onSubmit={handleSubmit}>
			<div className="add-form">
				<div className="form-title">
					<h2>Add New Item</h2>
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
							label="Photo"
							variant="outlined"
							value={photo}
							onChange={(e) => setPhoto(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<TextField
							fullWidth
							id="filled-basic"
							label="Name"
							variant="outlined"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>
                    <div className="form-group">
						<TextField
							fullWidth
							id="filled-basic"
							label="Type"
							variant="outlined"
							value={type}
							onChange={(e) => setType(e.target.value)}
						/>
					</div>
                    <div className="form-group">
						<TextField
							fullWidth
							id="filled-basic"
							label="Nation"
							variant="outlined"
							value={nation}
							onChange={(e) => setNation(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<TextField
							fullWidth
							id="filled-basic"
							label="Description"
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
							label="PeriodName"
							variant="outlined"
							value={periodName}
							onChange={(e) => setPeriodName(e.target.value)}
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
        </div>
    )
}

export default AddCharacter;


