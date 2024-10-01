const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
/*
suite('Functional Tests', function() {
  
  let project = 'apitest';
  let testIssueId;

  test('Create an issue with every field', function(done) {
    chai.request(server)
      .post('/api/issues/' + project)
      .send({
        issue_title: 'Test Issue',
        issue_text: 'This is a test issue.',
        created_by: 'Tester',
        assigned_to: 'Assignee',
        status_text: 'In Progress'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, '_id');
        testIssueId = res.body._id; // Save the issue ID for later tests
        done();
      });
  });

  test('Create an issue with only required fields', function(done) {
    chai.request(server)
      .post('/api/issues/' + project)
      .send({
        issue_title: 'Another Test Issue',
        issue_text: 'This issue has only required fields.',
        created_by: 'Tester'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, '_id');
        done();
      });
  });

  test('Create an issue with missing required fields', function(done) {
    chai.request(server)
      .post('/api/issues/' + project)
      .send({
        issue_title: '',
        created_by: 'Tester'
      })
      .end(function(err, res) {
        assert.equal(res.status, 400);
        done();
      });
  });

  test('View issues on a project', function(done) {
    chai.request(server)
      .get('/api/issues/' + project)
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        done();
      });
  });

  test('View issues on a project with one filter', function(done) {
    chai.request(server)
      .get('/api/issues/' + project + '?open=true')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        done();
      });
  });

  test('View issues on a project with multiple filters', function(done) {
    chai.request(server)
      .get('/api/issues/' + project + '?open=true&assigned_to=Assignee')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        done();
      });
  });

  test('Update one field on an issue', function(done) {
    chai.request(server)
      .put('/api/issues/' + project)
      .send({ _id: testIssueId, issue_title: 'Updated Title' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, 'Updated Title');
        done();
      });
  });

  test('Update multiple fields on an issue', function(done) {
    chai.request(server)
      .put('/api/issues/' + project)
      .send({ _id: testIssueId, issue_title: 'New Title', status_text: 'Resolved' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.status_text, 'Resolved');
        done();
      });
  });

  test('Update an issue with missing _id', function(done) {
    chai.request(server)
      .put('/api/issues/' + project)
      .send({ issue_title: 'No ID' })
      .end(function(err, res) {
        assert.equal(res.status, 400);
        done();
      });
  });

  test('Update an issue with no fields to update', function(done) {
    chai.request(server)
      .put('/api/issues/' + project)
      .send({ _id: testIssueId })
      .end(function(err, res) {
        assert.equal(res.status, 400);
        done();
      });
  });

  test('Update an issue with an invalid _id', function(done) {
    chai.request(server)
      .put('/api/issues/' + project)
      .send({ _id: 'invalid_id', issue_title: 'Invalid ID' })
      .end(function(err, res) {
        assert.equal(res.status, 404);
        done();
      });
  });

  test('Delete an issue', function(done) {
    chai.request(server)
      .delete('/api/issues/' + project)
      .send({ _id: testIssueId })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'deleted ' + testIssueId);
        done();
      });
  });

  test('Delete an issue with an invalid _id', function(done) {
    chai.request(server)
      .delete('/api/issues/' + project)
      .send({ _id: 'invalid_id' })
      .end(function(err, res) {
        assert.equal(res.status, 404);
        done();
      });
  });

  test('Delete an issue with missing _id', function(done) {
    chai.request(server)
      .delete('/api/issues/' + project)
      .send({})
      .end(function(err, res) {
        assert.equal(res.status, 400);
        done();
      });
  });

});*/
