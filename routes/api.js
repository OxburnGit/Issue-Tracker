'use strict';

const mongoose = require('mongoose');
const Issue = require('../models/Issue');
const bodyParser = require('body-parser');
const mongoURI = process.env.MONGO_URI;

module.exports = function (app) {

  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.route('/api/issues/:project')
  
    .get(async function (req, res) {
      let project = req.params.project;
      let filter = { project, ...req.query }; // Ajoute les filtres
      try {
        const issues = await Issue.find(filter);
        res.json(issues); // Renvoie les issues filtrées
      } catch (err) {
        res.status(500).send(err);
      }
    })
  
    
    .post(async function (req, res) {
      try {
        const { issue_title, issue_text, created_by, assigned_to, status_text, project } = req.body;
    
        if (!issue_title || !issue_text || !created_by) {
          return res.json({ error: 'required field(s) missing' });
        }        
    
        const newIssue = new Issue({
          issue_title,
          issue_text,
          created_by,
          assigned_to,
          status_text,
          project,
        });
    
        const savedIssue = await newIssue.save();
        res.status(200).send(savedIssue);
      } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
      }
    })
    

    .put(async function (req, res) {
      let project = req.params.project;
      const { _id, ...updates } = req.body;
    
      // Vérification de l'absence de l'_id
      if (!_id) {
        return res.json({ error: 'missing _id' });
      }
    
      // Vérification de la validité de l'_id
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('invalid _id');
      }
    
      // Vérification s'il y a des champs à mettre à jour
      if (Object.keys(updates).length === 0) {
        return res.json({ error: 'no update field(s) sent', '_id': _id });
      }
      
    
      try {
        const issue = await Issue.findByIdAndUpdate(
          _id,
          { ...updates, updated_on: new Date() }, // Mets à jour la date
          { new: true }
        );
        
    
        // Vérification si l'issue existe
        if (!issue) {
          return res.json({ result: 'successfully updated', '_id': _id });

        }
    
        res.json(issue); // Renvoi de l'issue mise à jour
      } catch (err) {
        console.error('Error updating issue:', err);
        res.status(500).send({ error: 'Failed to update issue' });
      }
    })
    
    
    .delete(async function (req, res) {
      let project = req.params.project;
      const { _id } = req.body;

      if (!_id) {
        return res.json({ error: 'missing _id' });
      }
      
      try {
        const issue = await Issue.findByIdAndDelete(_id);
        if (!issue) {
          return res.json({ error: 'could not delete', '_id': _id });
        }
        res.json({ result: 'successfully deleted', '_id': _id });
      } catch (err) {
        res.json({ error: 'could not delete', '_id': _id });
      }
      
    });
};
