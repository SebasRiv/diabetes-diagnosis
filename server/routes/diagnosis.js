const { Router } = require('express');

const router = Router();

const { getDiagnostics, postDiagnosis, getResults, getResult, postResults, download } = require('../controllers/diagnosis.controller');

router.route('/')
    .get(getDiagnostics)
    .post(postDiagnosis);
router.route('/results')
    .get(getResults)
    .post(postResults);
router.route('/results/:id')
    .get(getResult);
router.route('/download')
    .post(download);

module.exports = router;