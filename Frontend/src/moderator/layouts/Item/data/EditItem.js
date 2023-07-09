import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './EditItem.css';

function EditItem({ data }) {
	const historicalItemID = useParams();
	const pr = historicalItemID.historicalItemID;
	const baseUrl = `http://localhost:8080/api/historicalItem/edit/`;

	const location = useLocation();
	const props = location.state;
	const [ID, setID] = useState('');
    const [photo, setPhoto] = useState('');
	const [name, setName] = useState('');
    const [nation, setNation] = useState('');
	const [description, setDescription] = useState('');
    const [periodName, setPeriodName] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		setID(props.historicalItemID);
        setPhoto(props.photo);
		setName(props.name);
        setNation(props.nation);
		setDescription(props.description);
        setPeriodName(props.periodName);
	},[]
	)

	// const handleVideoChange = (e) => {
	// 	const file = e.target.files[0];
	// 	setVideoFile(file);
	//   };
	
	const handleSubmit = (e) => {
		e.preventDefault();
		const characters = { ID, photo, name, nation, description, periodName};
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
        <div className='item'>
		<form className="edit-container" onSubmit={handleSubmit}>
			<div className="edit-form">
				<div className="form-title">
					<h2>Edit Item</h2>
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
						<div className="update-btn">
							<Button variant="contained" color="success" type="submit">
								Update
							</Button>
						</div>
						<div className="cancel-btn">
							<Link to="/moderator/character">
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

export default EditItem;
