const { Router } = require('express');

const router = Router();

const { getDiagnostics, postDiagnosis, getResults } = require('../controllers/diagnosis.controller');

router.route('/')
    .get(getDiagnostics)
    .post(postDiagnosis);
router.route('/results')
    .get(getResults);
module.exports = router;