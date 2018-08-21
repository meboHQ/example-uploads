const Mebo = require('mebo');

@Mebo.grant('cli')
@Mebo.grant('web', {method: 'post', restRoute: '/vectorUpload'})
@Mebo.register('vectorUpload')
class VectorUpload extends Mebo.Action{
  constructor(){
    super();
    this.createInput('images: filePath[]', {allowedExtensions: ['png', 'jpg']});
    this.createInput('description?: text', {max: 255});
  }

  async _perform(data){

    // handling files
    // ...
    return {
      images: data.images,
      description: data.description,
    };
  }
}

module.exports = VectorUpload;
