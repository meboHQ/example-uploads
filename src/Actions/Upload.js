const Mebo = require('mebo');

@Mebo.grant('web', {method: 'post', restRoute: '/upload'})
@Mebo.register('upload')
class Upload extends Mebo.Action{
  constructor(){
    super();
    this.createInput('image: filePath', {allowedExtensions: ['png', 'jpg']});
    this.createInput('description?: text', {max: 255});
  }

  _perform(data){

    // handling file
    // ...
    return Promise.resolve({
      image: data.image,
      description: data.description,
    });
  }
}

module.exports = Upload;
