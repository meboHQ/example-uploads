const Mebo = require('mebo');

@Mebo.grant('web', {method: 'post', restRoute: '/vectorUpload'})
@Mebo.register('vectorUpload')
class VectorUpload extends Mebo.Action{
  constructor(){
    super();
    this.createInput('images: filePath[]', {allowedExtensions: ['png', 'jpg']});
    this.createInput('description?: text', {max: 255});
  }

  _perform(data){

    // handling files
    // ...
    return Promise.resolve({
      images: data.images,
      description: data.description,
    });
  }
}

module.exports = VectorUpload;
