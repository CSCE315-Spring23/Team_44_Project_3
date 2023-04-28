import {useState} from 'react';

/**
 * A component that generates a form based on the given fields and handles form submission.
 * @param {Array} fields - An array of field objects that contain information about the form fields.
 * @param {Function} onSubmit - A callback function to be executed when the form is submitted.
 * @returns {JSX.Element} - A form element with input fields and a submit button.
 */
function FormGenerator({fields, onSubmit}) {
	const initialState = {};
	fields.forEach((field) => {
		initialState[field.name] = '';
	});
	const [formState, setFormState] = useState(initialState);

	/**
	 * A function that handles changes to form input fields and updates the form state accordingly.
	 * @param {Event} e - The change event triggered by an input field.
	 */
	function handleFieldChange(e) {
		const {name, value} = e.target;
		setFormState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	/**
	 * A function that handles form submission.
	 * @param {Event} e - The submit event triggered by the form.
	 */
	function handleSubmit(e) {
		e.preventDefault();
		onSubmit(formState);
		setFormState(initialState);
	};

	// Generate form elements based on the fields array
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
