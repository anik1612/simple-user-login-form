import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Home = () => {
	const [photo, setPhoto] = useState(null);
	const [serverResponse, setServerResponse] = useState({});

	console.log(serverResponse);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data, e) => {
		const formData = new FormData();
		formData.append('name', data.name);
		formData.append('email', data.email);
		formData.append('file', photo);

		axios
			.post('http://localhost:5000/upload', formData)
			.then((data) => {
				if (data.data.success) {
					e.target.reset();
					setServerResponse(data.data);
				}
			})
			.catch((err) => console.log(err));
	};

	const handleImage = (event) => {
		setPhoto(event.target.files[0]);
	};

	return (
		<div style={{ minHeight: '100vh' }}>
			<div className='row d-flex justify-content-around align-items-center'>
				<div className='col-md-5 mt-5'>
					<div className='d-flex justify-content-center align-items-center'>
						<div className='card'>
							<form onSubmit={handleSubmit(onSubmit)}>
								<h3 className='display-5 text-center mb-5 card-header'>
									Login Form
								</h3>
								<div className='card-body p-4'>
									<input
										type='text'
										className='form-control'
										{...register('name', {
											required: true,
										})}
										placeholder='Enter your name'
									/>
									{errors.name && <span className='text-danger'>This field is required</span>}
									<input
										type='text'
										className='form-control mt-3'
										{...register('email', {
											required: true,
										})}
										placeholder='Enter your email'
									/>
									{errors.email && <span className='text-danger'>This field is required</span>}
									<input
										className='form-control mt-3'
										type='file'
										name='image'
										onChange={handleImage}
									/>
								</div>
								<div className='card-footer'>
									<div className='d-grid'>
										<input
											className='btn btn-block btn-success'
											type='submit'
											value='submit'
										/>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>

				<div className='col-md-5'>
					{serverResponse.photo ? (
						<div className='d-flex justify-content-center align-items-center mt-5'>
							<div className='card'>
								<div className='card-header text-center'>
									<h3 className='display-6'>User Info:</h3>
								</div>
								<div className='card-body p-5'>
									<img
										className='d-block mx-auto mb-4'
										src={`http://localhost:5000/${serverResponse?.photo?.name}`}
										style={{
											height: '130px',
											width: '130px',
											border: '1px solid grey',
											borderRadius: '50%',
										}}
										alt='user-uploaded-img'
									/>
									<h5 className='mb-3'>
										Name: {serverResponse.name}
									</h5>
									<h5 className='mb-3'>
										Email: {serverResponse.email}
									</h5>
								</div>
								<div className='card-footer'>
									<h6 className='display-6'>
										Developer: Anik Sarker
									</h6>
								</div>
								<div />
							</div>
						</div>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
