const STORAGE_KEY = 'LINK_VOTE_APP';

const _initialData = [
	{
		name: "Youtube",
		link: "https://www.youtube.com",
		id: "6ni6ok3ym7mf1p33lnez",
		points: 1,
		lastUpdate: "2021-03-14 12:01:00",
	},
	{
		name: "Instagram",
		link: "https://www.instagram.com",
		id: "am8ehyc8byjqgar0jgpub9",
		points: 1,
		lastUpdate: "2021-03-14 12:10:00",
	},
	{
		name: "Facebook",
		link: "https://www.facebook.com/",
		id: "loxhs1bqm25b708cmbf3g",
		points: 0,
		lastUpdate: "2021-03-14 15:10:00",
	},
	{
		name: "Hepsiburada",
		link: "https://hepsiburada.com",
		id: "vthrdm985a262al8qx3do",
		points: 3,
		lastUpdate: "2021-03-14 12:10:00",
	},
	{
		name: "Google",
		link: "https://google.com",
		id: "xj352vofupe1dqz9emx13r",
		points: 1,
		lastUpdate: "2021-03-14 12:10:00",
	},
];
export const orderTypes = {
	ASC: "ASC",
	DESC: "DESC",
};

function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

export function get() {
	return new Promise((resolve) => resolve(_getStorage()));
}

export function remove(id) {
	return new Promise((resolve) => {
		const data = _getStorage();

		const newData = data
			.map((link) => (link.id !== id ? link : null))
			.filter((p) => p != null);

		_saveStorage(newData);
		resolve();
	});
}

export function add(link) {
	return new Promise((resolve) => {
		const data = _getStorage();
		const newLink = { ...link, points: 0, id: generateUID() };

		data.push(newLink);

		_saveStorage(data);
		resolve(newLink);
	});
}

export function vote(id, vote) {
	return new Promise((resolve) => {
		const data = _getStorage();

		const link = data.find((p) => p.id === id);
		link.points += vote ? 1 : -1;
		link.lastUpdate = _formatDate(new Date());

		_saveStorage(data);
		resolve(link);
	});
}

function _getStorage() {
	let data = localStorage.getItem(STORAGE_KEY);
	if (data == null) {
		data = JSON.stringify(_initialData);
		_saveStorage(_initialData);
	}

	return JSON.parse(data);
}

   
function _saveStorage(data) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}


function _formatDate(date) {
	return (
		date.getUTCFullYear() +
		"/" +
		("0" + (date.getUTCMonth() + 1)).slice(-2) +
		"/" +
		("0" + date.getUTCDate()).slice(-2) +
		" " +
		("0" + date.getUTCHours()).slice(-2) +
		":" +
		("0" + date.getUTCMinutes()).slice(-2) +
		":" +
		("0" + date.getUTCSeconds()).slice(-2)
	);
}