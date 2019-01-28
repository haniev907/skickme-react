import AvatarEditor from "react-avatar-editor"
import ReactRange from "react-simple-range"

import "./Avatar.sass"

class Avatar extends React.Component {
  onSelectFile (event) {
    const avatar = event.target.files[0]

    if (avatar) {
      const {size, type} = avatar
      const reader = new FileReader

      reader.onloadend = ok => {
        const {dispatch, actions} = this.context

        dispatch(actions.setImage(reader.result, type))
        dispatch(actions.toggleAvatarEditor(true))
      }

      this.props.validate({mimeType: type, size}, "avatar")
        .then(data => reader.readAsDataURL(avatar))
    }
  }

  onScaleImage ({value}) {
    const {dispatch, actions} = this.context

    dispatch(actions.scaleImage(value))
  }

  onCancelEditor () {
    const {dispatch, actions} = this.context

    dispatch(actions.toggleAvatarEditor(false))
  }

  onDoneEditor () {
    const {dispatch, actions} = this.context

    const {mimeType} = this.props.store.avatar
    const image = this.refs.editor
      .getImageScaledToCanvas()
      .toDataURL(mimeType)

    dispatch(actions.setImage(image))
    dispatch(actions.toggleAvatarEditor(false))

    this.props.onUploadAvatar(image)
  }

  onImageRotate () {
    const {rotate} = this.props.store.avatar
    const {dispatch, actions} = this.context

    dispatch(actions.rotateImage(
      rotate == 270 ? 0 : rotate + 90
    ))
  }

  renderUploadTrigger () {
    const {avatar, name} = this.props.store.fields

    const imageStyle = {
      backgroundImage: `url(${avatar})`
    }

    return (
      <div className="avatar-trigger-wrapper flex">
        <input 
          type="file" 
          id="file-upload" 
          accept="image/jpeg,image/png"
          onChange={::this.onSelectFile}
        />
        <label htmlFor="file-upload" className="flex">
          {
            avatar 
            ? <div className="image" style={imageStyle}/>
            : <div className="name">{name.slice(0, 1)}</div>
          }
        </label>
      </div>
    )
  }

  renderAvatarEditor () {
    const {
      image, 
      scale, 
      rotate
    } = this.props.store.avatar

    return (
      <div className="avatar-editor-wrapper flex">
        <div 
          className="cancel" 
          onClick={::this.onCancelEditor}
        />
        <div 
          className="rotate"
          onClick={::this.onImageRotate}
        />
        <div 
          className="done"
          ref="avatarDone"
          onClick={::this.onDoneEditor}
        />
        <AvatarEditor
          ref="editor"
          image={image}
          rotate={rotate}
          width={150}
          scale={scale / 10}
          height={150}
          color={[255, 255, 255, .9]}
          borderRadius={100}
        />
        <ReactRange
          value={scale}
          type="range"
          min={10} 
          max={60} 
          step={1} 
          onChange={::this.onScaleImage}
          sliderColor="#d88acc"
          trackColor="#d88acc"
          thumbColor="#d88acc"
        />
      </div>
    )
  }

  render () {
    const {isAvatarEditor} = this.props.store.avatar

    return !isAvatarEditor
      ? this.renderUploadTrigger()
      : this.renderAvatarEditor()
  }
}

Avatar.contextTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    setImage: PropTypes.func.isRequired,
    toggleAvatarEditor: PropTypes.func.isRequired,
    scaleImage: PropTypes.func.isRequired,
    rotateImage: PropTypes.func.isRequired
  }).isRequired
}

Avatar.propTypes = {
  store: PropTypes.shape({
    fields: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    
    avatar: PropTypes.shape({
      image: PropTypes.string.isRequired,
      mimeType: PropTypes.string.isRequired,
      isAvatarEditor: PropTypes.bool.isRequired,
      scale: PropTypes.number.isRequired,
      rotate: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,

  validate: PropTypes.func.isRequired,
  onUploadAvatar: PropTypes.func.isRequired
}

export default Avatar