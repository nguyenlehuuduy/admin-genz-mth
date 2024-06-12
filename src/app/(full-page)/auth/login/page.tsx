"use client"

import React from 'react';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { useFormState } from "react-dom";
import { ActionLoginState, login } from './action';

const defaultData = {
	email: "",
	password: "",
};

const initialState: ActionLoginState = {
	validate: defaultData,
	success: false,
};

export default function LoginPage() {
	const [{ validate }, formAction] = useFormState(login, initialState);

	return (
		<div className="flex flex-column align-items-center justify-content-center" style={{
			marginTop: 200
		}}>
			<form action={formAction}>
				<div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
					<div className="text-center mb-5">
						<div className="text-900 text-3xl font-medium mb-3">Welcome, GENZ MENTAL HEATH!</div>
						<span className="text-600 font-medium">Sign in to continue</span>
					</div>

					<div>
						<label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
							Email
						</label>
						<div className='flex flex-column mb-5'>
							<InputText name='email' type="text" placeholder="Email address" className="w-full md:w-30rem" style={{ padding: '1rem' }} />
							<span className="invalid_err">{validate?.email}</span>
						</div>

						<div className='flex flex-column mb-5'>
							<Password
								name='password'
								inputId="pwd"
								placeholder="Password"
								toggleMask
								className="w-full"
								inputClassName="w-full p-3" />
							<span className="invalid_err">{validate?.password}</span>
						</div>

						<Button
							type='submit'
							label="Sign In"
							className="w-full p-3 text-xl"
						></Button>
					</div>
				</div>
			</form>
		</div >
	);
};
