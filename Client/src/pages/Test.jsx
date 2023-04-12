import React, {useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {format} from "date-fns";

function Test() {
	const [selectedDate, setSelectedDate] = useState(null);
	const [startDate, setStartDate] = useState(null);
	function handleChange(date) {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		console.log(`${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`);
		setStartDate(`${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`);
	}

	useEffect(() => {
		console.log(startDate);
	}, [startDate]);


	return (
		<DatePicker
			selected={selectedDate}
			onChange={handleChange}
			dateFormat="yyyy-MM-dd"
		/>
	);
}

export default Test;
