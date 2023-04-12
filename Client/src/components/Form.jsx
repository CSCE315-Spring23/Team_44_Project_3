import {useState} from 'react';

function FormGenerator({fields, onSubmit}) {
	const initialState = {};
	fields.forEach((field) => {
		initialState[field.name] = '';
	});
	const [formState, setFormState] = useState(initialState);

	const handleFieldChange = (e) => {
		const {name, value} = e.target;
		setFormState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formState);
		setFormState(initialState);
	};

	const formElements = fields.map((field) => (
		<div key={field.name} style={{marginBottom: '8px', display: 'flex', alignItems: 'center'}}>
			<label style={{display: 'inline-block', width: '150px', textAlign: 'left', marginRight: '10px'}}>{field.label}: </label>
			<input
				type={field.type}
				name={field.name}
				value={formState[field.name]}
				placeholder={field.placeholder}
				onChange={handleFieldChange}
				style={{flex: 1, padding: '5px', textAlign: 'right'}}
			/>
		</div>
	));

	return (
		<form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
			{formElements}
			<button type="submit" style={{marginTop: '10px', padding: '5px 10px', fontSize: '16px', marginBottom: '5px'}}>Submit</button>
		</form>
	);
}
export default FormGenerator;
