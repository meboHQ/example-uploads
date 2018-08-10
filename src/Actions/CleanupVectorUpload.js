const util = require('util');
const fs = require('fs');
const Mebo = require('mebo');

// promisifying
const access = util.promisify(fs.access);
const unlink = util.promisify(fs.unlink);

@Mebo.grant('web', {method: 'post', restRoute: '/cleanupVectorUpload'})
@Mebo.register('cleanupVectorUpload')
class CompleteVectorUpload extends Mebo.Action{
  constructor(){
    super();
    this.createInput('images: filePath[]', {allowedExtensions: ['png', 'jpg']});
    this.createInput('description?: text', {max: 255});
  }

  _perform(data){

    // in case the files are not handled (like the example below) they are deleted
    // automatically by the _finalize which is also called when the action has failed.
    // Therefore, providing the oportunity to delete temporary files, write logs, etc...
    return Promise.resolve({
      images: data.images,
      description: data.description,
    });
  }

  _finalize(err, value){

    // using the finalize to purge the uploaded file in case it was not handled
    // during the _perform (basically doing a cleanup operation).
    const cleanup = this.createAction('cleanup');
    cleanup.input('files').setupFrom(this.input('images'));
    this.session().wrapup().addAction(cleanup);

    return super._finalize(err, value);
  }
}

// registering an action that is going to be used during the session wrapup
// to delete any uploaded file that has not been moved
@Mebo.register('cleanup')
class Cleanup extends Mebo.Action{
  constructor(){
    super();
    this.createInput('files: filePath[]');
  }

  async _removeFile(file){

    try{
      await access(file);
      await unlink(file);
    }
    catch(err){
      if (err.code !== 'ENOENT'){
        throw err;
      }
    }
  }

  _perform(data){
    return Promise.all(data.files.map(x => this._removeFile(x)));
  }
}

module.exports = CompleteVectorUpload;
