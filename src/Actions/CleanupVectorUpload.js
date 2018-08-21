const util = require('util');
const fs = require('fs');
const Mebo = require('mebo');

// promisifying
const access = util.promisify(fs.access);
const unlink = util.promisify(fs.unlink);

@Mebo.grant('cli')
@Mebo.grant('web', {method: 'post', restRoute: '/cleanupVectorUpload'})
@Mebo.register('cleanupVectorUpload')
class CompleteVectorUpload extends Mebo.Action{
  constructor(){
    super();
    this.createInput('images: filePath[]', {allowedExtensions: ['png', 'jpg']});
    this.createInput('description?: text', {max: 255});
  }

  async _perform(data){

    // in case the files are not handled (like the example below) they are deleted
    // automatically by the _after which is also called when the action has failed.
    // Therefore, providing the oportunity to delete temporary files, write logs, etc...
    return {
      images: data.images,
      description: data.description,
    };
  }

  async _after(err, value){
    // using the 'after' to purge the uploaded files in case it was not handled
    // during the _perform (basically doing a cleanup operation). This
    // is only performed by the web handler
    if (this.session().has('handler') && this.session().get('handler') == 'web'){
      const cleanup = this.createAction('cleanup');
      cleanup.input('files').setupFrom(this.input('images'));
      this.session().wrapup().addAction(cleanup);
    }
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
