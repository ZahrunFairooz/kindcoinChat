import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
		role: "",  // Added role state
	});

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs((prev) => ({ ...prev, gender }));
	};

	const handleRoleChange = (e) => {
		const selectedRole = e.target.value;
		console.log("Selected role:", selectedRole); // Log the selected role
		setInputs((prev) => ({ ...prev, role: selectedRole }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Submitting signup with inputs:", inputs); 
		await signup(inputs);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					{/* Full Name */}
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered h-10'
							value={inputs.fullName}
							onChange={(e) => setInputs((prev) => ({ ...prev, fullName: e.target.value }))}
						/>
					</div>

					{/* Username */}
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='johndoe'
							className='w-full input input-bordered h-10'
							value={inputs.username}
							onChange={(e) => setInputs((prev) => ({ ...prev, username: e.target.value }))}
						/>
					</div>

					{/* Password */}
					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs((prev) => ({ ...prev, password: e.target.value }))}
						/>
					</div>

					{/* Confirm Password */}
					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs((prev) => ({ ...prev, confirmPassword: e.target.value }))}
						/>
					</div>

					{/* Gender Checkbox */}
					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					{/* Role Selection */}
					<div className='mt-4'>
						<label className='label'>
							<span className='text-base label-text'>Select Role</span>
						</label>
						<select
							className='w-full select select-bordered'
							value={inputs.role}
							onChange={handleRoleChange}
						>
							<option value='' disabled>Select a role</option>
							<option value='donator'>Donator</option>
							<option value='recipient'>Recipient</option>
							<option value='crew_member'>Crew Member</option>
							<option value='admin'>Admin</option>
						</select>
					</div>

					{/* Link to Login */}
					<Link to="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
						Already have an account?
					</Link>

					{/* Submit Button */}
					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
