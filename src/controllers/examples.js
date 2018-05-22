import {
  getExampleById,
  getAllExamples,
} from '../services/example';

export function getExample(req, res, next) {
  getExampleById(req.params.exampleId)
    .then(example => res.json(example))
    .catch(next);
}

export function getExamples(req, res, next) {
  getAllExamples()
    .then(examples => res.json(examples))
    .catch(next);
}
