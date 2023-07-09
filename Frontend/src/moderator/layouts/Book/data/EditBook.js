import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './EditBook.css'

function EditBook({ data }) {
	const bookID = useParams();
	const pr = bookID.bookID;
	const baseUrl = `http://localhost:8080/api/book/update/`;

	const location = useLocation();
	const props = location.state;
	const [ID, setID] = useState('');
	const [cover, setCover] = useState('');
	const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [pageNumber, setPageNumber] = useState('');
    const [yearOfPublication, setYearOfPublication] = useState('');
    const [publisher, setPublisher] = useState('');
    const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');
	const [periodName, setPeriodName] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		setID(props.bookID);
		setCover(props.cover);
		setTitle(props.title);
        setAuthor(props.author);
        setPageNumber(props.pageNumber);
        setYearOfPublication(props.yearOfPublication);
        setPublisher(props.publisher);
        setPrice(props.price);
		setDescription(props.description);
		setPeriodName(props.periodName)
	}, []
	)

	// const handleVideoChange = (e) => {
	// 	const file = e.target.files[0];
	// 	setVideoFile(file);
	//   };

	const handleSubmit = (e) => {
		e.preventDefault();
		const books = { ID, cover, title, author, pageNumber, yearOfPublication, publisher, price, description, periodName };
		fetch(baseUrl + pr, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
			},
			body: JSON.stringify(books)
		})
			.then((res) => {
				// alert('Update successfully!');
				toast.success('Cập nhật thành công!');
				navigate('/moderator/book');
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return (
		<div className='edit'>
		<form className="edit-container-book" onSubmit={handleSubmit}>
			<div className="edit-form-book">
				<div className="form-title-book">
					<h2>Cập Nhật Sách</h2>
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
					<div className="form-group">
						<div className="update-btn">
							<Button variant="contained" color="success" type="submit">
								Cập Nhật
							</Button>
						</div>
						<div className="cancel-btn">
							<Link to="/moderator/character">
								<Button variant="contained" color="error">
									Hủy Bỏ
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

export default EditBook;
