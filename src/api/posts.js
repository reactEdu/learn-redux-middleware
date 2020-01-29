const sleep = n => new Promise(resolve => setTimeout(resolve, n));

const posts = [
	{
		id: 1,
		title: '연우',
		body: '연유크림 먹고싶다'
	},
	{
		id: 2,
		title: '아이린',
		body: '아이 추워'
	},
	{
		id: 3,
		title: '설현',
		body: '할말없음'
	},
];

export const getPosts = async () => {
	await sleep(500);
	return posts;
}

export const getPostById = async (id) => {
	await sleep(500);
	return posts.find(post => post.id === id);
}