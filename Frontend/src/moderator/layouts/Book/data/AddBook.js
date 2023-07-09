import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AddBook.css'

function AddBook() {

	const [ID, setID] = useState('');
	const [cover, setCover] = useState('');
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
	const baseUrl = `http://localhost:8080/api/book/upload`;

	const handleSubmit = (e) => {
		e.preventDefault();
		const books = { ID, cover, title, author, category, pageNumber, yearOfPublication, publisher, price, description, periodName };
		fetch(baseUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
			},
			body: JSON.stringify(books)
		})
			.then((res) => {
				toast.success('Thêm Thành Công!');
				navigate('/moderator/book');
			})
			.catch((err) => {
				console.log(err.message);
			});
			console.log(books);
	};
	

	return (
		<div className='item'>
		<form className="add-container-book" onSubmit={handleSubmit}>
			<div className="add-form-book">
				<div className="form-title-book">
					<h2>Tạo Mới Sách</h2>
				</div>
				<div className="form-body-book">
                <div className="form-group-book">
						<TextField
							fullWidth id="filled-basic" label="ID" variant="filled" value={ID} disabled />
					</div>
					{/* <div className="form-group-book">
						<label>Choose Video File</label>
						<input type="file" onChange={handleVideoChange} accept="video/*" />
					</div> */}
					<div className="form-group-book">
						<TextField
							fullWidth
							id="filled-basic"
							label="Hình Ảnh"
							variant="outlined"
							value={cover}
							onChange={(e) => setCover(e.target.value)}
						/>
					</div>
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
						<TextField
						fullWidth
							id="filled-basic"
							label="Thời Kì"
							variant="outlined"
							value={periodName}
							onChange={(e) => setPeriodName(e.target.value.split(','))}
							required
						/>
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


