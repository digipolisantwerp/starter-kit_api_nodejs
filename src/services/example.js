import Example from '../models/example';

export function getExampleById(exampleId) {
  return Example.findById(exampleId);
}

export function getAllExamples() {
  return Example.find();
}
