const { Router } = require('express');

const router = Router();

const { getDiagnostics, postDiagnosis } = require('../controllers/diagnosis.controller');

router.route('/')
    .get(getDiagnostics)
    .post(postDiagnosis);

module.exports = router;