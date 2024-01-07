const searchField = document.getElementById('search');
const searchField2 = document.getElementById('search2');
const resultBox = document.getElementById('result-box');

const debounce = (callback, delay) => {
	let timeout = null;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			callback(...args);
		}, delay);
	};
};

const throttle = (callback, delay) => {
	let shouldWait = false;
	let lastArgs = null;
	return (...args) => {
		if (shouldWait) {
			lastArgs = args;
			return;
		}
		callback(...args);
		shouldWait = true;
		setTimeout(() => {
			if (lastArgs == null) {
				shouldWait = false;
			} else {
				shouldWait = false;
				callback(lastArgs);
				lastArgs = null;
			}
		}, 1000);
	};
};

const handleInputChange = async (e) => {
	try {
		const response = await fetch(
			'https://dummyjson.com/users/search?' +
				new URLSearchParams({
					q: e.target.value
				})
		);
		const result = await response.json();
		const users = await result.users;

		resultBox.innerHTML = '';
		if (users?.length) {
			users.forEach((user) => {
				const textElm = document.createElement('p');
				const userName = document.createTextNode(`${user.firstName} ${user.lastName}`);
				textElm.appendChild(userName);
				resultBox.appendChild(textElm);
			});
		}
	} catch (error) {
		console.log(error);
	}
};

searchField.addEventListener('input', debounce(handleInputChange, 1000));
searchField2.addEventListener('input', throttle(handleInputChange, 1000));

/*Debounce: delay time 1000ms => sau 1s ma nguoi dung khong nhap vao o tim kiem nua thi moi thuc thi event handler 1 lan duy nhat */
/*Throttle: wait time 1000ms => thuc thi ngay lap tuc, cu 1s troi qua thi no lai thuc thi lai event handler*/

// Debounce: Dùng cho tìm kiếm
// Throttle: Auto save lúc soạn thảo văn bản, Infinite loading
