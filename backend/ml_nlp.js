// ml_nlp.js

const { PythonShell } = require('python-shell');

// Train ML model using scikit-learn
const trainModel = () => {
  PythonShell.run('train_model.py', null, (err, results) => {
    if (err) {
      console.error('Error training ML model:', err);
      return;
    }
    console.log('Model trained successfully:', results);
  });
};

// Perform NLP tasks
const performNLP = () => {
  PythonShell.run('nlp_tasks.py', null, (err, results) => {
    if (err) {
      console.error('Error performing NLP tasks:', err);
      return;
    }
    console.log('NLP tasks completed successfully:', results);
  });
};

// Call the functions
trainModel();
performNLP();




