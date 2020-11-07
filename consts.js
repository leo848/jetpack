const DEATH_MESSAGES = {
	lineObstacle : [
		'{player} hit a LineObstacle',
		'{player} was flashed by a laser',
	],
	laser        : [
		'{player} was flashed by a GIANT laser',
	],
	ballLaser    : [
		"{player} didn't know the sun was a deadly laser",
	],
};

const mergeObjects = (obj1, obj2) => {
	for (let i of Object.keys(obj2)) {
		obj1[i] = obj2[i];
	}
	return obj1;
};
