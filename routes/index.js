const Joi = require('joi');
const express = require('express');
const router = express.Router();

const courses = [
    {id: 1, name: 'courses1'},
    {id: 2, name: 'courses2'},
    {id: 3, name: 'courses3'},
    {id: 4, name: 'courses4'},
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/courses', function(req, res, next) {
  res.send(course);
});

router.get('/api/courses/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with given ID was not found')
    res.send(course);
});

router.post('/api/courses', (req, res) => {
	const { error } = validateCourse(req.body);
	if(error) return res.status(400).send(error)

	const course = {
        id: courses.length + 1,
        name: req.body.name
	};
	courses.push(course);
	res.send(course);
});

router.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with given ID was not found')

    const { error } = validateCourse(req.body);
	if(error) {
        res.status(400).send(error);
	    return;
	}

	course.name = req.body.name;
	res.send(course);
});

router.delete('/api/courses/:id',  (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with given ID was not found')

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(courses);
});

function validateCourse(course) {
    const schema = {
    	name: Joi.string().min(3).required();
    };
    return Joi.validate(course, schema);
}

module.exports = router;
