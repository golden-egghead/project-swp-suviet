import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddCharacter() {

	const [ID, setID] = useState('');
	const [image, setImage] = useState('');
	const [characterName, setCharacterName] = useState('');
    const [estate, setEstate] = useState('');
	const [description, setDescription] = useState('');
    const [story, setStory] = useState('');
	const [periodName, setPeriodName] = useState('');
	const navigate = useNavigate();
	const baseUrl = `http://localhost:8080/api/character/upload`;

	const handleSubmit = (e) => {
		e.preventDefault();
		const characters = { ID, image, characterName, estate, description, story, periodName };
		fetch(baseUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
			},
			body: JSON.stringify(characters)
		})
			.then((res) => {
				toast.success('Thêm Thành Công!');
				navigate('/moderator/character');
			})
			.catch((err) => {
				console.log(err.message);
			});
			console.log(characters);
	};
	
	return (
		<div className='item'>
		<form className="add-container" onSubmit={handleSubmit}>
			<div className="add-form">
				<div className="form-title">
					<h2>Tạo Mới Nhân Vật</h2>
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
							label="Hình Ảnh"
							variant="outlined"
							value={image}
							onChange={(e) => setImage(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<TextField
							fullWidth
							id="filled-basic"
							label="Tên Nhân Vật"
							variant="outlined"
							value={characterName}
							onChange={(e) => setCharacterName(e.target.value)}
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
							onChange={(e) => setEstate(e.target.value)}
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
							label="Thời Kì"
							variant="outlined"
							value={periodName}
							onChange={(e) => setPeriodName(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<div className="save-btn">
							<Button variant="contained" color="success" type="submit">
								Lưu
							</Button>
						</div>
						<div className="cancel-btn">
							<Link to="/moderator/character">
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


