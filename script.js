// .ready function to prepare the page for the DOM elements
$(document).ready(function () {
	//* Area for code

	//* Script for header date display
	$('#currentDay').append(moment().format('dddd, MMMM Do YYYY'));

	//* Arrays
	// hour times array prints the time of hour to the right time columns
	const hourTimes = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'];
	// hourNumbers contains the military time hour for the various times from 9am to 5pm. Used to compare to moment().hour()
	const hourNumbers = [9, 10, 11, 12, 13, 14, 15, 16, 17];

	//* For Loop to Inject DOM Elements
	for (let i = 0; i < hourTimes.length; i++) {
		let injectRow = $('<div class="row">');
		$('.container').append(injectRow);
		let injectTimeCol = $('<div>');
		injectTimeCol.text(hourTimes[i]);
		injectTimeCol.addClass('col-lg-1 col-1 col-sm-1 col-md-1 hour'); //* added classes for smaller devices for bootstrapped reactive UI
		injectTimeCol.attr('data-hour', hourNumbers[i]);
		let injectTextCol = $('<div>');
		injectTextCol.addClass('col-lg-10 col-8 col-sm-8 col-md-8 time-block');
		let injectTextBox = $('<textarea>');
		injectTextBox.addClass('description time-block-text');
		injectTextBox.attr('data-textbox', hourNumbers[i]);
		let injectSaveBtnCol = $('<div>');
		injectSaveBtnCol.addClass('col-lg-1 col-1 col-sm-1 col-md-1 saveButtonFunction');
		injectSaveBtnCol.attr('data-save', hourNumbers[i]);
		let injectSaveIcon = $('<i>');
		$(injectRow).append(injectTimeCol, injectTextCol, injectSaveBtnCol);
		$(injectTextCol).append(injectTextBox);
		$(injectSaveBtnCol).append(injectSaveIcon);

		// After DOMS are injected, calls the local storage function to fill in any text areas that were stored to the local from a previous visit.
		getLocal();

		//* Function Sets the parameters for the various text area columns
		//* Uses (moment().hour() which rounds down to the nearest hour in millitary time. That is then compared with the data value in data-textbox which is set by the array hourNumbers

		$('textarea').each(function () {
			if (moment().hour() === injectTextBox.data('textbox')) {
				injectTextCol.removeClass('past future');
				injectTextCol.addClass('present');
				injectSaveIcon.addClass('fas fa-lock iconimage');
				injectSaveBtnCol.addClass('lockBtn');
				injectTextBox.prop('disabled', true);
			} else if (moment().hour() > injectTextBox.data('textbox')) {
				injectTextCol.removeClass('future present');
				injectTextCol.addClass('past');
				injectSaveIcon.addClass('fas fa-lock iconimage');
				injectSaveBtnCol.addClass('lockBtn');
				injectTextBox.prop('disabled', true);
			} else if (moment().hour() < injectTextBox.data('textbox')) {
				injectTextCol.removeClass('past present');
				injectTextCol.addClass('future');
				injectSaveIcon.addClass('far fa-save iconimage');
				injectSaveBtnCol.addClass('saveBtn');
				injectTextBox.prop('disabled', false);
			}
		});

		//* on click function to save associated values in the textarea tags as well as the value for the hourNumbers in millitary time.

		injectSaveIcon.on('click', function () {
			let saveText = injectTextBox.val();
			let hourValue = injectTextBox.data('textbox');

			//* by putting hourValue not in quotes, the stored data will save to the local with the key as the data attribute value.
			localStorage.setItem(hourValue, JSON.stringify(saveText));
		});

		//* getLocal function retreives the value from the local using the key as the parameter. This is then added as a text value to the appropriate textarea using the $('*[data-textbox=#]') code which can target specific elements that contain that attribute and attribute value.
		function getLocal() {
			let text9am = JSON.parse(localStorage.getItem('9'));
			$('*[data-textbox=9]').text(text9am);
			let text10am = JSON.parse(localStorage.getItem('10'));
			$('*[data-textbox=10]').text(text10am);
			let text11am = JSON.parse(localStorage.getItem('11'));
			$('*[data-textbox=11]').text(text11am);
			let text12pm = JSON.parse(localStorage.getItem('12'));
			$('*[data-textbox=12]').text(text12pm);
			let text1pm = JSON.parse(localStorage.getItem('13'));
			$('*[data-textbox=13]').text(text1pm);
			let text2pm = JSON.parse(localStorage.getItem('14'));
			$('*[data-textbox=14]').text(text2pm);
			let text3pm = JSON.parse(localStorage.getItem('15'));
			$('*[data-textbox=15]').text(text3pm);
			let text4pm = JSON.parse(localStorage.getItem('16'));
			$('*[data-textbox=16]').text(text4pm);
			let text5pm = JSON.parse(localStorage.getItem('17'));
			$('*[data-textbox=17]').text(text5pm);
		}
	}
});
