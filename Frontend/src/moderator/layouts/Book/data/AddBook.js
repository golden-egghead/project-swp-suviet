import { Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './AddBook.css'

function AddBook() {

	const [cover, setCover] = useState(null);
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [category, setCategory] = useState('');
	const [pageNumber, setPageNumber] = useState('');
	const [yearOfPublication, setYearOfPublication] = useState('');
	const [publisher, setPublisher] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');
	const [periodName, setPeriodName] = useState([]);
	const navigate = useNavigate();
	const baseUrl = `http://localhost:8080/api/Books/upload_book`;

	const handleSubmit = (e) => {
		e.preventDefault();
		const accessToken = localStorage.getItem('accessToken');

		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		formData.append('author', author);
		formData.append('category', category);
		formData.append('pageNumber', pageNumber);
		formData.append('yearOfPublication', yearOfPublication);
		formData.append('publisher', publisher);
		formData.append('price', price);
		formData.append('periodName', periodName);
		formData.append('cover', cover);
		fetch(baseUrl, {
			method: 'POST',
			headers: { 'Authorization': 'Bearer ' + accessToken },
			body: formData
		})
			.then(response => {
				if (response.ok) {
					toast.success('Thêm Thành Công')
					navigate('/moderator/book')
				} else {
					toast.error('Thêm Thất Bại')

				}
			})
			.catch(error => {
				console.error(error);
				alert('An error occurred while uploading the post. Please try again later.')
			});
	}

	const handleCoverChange = (event) => {
		setCover(event.target.files[0]);
	}

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
			<form className="add-container-book" onSubmit={handleSubmit}>
				<div className="add-form-book">
					<div className="form-title-book">
						<h2>Tạo Mới Sách</h2>
					</div>
					<div className="form-body-book">
						<label htmlFor="file">Sách:</label>
						<br />
						<div style={{ display: 'flex', width: '100%' }}>
							<label class="custom-file-upload" htmlFor="file">
								Chọn ảnh
							</label>
							<input type="file" id="file" onChange={handleCoverChange} />
							<p style={{ width: '300px', marginLeft: '10px', marginBottom: '0px', marginTop: '7px' }}>
								{cover ? cover.name : 'Không có ảnh nào được chọn'}
							</p>
						</div>
						<br />
						<div className="form-group-book">
							<TextField
								fullWidth
								id="filled-basic"
								label="Tên Sách"
								variant="outlined"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
						</div>
						<div className="form-group-book">
							<TextField
								fullWidth
								id="filled-basic"
								label="Tác Giả"
								variant="outlined"
								value={author}
								onChange={(e) => setAuthor(e.target.value)}
							/>
						</div>
						<div className="form-group-book">
							<TextField
								fullWidth
								id="filled-basic"
								label="Loại"
								variant="outlined"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							/>
						</div>
						<div className="form-group-book">
							<TextField
								fullWidth
								id="filled-basic"
								label="Số Trang"
								variant="outlined"
								value={pageNumber}
								onChange={(e) => setPageNumber(e.target.value)}
							/>
						</div>
						<div className="form-group-book">
							<TextField
								fullWidth
								id="filled-basic"
								label="Năm Sản Xuất"
								variant="outlined"
								value={yearOfPublication}
								onChange={(e) => setYearOfPublication(e.target.value)}
							/>
						</div>
						<div className="form-group-book">
							<TextField
								fullWidth
								id="filled-basic"
								label="Nhà Sản Xuất"
								variant="outlined"
								value={publisher}
								onChange={(e) => setPublisher(e.target.value)}
							/>
						</div>
						<div className="form-group-book">
							<TextField
								fullWidth
								id="filled-basic"
								label="Giá"
								variant="outlined"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>
						<div className="form-group-book">
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
						<div className="form-group-book">
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
						<div className="form-group-book">
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

export default AddBook;


