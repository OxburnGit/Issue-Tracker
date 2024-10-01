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
      let filter = { project };
    
      // Ajouter les filtres de req.query si présents
      if (Object.keys(req.query).length > 0) {
        filter = { ...filter, ...req.query };
      }
    
      try {
        const issues = await Issue.find(filter);
        res.json(issues); // Renvoie toutes les issues ou les issues filtrées
      } catch (err) {
        res.status(500).json({ error: 'could not retrieve issues' });
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
      const { _id, ...updates } = req.body;
    
      if (!_id) {
        return res.json({ error: 'missing _id' });
      }
    
      if (Object.keys(updates).length === 0) {
        return res.json({ error: 'no update field(s) sent', '_id': _id });
      }
    
      try {
        const issue = await Issue.findByIdAndUpdate(
          _id,
          { ...updates, updated_on: new Date() }, // Mets à jour `updated_on`
          { new: true }
        );
    
        if (!issue) {
          return res.json({ error: 'could not update', '_id': _id });
        }
    
        res.json({ result: 'successfully updated', '_id': _id });
      } catch (err) {
        res.json({ error: 'could not update', '_id': _id });
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
